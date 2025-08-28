import { PatientData } from '@/api/types';

// Obesity-specific patient data configuration
export const obesityPatientConfig = {
  genderDistribution: { male: 0.35, female: 0.63, other: 0.02 }, // More females in obesity studies
  ageDistribution: { min: 18, max: 89, mode: 45 }, // Broader age range
  bmiDistribution: { min: 30, max: 60, mode: 36.2 }, // Obese range only
  raceDistribution: {
    'White': 0.55,
    'Black': 0.22,
    'Hispanic': 0.18,
    'Asian': 0.03,
    'Other': 0.02
  },
  comorbidities: [
    'Type 2 Diabetes',
    'Hypertension',
    'Sleep Apnea',
    'Osteoarthritis',
    'Depression',
    'GERD',
    'Metabolic Syndrome',
    'Fatty Liver Disease'
  ],
  medications: [
    'Metformin',
    'Semaglutide',
    'Liraglutide',
    'Orlistat',
    'Phentermine',
    'Naltrexone-Bupropion',
    'Topiramate',
    'Insulin'
  ],
  enrollmentDateRange: {
    startYear: 2023,
    startMonth: 0, // January
    endYear: 2024,
    endMonth: 7 // August
  },
  enrollmentCategories: [
    { key: 'class1', label: 'Class I Obesity (30-34.9)', weight: 0.42 },
    { key: 'class2', label: 'Class II Obesity (35-39.9)', weight: 0.35 },
    { key: 'class3', label: 'Class III Obesity (40+)', weight: 0.23 }
  ]
};

// Generate obesity-specific mock patients
export const generateObesityPatients = (count: number = 500): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female', 'other'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];
  const siteIds = ['obesity-berlin', 'obesity-paris', 'obesity-madrid', 'obesity-rome', 'obesity-zurich'];

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
    const gender = weightedRandom(obesityPatientConfig.genderDistribution) as PatientData['gender'];
    const age = normalRandom(
      obesityPatientConfig.ageDistribution.min,
      obesityPatientConfig.ageDistribution.max,
      obesityPatientConfig.ageDistribution.mode
    );
    const bmi = normalRandom(
      obesityPatientConfig.bmiDistribution.min,
      obesityPatientConfig.bmiDistribution.max,
      obesityPatientConfig.bmiDistribution.mode
    );
    const race = weightedRandom(obesityPatientConfig.raceDistribution);
    const enrollmentCategory = weightedRandom(
      obesityPatientConfig.enrollmentCategories.reduce((acc, cat) => ({ ...acc, [cat.label]: cat.weight }), {})
    );
    
    patients.push({
      id: `obesity-${i.toString().padStart(4, '0')}`,
      studyId: 'obesity',
      age,
      gender,
      bmi,
      enrollmentDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
      race,
      ethnicity: Math.random() > 0.75 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      medicalHistory: obesityPatientConfig.comorbidities.filter(() => Math.random() > 0.5),
      medications: obesityPatientConfig.medications.filter(() => Math.random() > 0.6),
      enrollmentCategory,
      visitHistory: [],
      labResults: {}
    });
  }

  return patients;
};