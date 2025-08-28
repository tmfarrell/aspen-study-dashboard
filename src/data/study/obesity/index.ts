import { StudyData } from '@/api/types';
import { obesityPatientConfig } from './patients';

export const obesityStudyData: StudyData = {
  id: 'obesity',
  name: 'Obesity Registry',
  ageRange: '18-89',
  enrollmentUnits: 'patients',
  overviewMetrics: [
    { metricId: 'bmi', displayType: 'average', icon: 'activity', description: 'kg/m² across cohort' }
  ],
  targetEnrollment: {
    total: 10000,
    byCountry: {
      'DE': 3000,
      'FR': 2500,
      'ES': 2000,
      'IT': 1500,
      'CH': 1000
    }
  },
  enrollmentMetric: {
    metricId: 'bmi',
    displayType: 'distribution',
    orientation: 'horizontal'
  },
  description: 'Comprehensive obesity research tracking patient outcomes, treatments, and interventions',
  status: 'active',
  startDate: '2023-01-15',
  estimatedCompletionDate: '2025-12-31',
  regions: {
    us: false,
    eu: true
  },
  patientConfig: obesityPatientConfig
};

export { obesitySites } from './sites';
export { generateObesityPatients, obesityPatientConfig } from './patients';