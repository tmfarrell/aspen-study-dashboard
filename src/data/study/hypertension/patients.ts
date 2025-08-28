import { PatientData } from '@/api/types';

// Hypertension-specific patient data configuration
export const hypertensionPatientConfig = {
  genderDistribution: { male: 0.48, female: 0.51, other: 0.01 }, // Slight female predominance
  ageDistribution: { min: 30, max: 80, mode: 62 }, // Middle-aged to older adults
  bmiDistribution: { min: 25, max: 45, mode: 33.4 }, // Overweight to obese
  raceDistribution: {
    'White': 0.62,
    'Black': 0.18,
    'Hispanic': 0.15,
    'Asian': 0.04,
    'Other': 0.01
  },
  comorbidities: [
    'Type 2 Diabetes',
    'Hyperlipidemia', 
    'Coronary Artery Disease',
    'Chronic Kidney Disease',
    'Left Ventricular Hypertrophy',
    'Stroke History',
    'Peripheral Artery Disease',
    'Sleep Apnea'
  ],
  medications: [
    'Lisinopril',
    'Amlodipine',
    'Hydrochlorothiazide',
    'Metoprolol',
    'Losartan',
    'Carvedilol',
    'Chlorthalidone',
    'Valsartan'
  ],
  enrollmentDateRange: {
    startYear: 2023,
    startMonth: 6, // July
    endYear: 2024,
    endMonth: 7 // August (13 months)
  }
};

// Generate hypertension-specific mock patients
export const generateHypertensionPatients = (count: number = 500): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female', 'other'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];
  const siteIds = ['hypertension-seattle', 'hypertension-portland', 'hypertension-vancouver', 'hypertension-spokane', 'hypertension-boise'];

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
    const gender = weightedRandom(hypertensionPatientConfig.genderDistribution) as PatientData['gender'];
    const age = normalRandom(
      hypertensionPatientConfig.ageDistribution.min,
      hypertensionPatientConfig.ageDistribution.max,
      hypertensionPatientConfig.ageDistribution.mode
    );
    const bmi = normalRandom(
      hypertensionPatientConfig.bmiDistribution.min,
      hypertensionPatientConfig.bmiDistribution.max,
      hypertensionPatientConfig.bmiDistribution.mode
    );
    const race = weightedRandom(hypertensionPatientConfig.raceDistribution);
    
    patients.push({
      id: `hypertension-${i.toString().padStart(4, '0')}`,
      studyId: 'hypertension',
      age,
      gender,
      bmi,
      enrollmentDate: new Date(2023, Math.floor(Math.random() * 5) + 7, Math.floor(Math.random() * 28) + 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: siteIds[Math.floor(Math.random() * siteIds.length)],
      race,
      ethnicity: Math.random() > 0.82 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      comorbidities: hypertensionPatientConfig.comorbidities.filter(() => Math.random() > 0.6),
      medications: hypertensionPatientConfig.medications.filter(() => Math.random() > 0.45)
    });
  }

  return patients;
};