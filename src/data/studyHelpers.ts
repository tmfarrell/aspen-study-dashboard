import { StudyType, PatientData } from '@/api/types';
import { cardiologySites } from './study/cardiology/sites';
import { diabetesSites } from './study/diabetes/sites';
import { obesitySites } from './study/obesity/sites';
import { hypertensionSites } from './study/hypertension/sites';

// Metrics types
export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  type: 'categorical' | 'numerical';
  field: keyof PatientData | string; // string for nested fields like 'comorbidities.length'
  buckets?: { min: number; max: number; label: string }[]; // For numerical metrics
}

export interface CategoricalMetric {
  id: string;
  name: string;
  type: 'categorical';
  data: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  total: number;
}

export interface NumericalMetric {
  id: string;
  name: string;
  type: 'numerical';
  min: number;
  max: number;
  average: number;
  median: number;
  data: Array<{
    bucket: string;
    min: number;
    max: number;
    count: number;
    percentage: number;
  }>;
  total: number;
}

export type MetricResult = CategoricalMetric | NumericalMetric;

export interface StudyMetrics {
  studyId: StudyType;
  totalPatients: number;
  metrics: MetricResult[];
  generatedAt: string;
}

// Standard metrics available for all studies
export const STANDARD_METRICS: MetricDefinition[] = [
  {
    id: 'age',
    name: 'Age Distribution',
    description: 'Patient age distribution in years',
    type: 'numerical',
    field: 'age',
    
  },
  {
    id: 'gender',
    name: 'Gender Distribution',
    description: 'Patient gender distribution',
    type: 'categorical',
    field: 'gender'
  },
  {
    id: 'race',
    name: 'Race Distribution', 
    description: 'Patient racial demographics',
    type: 'categorical',
    field: 'race'
  },
  {
    id: 'ethnicity',
    name: 'Ethnicity Distribution',
    description: 'Patient ethnic background',
    type: 'categorical',
    field: 'ethnicity'
  },
  {
    id: 'bmi',
    name: 'BMI Distribution',
    description: 'Body Mass Index distribution',
    type: 'numerical',
    field: 'bmi',
    buckets: [
      { min: 0, max: 18.5, label: 'Underweight' },
      { min: 18.5, max: 25, label: 'Normal' },
      { min: 25, max: 30, label: 'Overweight' },
      { min: 30, max: 35, label: 'Obese Class I' },
      { min: 35, max: 40, label: 'Obese Class II' },
      { min: 40, max: 100, label: 'Obese Class III' }
    ]
  },
  {
    id: 'bmi_obesity',
    name: 'BMI Categories',
    description: 'BMI categories for obesity study',
    type: 'numerical', 
    field: 'bmi',
    buckets: [
      { min: 30, max: 34.9, label: 'Class I Obesity (30-34.9)' },
      { min: 35, max: 39.9, label: 'Class II Obesity (35-39.9)' },
      { min: 40, max: 60, label: 'Class III Obesity (40+)' }
    ]
  },
  {
    id: 'status',
    name: 'Patient Status',
    description: 'Current patient enrollment status',
    type: 'categorical',
    field: 'status'
  },
  {
    id: 'comorbidity_count',
    name: 'Comorbidity Count',
    description: 'Number of comorbidities per patient',
    type: 'numerical',
    field: 'medicalHistory',
    
  }
];

// Get sites for a specific study
export const getStudySites = (studyId: StudyType) => {
  switch (studyId) {
    case 'cardiology':
      return cardiologySites;
    case 'diabetes':
      return diabetesSites;
    case 'obesity':
      return obesitySites;
    case 'hypertension':
      return hypertensionSites;
    default:
      return [];
  }
};

// Calculate total patients from site data
export const calculateTotalPatients = (studyId: StudyType): number => {
  const sites = getStudySites(studyId);
  return sites.reduce((total, site) => total + site.enrolledPatients, 0);
};

// Calculate number of enrolled (active) sites
export const calculateEnrolledSites = (studyId: StudyType): number => {
  const sites = getStudySites(studyId);
  return sites.filter(site => site.status === 'active').length;
};

// Generate enrollment description text for studies with target enrollment
export const generateEnrollmentDescription = (totalPatients: number, targetEnrollment?: { total: number }): string => {
  if (!targetEnrollment) {
    return 'registry enrollment ongoing';
  }
  return `of ${targetEnrollment.total.toLocaleString()} target patients enrolled`;
};

