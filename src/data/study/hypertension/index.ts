import { StudyData } from '@/api/types';
import { hypertensionPatientConfig } from './patients';

export const hypertensionStudyData: StudyData = {
  id: 'hypertension',
  name: 'MASH Registry',
  enrollmentUnits: 'patients',
  overviewMetrics: [
    { metricId: 'comorbidity_count', displayType: 'average', icon: 'bar-chart', description: 'Metabolic comorbidities per patient' }
  ],
  targetEnrollment: {
    total: 8500,
    targetDate: '2025-12',
    byCountry: {
      'US': 6800,
      'CA': 1020,
      'MX': 680
    }
  },
  enrollmentMetric: {
    metricId: 'treatment_categories',
    displayType: 'distribution',
    orientation: 'horizontal'
  },
  description: 'Hypertension management and cardiovascular risk reduction research',
  status: 'active',
  startDate: '2023-09-01',
  estimatedCompletionDate: '2025-08-31',
  regions: {
    us: true,
    eu: false
  },
  patientConfig: hypertensionPatientConfig
};

export { hypertensionSites } from './sites';
export { generateHypertensionPatients, hypertensionPatientConfig } from './patients';