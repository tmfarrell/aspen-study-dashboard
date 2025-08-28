import { PatientData, PatientConfig, StudyType } from '@/api/types';
import { weightedRandom, normalRandom } from '@/data/patientHelpers';

// Quality of Life Assessment types for cardiology
export interface QoLAssessment {
  type: 'AFEQT' | 'SF-36' | 'SQLS' | 'ICD-PAS' | 'PPMQOL' | 'EQ-5D-5L' | 'PVCSS' | 'ASQOL';
  date: string;
  score: number;
  maxScore: number;
  timepoint: 'baseline' | '6months' | '1year' | '2years';
}

// Assessment configurations for each type
const assessmentConfigs = {
  'AFEQT': { maxScore: 100, normalMean: 67.8, normalStd: 15 },
  'SF-36': { maxScore: 100, normalMean: 72.4, normalStd: 12 },
  'SQLS': { maxScore: 100, normalMean: 58.3, normalStd: 18 },
  'ICD-PAS': { maxScore: 7, normalMean: 4.2, normalStd: 1.2 },
  'PPMQOL': { maxScore: 100, normalMean: 78.9, normalStd: 14 },
  'EQ-5D-5L': { maxScore: 1, normalMean: 0.76, normalStd: 0.15 },
  'PVCSS': { maxScore: 10, normalMean: 3.4, normalStd: 1.8 },
  'ASQOL': { maxScore: 100, normalMean: 65.7, normalStd: 16 }
};

// Generate assessments for a patient based on their condition
const generateAssessmentsForPatient = (patientId: string, enrollmentCategory: string): QoLAssessment[] => {
  const assessments: QoLAssessment[] = [];
  const timepoints: ('baseline' | '6months' | '1year' | '2years')[] = ['baseline', '6months', '1year', '2years'];
  
  // Map enrollment categories to assessment types
  const assessmentTypeMap: Record<string, (keyof typeof assessmentConfigs)[]> = {
    'Atrial Fibrillation': ['AFEQT', 'EQ-5D-5L'],
    'Atrial Flutter': ['SF-36', 'EQ-5D-5L'],
    'Supraventricular Tachycardia': ['SQLS', 'EQ-5D-5L'],
    'Ventricular Tachycardia': ['ICD-PAS', 'EQ-5D-5L'],
    'Bradycardia': ['PPMQOL', 'EQ-5D-5L'],
    'Heart Block': ['EQ-5D-5L', 'SF-36'],
    'Premature Ventricular Contractions': ['PVCSS', 'EQ-5D-5L'],
    'Wolff-Parkinson-White Syndrome': ['ASQOL', 'EQ-5D-5L']
  };

  const assessmentTypes = assessmentTypeMap[enrollmentCategory] || ['EQ-5D-5L'];
  
  timepoints.forEach((timepoint, timeIndex) => {
    const baseDate = new Date('2023-03-01');
    const monthsToAdd = timepoint === 'baseline' ? 0 : 
                      timepoint === '6months' ? 6 : 
                      timepoint === '1year' ? 12 : 24;
    
    const assessmentDate = new Date(baseDate);
    assessmentDate.setMonth(assessmentDate.getMonth() + monthsToAdd);
    assessmentDate.setDate(assessmentDate.getDate() + Math.floor(Math.random() * 30)); // Add some variation
    
    assessmentTypes.forEach(type => {
      const config = assessmentConfigs[type];
      let score = normalRandom(config.normalMean, config.normalStd, config.normalMean);
      
      // Apply time-based variation (slight improvement over time for most conditions)
      const timeVariation = timeIndex * 0.05; // 5% improvement per timepoint
      score = Math.min(config.maxScore, score * (1 + timeVariation));
      
      // Clamp to valid range
      score = Math.max(0, Math.min(config.maxScore, score));
      
      assessments.push({
        type,
        date: assessmentDate.toISOString(),
        score: Math.round(score * 10) / 10,
        maxScore: config.maxScore,
        timepoint
      });
    });
  });
  
  return assessments;
};

