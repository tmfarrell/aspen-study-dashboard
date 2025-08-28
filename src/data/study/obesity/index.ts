import { StudyData } from '@/api/types';

export const obesityStudyData: StudyData = {
  id: 'obesity',
  name: 'Obesity Registry',
  averageBMI: '36.2',
  ageRange: '18-89',
  enrollmentUnits: 'patients',
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
  enrollmentConfig: {
    breakdownType: 'bmi',
    breakdownLabel: 'BMI Categories',
    categories: [
      { key: 'class1', label: 'Class I Obesity (30-34.9)', weight: 0.42 },
      { key: 'class2', label: 'Class II Obesity (35-39.9)', weight: 0.35 },
      { key: 'class3', label: 'Class III Obesity (40+)', weight: 0.23 }
    ]
  },
  description: 'Comprehensive obesity research tracking patient outcomes, treatments, and interventions',
  status: 'active',
  startDate: '2023-01-15',
  estimatedCompletionDate: '2025-12-31',
  regions: {
    us: false,
    eu: true
  }
};

export { obesitySites } from './sites';