import { StudyData } from '@/api/types';
import { diabetesPatientConfig } from './patients';

export const diabetesStudyData: StudyData = {
  id: 'diabetes',
  name: 'Diabetes Registry',
  enrollmentUnits: 'patients',
  overviewMetrics: [
    { metricId: 'bmi', displayType: 'average', icon: 'trending-up', description: 'kg/m² (diabetes management focus)' }
  ],
  overviewLayout: {
    additionalComponents: [
      {
        type: 'assessment-progress',
        title: 'Assessment Completion Progress'
      },
      {
        type: 'metric',
        metricId: 'comorbidity_count',
        displayType: 'average',
        icon: 'activity',
        description: 'Average comorbidities per diabetes patient'
      }
    ]
  },
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
  assessmentTargets: {
    perPatient: {
      baseline: 2, // IWQOL, EQ-5D
      sixMonths: 2,
      oneYear: 2,
      twoYears: 2
    },
    assessmentTypes: ['IWQOL', 'EQ-5D']
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