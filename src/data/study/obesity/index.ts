import { StudyData } from '@/api/types';
import { obesityPatientConfig } from './patients';

export const obesityStudyData: StudyData = {
  id: 'obesity',
  name: 'Obesity Registry',
  enrollmentUnits: 'patients',
  overviewMetrics: [
    { metricId: 'bmi', displayType: 'average', icon: 'activity', description: 'kg/m² across cohort' }
  ],
  overviewLayout: {
    additionalComponents: [
      {
        type: 'assessment-progress',
        title: 'Assessment Completion Progress'
      },
      {
        type: 'metric',
        metricId: 'bmi',
        displayType: 'distribution',
        orientation: 'horizontal',
        icon: 'activity',
        description: 'BMI distribution across patient cohort',
        title: 'BMI Distribution'
      }
    ]
  },
  patientDisplayFields: [
    { key: 'bmi', label: 'BMI', type: 'number' },
    { key: 'bmi', label: 'BMI Category', type: 'badge', formatter: 'bmi-category' },
    { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date', formatter: 'date' }
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
  assessmentTargets: {
    perPatient: {
      baseline: 4, // IWQOL-Lite, EQ-5D-5L, SF-36, PHQ-9
      sixMonths: 4,
      oneYear: 4,
      twoYears: 4
    },
    assessmentTypes: ['IWQOL-Lite', 'EQ-5D-5L', 'SF-36', 'PHQ-9']
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