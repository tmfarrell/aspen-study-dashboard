import { StudyData } from '@/api/types';
import { diabetesPatientConfig } from './patients';

export const diabetesStudyData: StudyData = {
  id: 'diabetes',
  name: 'Diabetes Registry',
  averageBMI: '31.8',
  ageRange: '25-85',
  enrollmentUnits: 'patients',
  targetEnrollment: {
    total: 15000,
    byCountry: {
      'US': 8000,
      'DE': 2500,
      'FR': 2000,
      'UK': 1500,
      'IT': 1000
    }
  },
  enrollmentMetric: {
    metricId: 'diabetes_types',
    displayType: 'distribution',
    orientation: 'horizontal'
  },
  description: 'Type 2 diabetes management and outcomes research across multiple healthcare settings',
  status: 'active',
  startDate: '2022-06-01',
  estimatedCompletionDate: '2026-05-31',
  regions: {
    us: true,
    eu: true
  },
  patientConfig: diabetesPatientConfig
};

export { diabetesSites } from './sites';
export { generateDiabetesPatients, diabetesPatientConfig } from './patients';