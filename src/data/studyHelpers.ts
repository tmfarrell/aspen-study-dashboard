import { StudyType, PatientData, MetricDefinition } from '@/api/types';
import { cardiologySites } from './study/cardiology/sites';
import { diabetesSites } from './study/diabetes/sites';
import { obesitySites } from './study/obesity/sites';
import { hypertensionSites } from './study/hypertension/sites';
import { studyData } from './studyData';

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

// Get all metrics for a study (standard + study-specific + QoL)
export const getAllMetricsForStudy = (studyId: StudyType): MetricDefinition[] => {
  const study = studyData[studyId];
  const standardMetrics = STANDARD_METRICS;
  const studySpecificMetrics = study?.studySpecificMetrics || [];
  const qolMetrics = study?.qualityOfLifeMetrics || [];
  
  return [...standardMetrics, ...studySpecificMetrics, ...qolMetrics];
};