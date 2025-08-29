import { StudyData } from '@/api/types';
import { hypertensionPatientConfig } from './patients';

export const hypertensionStudyData: StudyData = {
  id: 'hypertension',
  name: 'MASH Registry',
  enrollmentUnits: 'patients',
  overviewMetrics: [
    { metricId: 'comorbidity_count', displayType: 'average', icon: 'bar-chart', description: 'Metabolic comorbidities per patient' }
  ],
  overviewLayout: {
    additionalComponents: [
      {
        type: 'metric',
        metricId: 'treatment_categories',
        displayType: 'distribution',
        orientation: 'horizontal',
        icon: 'bar-chart',
        description: 'Treatment categories distribution'
      }
    ]
  },
  patientDisplayFields: [
    { key: 'bmi', label: 'BMI', type: 'number' },
    { key: 'enrollmentCategory', label: 'Treatment Category', type: 'text' },
    { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date', formatter: 'date' }
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
  // No assessmentTargets for MASH - purely observational data collection
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
  patientConfig: hypertensionPatientConfig,
  studySpecificMetrics: [
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
  ]
  // No qualityOfLifeMetrics for hypertension - purely observational data collection
};


export { hypertensionSites } from './sites';
export { generateHypertensionPatients, hypertensionPatientConfig } from './patients';