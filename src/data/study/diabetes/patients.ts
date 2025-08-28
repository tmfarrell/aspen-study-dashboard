import { PatientData } from '@/api/types';

// Diabetes-specific patient data configuration
export const diabetesPatientConfig = {
  genderDistribution: { male: 0.52, female: 0.47, other: 0.01 }, // Slight male predominance
  ageDistribution: { min: 25, max: 85, mode: 58 }, // Middle-aged to older adults
  bmiDistribution: { min: 22, max: 50, mode: 31.8 }, // Normal to severely obese
  raceDistribution: {
    'White': 0.58,
    'Black': 0.20,
    'Hispanic': 0.16,
    'Asian': 0.05,
    'Other': 0.01
  },
  comorbidities: [
    'Hypertension',
    'Hyperlipidemia',
    'Diabetic Nephropathy',
    'Diabetic Retinopathy',
    'Peripheral Neuropathy',
    'Coronary Artery Disease',
    'Depression',
    'Sleep Apnea'
  ],
  medications: [
    'Metformin',
    'Insulin',
    'Glipizide',
    'Sitagliptin',
    'Empagliflozin',
    'Liraglutide',
    'Pioglitazone',
    'Glyburide'
  ]
};

// Generate diabetes-specific mock patients
export const generateDiabetesPatients = (count: number = 500): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female', 'other'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];
  const siteIds = ['diabetes-houston', 'diabetes-chicago', 'diabetes-atlanta', 'diabetes-phoenix', 'diabetes-denver'];

  // Helper function to pick weighted random item
  const weightedRandom = (weights: Record<string, number>) => {
    const random = Math.random();
    let sum = 0;
    for (const [key, weight] of Object.entries(weights)) {
      sum += weight;
      if (random <= sum) return key;
    }
    return Object.keys(weights)[0];
  };

  // Helper function for normal distribution around mode
  const normalRandom = (min: number, max: number, mode: number) => {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const scaled = mode + z0 * ((max - min) / 6);
    return Math.max(min, Math.min(max, Math.round(scaled)));
  };

  for (let i = 0; i < count; i++) {
    const gender = weightedRandom(diabetesPatientConfig.genderDistribution) as PatientData['gender'];
    const age = normalRandom(
      diabetesPatientConfig.ageDistribution.min,
      diabetesPatientConfig.ageDistribution.max,
      diabetesPatientConfig.ageDistribution.mode
    );
    const bmi = normalRandom(
      diabetesPatientConfig.bmiDistribution.min,
      diabetesPatientConfig.bmiDistribution.max,
      diabetesPatientConfig.bmiDistribution.mode
    );
    const race = weightedRandom(diabetesPatientConfig.raceDistribution);
    
    patients.push({
      id: `diabetes-${i.toString().padStart(4, '0')}`,
      studyId: 'diabetes',
      age,
      gender,
      bmi,
      enrollmentDate: new Date(2022, Math.floor(Math.random() * 24), Math.floor(Math.random() * 28) + 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
      race,
      ethnicity: Math.random() > 0.80 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      comorbidities: diabetesPatientConfig.comorbidities.filter(() => Math.random() > 0.55),
      medications: diabetesPatientConfig.medications.filter(() => Math.random() > 0.4)
    });
  }

  return patients;
};