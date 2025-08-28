import { PatientData } from '@/api/types';

// Cardiology-specific patient data configuration
export const cardiologyPatientConfig = {
  genderDistribution: { male: 0.58, female: 0.40, other: 0.02 }, // Slightly more males in cardiology studies
  ageDistribution: { min: 35, max: 85, mode: 65 }, // Older population for heart issues
  bmiDistribution: { min: 20, max: 45, mode: 29.8 }, // Normal to obese range
  raceDistribution: {
    'White': 0.65,
    'Black': 0.15,
    'Asian': 0.08,
    'Hispanic': 0.10,
    'Other': 0.02
  },
  comorbidities: [
    'Hypertension',
    'Type 2 Diabetes', 
    'Coronary Artery Disease',
    'Heart Failure',
    'Chronic Kidney Disease',
    'Sleep Apnea',
    'Hyperlipidemia'
  ],
  medications: [
    'Metoprolol',
    'Lisinopril',
    'Atorvastatin',
    'Warfarin',
    'Amiodarone',
    'Digoxin',
    'Aspirin',
    'Clopidogrel'
  ]
};

// Generate cardiology-specific mock patients
export const generateCardiologyPatients = (count: number = 500): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female', 'other'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];
  const siteIds = ['hr-ucla', 'hr-stanford', 'hr-mayo', 'hr-jhh', 'hr-mgh'];

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
    const gender = weightedRandom(cardiologyPatientConfig.genderDistribution) as PatientData['gender'];
    const age = normalRandom(
      cardiologyPatientConfig.ageDistribution.min,
      cardiologyPatientConfig.ageDistribution.max,
      cardiologyPatientConfig.ageDistribution.mode
    );
    const bmi = normalRandom(
      cardiologyPatientConfig.bmiDistribution.min,
      cardiologyPatientConfig.bmiDistribution.max,
      cardiologyPatientConfig.bmiDistribution.mode
    );
    const race = weightedRandom(cardiologyPatientConfig.raceDistribution);
    
    patients.push({
      id: `cardio-${i.toString().padStart(4, '0')}`,
      studyId: 'cardiology',
      age,
      gender,
      bmi,
      enrollmentDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
      race,
      ethnicity: Math.random() > 0.85 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      comorbidities: cardiologyPatientConfig.comorbidities.filter(() => Math.random() > 0.6),
      medications: cardiologyPatientConfig.medications.filter(() => Math.random() > 0.5)
    });
  }

  return patients;
};