// Cardiology-specific patient data configuration
export const cardiologyPatientConfig: PatientConfig = {
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
  ],
  enrollmentDateRange: {
    startYear: 2023,
    startMonth: 2, // March
    endYear: 2024,
    endMonth: 7 // August
  },
  enrollmentCategories: [
    { key: 'atrial_fibrillation', label: 'Atrial Fibrillation', weight: 0.35 },
    { key: 'ventricular_tachycardia', label: 'Ventricular Tachycardia', weight: 0.25 },
    { key: 'supraventricular_tachycardia', label: 'Supraventricular Tachycardia', weight: 0.20 },
    { key: 'bradycardia', label: 'Bradycardia', weight: 0.15 },
    { key: 'heart_block', label: 'Heart Block', weight: 0.05 }
  ]
};

// Generate cardiology patients with realistic data distribution
export const generateCardiologyPatients = (count: number = 500): PatientData[] => {
  const patients: PatientData[] = [];

  for (let i = 0; i < count; i++) {
    const id = `cardio-${String(i + 1).padStart(4, '0')}`;
    const gender = weightedRandom(cardiologyPatientConfig.genderDistribution) as 'male' | 'female' | 'other';
    const age = Math.round(normalRandom(cardiologyPatientConfig.ageDistribution.min, cardiologyPatientConfig.ageDistribution.max, cardiologyPatientConfig.ageDistribution.mode));
    const bmi = Math.round(normalRandom(cardiologyPatientConfig.bmiDistribution.min, cardiologyPatientConfig.bmiDistribution.max, cardiologyPatientConfig.bmiDistribution.mode) * 10) / 10;
    const race = weightedRandom(cardiologyPatientConfig.raceDistribution);
    
    // Select random comorbidities (0-4 conditions)
    const numComorbidities = Math.floor(Math.random() * 5);
    const selectedComorbidities = [];
    const availableComorbidities = [...cardiologyPatientConfig.comorbidities];
    
    for (let j = 0; j < numComorbidities && availableComorbidities.length > 0; j++) {
      const randomIndex = Math.floor(Math.random() * availableComorbidities.length);
      selectedComorbidities.push(availableComorbidities.splice(randomIndex, 1)[0]);
    }
    
    // Select random medications (1-3 medications)
    const numMedications = Math.floor(Math.random() * 3) + 1;
    const selectedMedications = [];
    const availableMedications = [...cardiologyPatientConfig.medications];
    
    for (let j = 0; j < numMedications && availableMedications.length > 0; j++) {
      const randomIndex = Math.floor(Math.random() * availableMedications.length);
      selectedMedications.push(availableMedications.splice(randomIndex, 1)[0]);
    }
    
    // Generate enrollment date within the specified range
    const startDate = new Date(cardiologyPatientConfig.enrollmentDateRange.startYear, cardiologyPatientConfig.enrollmentDateRange.startMonth, 1);
    const endDate = new Date(cardiologyPatientConfig.enrollmentDateRange.endYear, cardiologyPatientConfig.enrollmentDateRange.endMonth, 28);
    const enrollmentDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    // Select enrollment category based on weights
    const enrollmentCategory = weightedRandom(cardiologyPatientConfig.enrollmentCategories.reduce((acc, cat) => ({ ...acc, [cat.label]: cat.weight }), {}));
    
    // Generate quality of life assessments
    const qualityOfLifeAssessments = generateAssessmentsForPatient(id, enrollmentCategory);
    
    const patient: PatientData = {
      id,
      age: Math.max(18, Math.min(85, age)), // Clamp age between 18-85
      gender,
      bmi: Math.max(15, Math.min(50, bmi)), // Clamp BMI between 15-50
      race,
      medicalHistory: selectedComorbidities,
      medications: selectedMedications,
      enrollmentDate: enrollmentDate.toISOString(),
      enrollmentCategory,
      status: Math.random() > 0.95 ? 'withdrawn' : 'active', // 5% withdrawal rate
      visitHistory: [],
      labResults: {},
      studyId: 'cardiology' as StudyType,
      qualityOfLifeAssessments
    };

    patients.push(patient);
  }

  return patients;
};