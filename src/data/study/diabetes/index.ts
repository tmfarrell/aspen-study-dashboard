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
  patientDisplayFields: [
    { key: 'bmi', label: 'BMI', type: 'number' },
    { key: 'enrollmentCategory', label: 'Diabetes Type', type: 'text' },
    { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date', formatter: 'date' }
  ],
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
      baseline: 3, // DTSQ, EQ-5D-5L, PHQ-9
      sixMonths: 3,
      oneYear: 3,
      twoYears: 3
    },
    assessmentTypes: ['DTSQ', 'EQ-5D-5L', 'PHQ-9']
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
  patientConfig: diabetesPatientConfig,
  studySpecificMetrics: [
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
  ],
  qualityOfLifeMetrics: [
    {
      id: 'assessment_completion_rate',
      name: 'Assessment Completion Rate',
      description: 'Percentage of completed quality of life assessments',
      type: 'numerical',
      field: 'qualityOfLifeAssessments'
    }
  ]
};


export { diabetesSites } from './sites';
export { generateDiabetesPatients, diabetesPatientConfig } from './patients';