// Get study-specific metrics
export const getStudySpecificMetrics = (studyId: StudyType): MetricDefinition[] => {
  switch (studyId) {
    case 'cardiology':
      return [
        {
          id: 'cardiac_medications',
          name: 'Cardiac Medications',
          description: 'Common cardiac medications',
          type: 'categorical',
          field: 'medications'
        },
        {
          id: 'heart_conditions',
          name: 'Heart Rhythm Disorders',
          description: 'Enrollment by heart rhythm disorders',
          type: 'categorical',
          field: 'enrollmentCategory'
        }
      ];
    case 'obesity':
      return [
        {
          id: 'weight_loss_medications',
          name: 'Weight Loss Medications',
          description: 'Medications for weight management',
          type: 'categorical',
          field: 'medications'
        }
      ];
    case 'diabetes':
      return [
        {
          id: 'diabetes_medications',
          name: 'Diabetes Medications',
          description: 'Antidiabetic medications',
          type: 'categorical',
          field: 'medications'
        },
        {
          id: 'diabetes_types',
          name: 'Patient Demographics',
          description: 'Enrollment by diabetes demographics',
          type: 'categorical',
          field: 'enrollmentCategory'
        }
      ];
    case 'hypertension':
      return [
        {
          id: 'bp_medications',
          name: 'Blood Pressure Medications',
          description: 'Antihypertensive medications',
          type: 'categorical',
          field: 'medications'
        },
        {
          id: 'treatment_categories',
          name: 'Treatment Categories',
          description: 'Enrollment by treatment categories',
          type: 'categorical',
          field: 'enrollmentCategory'
        }
      ];
    default:
      return [];
  }
};

// Quality of Life Assessment metrics
const QOL_METRICS: MetricDefinition[] = [
  {
    id: 'afeqt_scores',
    name: 'AFEQT Scores',
    description: 'Atrial Fibrillation Effect on Quality of Life scores',
    type: 'numerical',
    field: 'qualityOfLifeAssessments',
    buckets: [
      { min: 0, max: 25, label: 'Poor (0-25)' },
      { min: 26, max: 50, label: 'Fair (26-50)' },
      { min: 51, max: 75, label: 'Good (51-75)' },
      { min: 76, max: 100, label: 'Excellent (76-100)' }
    ]
  },
  {
    id: 'sf36_scores',
    name: 'SF-36 Physical Function Scores',
    description: 'SF-36 Physical Function assessment scores',
    type: 'numerical',
    field: 'qualityOfLifeAssessments',
    buckets: [
      { min: 0, max: 25, label: 'Poor (0-25)' },
      { min: 26, max: 50, label: 'Fair (26-50)' },
      { min: 51, max: 75, label: 'Good (51-75)' },
      { min: 76, max: 100, label: 'Excellent (76-100)' }
    ]
  },
  {
    id: 'eq5d_scores',
    name: 'EQ-5D-5L Health Status',
    description: 'EQ-5D-5L Health Status Index scores',
    type: 'numerical',
    field: 'qualityOfLifeAssessments',
    buckets: [
      { min: 0, max: 0.25, label: 'Poor (0-0.25)' },
      { min: 0.26, max: 0.50, label: 'Fair (0.26-0.50)' },
      { min: 0.51, max: 0.75, label: 'Good (0.51-0.75)' },
      { min: 0.76, max: 1.0, label: 'Excellent (0.76-1.0)' }
    ]
  },
  {
    id: 'assessment_completion_rate',
    name: 'Assessment Completion Rate',
    description: 'Percentage of completed quality of life assessments',
    type: 'numerical',
    field: 'qualityOfLifeAssessments'
  }
];

// Get all metrics for a study (standard + study-specific)
export const getAllMetricsForStudy = (studyId: StudyType): MetricDefinition[] => {
  const standardMetrics = STANDARD_METRICS;
  const studySpecificMetrics = getStudySpecificMetrics(studyId);
  
  // Add QoL metrics for studies with assessment targets
  let qolMetrics: MetricDefinition[] = [];
  if (studyId === 'cardiology') {
    qolMetrics = QOL_METRICS;
  } else if (studyId === 'obesity' || studyId === 'diabetes') {
    // Add just the assessment completion rate metric for these studies
    qolMetrics = [QOL_METRICS.find(m => m.id === 'assessment_completion_rate')!];
  }
  
  return [...standardMetrics, ...studySpecificMetrics, ...qolMetrics];
};