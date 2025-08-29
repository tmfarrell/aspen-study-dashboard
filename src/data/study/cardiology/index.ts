import { StudyData } from '@/api/types';
import { cardiologyPatientConfig } from './patients';
import { cardiologySites } from './sites';

export const cardiologyStudyData: StudyData = {
  id: 'cardiology',
  name: 'Cardiology Registry',
  enrollmentUnits: 'cases',
  overviewMetrics: [],
  overviewLayout: {
    additionalComponents: [
      {
        type: 'assessment-progress',
        title: 'Assessment Completion Progress'
      }
    ]
  },
  patientDisplayFields: [
    { key: 'enrollmentCategory', label: 'Heart Condition', type: 'text' },
    { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date', formatter: 'date' }
  ],
  assessmentTargets: {
    perPatient: {
      baseline: 3, // AFEQT, SF-36, EQ-5D
      sixMonths: 3,
      oneYear: 3,
      twoYears: 3
    },
    assessmentTypes: ['AFEQT', 'SF-36', 'EQ-5D']
  },
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
  patientConfig: cardiologyPatientConfig,
  studySpecificMetrics: [
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
  ],
  qualityOfLifeMetrics: [
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
  ],
  sites: cardiologySites
};

export { generateCardiologyPatients, cardiologyPatientConfig } from './patients';