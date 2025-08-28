import { StudyData } from '@/api/types';

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
  description: 'Type 2 diabetes management and outcomes research across multiple healthcare settings',
  status: 'active',
  startDate: '2022-06-01',
  estimatedCompletionDate: '2026-05-31',
  regions: {
    us: true,
    eu: true
  }
};

export { diabetesSites } from './sites';