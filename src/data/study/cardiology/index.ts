import { StudyData } from '@/api/types';
import { cardiologyPatientConfig } from './patients';

export const cardiologyStudyData: StudyData = {
  id: 'cardiology',
  name: 'Cardiology Registry',
  enrollmentUnits: 'cases',
  overviewMetrics: [
    { metricId: 'comorbidity_count', displayType: 'average', icon: 'bar-chart', description: 'Average comorbidities per patient' }
  ],
  enrollmentMetric: {
    metricId: 'heart_conditions',
    displayType: 'distribution',
    orientation: 'horizontal'
  },
  description: 'Heart rhythm disorders and arrhythmia treatment effectiveness studies',
  status: 'recruiting',
  startDate: '2023-03-01',
  estimatedCompletionDate: '2026-02-28',
  regions: {
    us: true,
    eu: false
  },
  patientConfig: cardiologyPatientConfig
};

export { cardiologySites } from './sites';
export { generateCardiologyPatients, cardiologyPatientConfig } from './patients';