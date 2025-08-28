import { StudyData } from '@/api/types';

export const diabetesStudyData: StudyData = {
  id: 'diabetes',
  name: 'Diabetes Registry',
  studySize: '15,000 patients',
  totalPatients: 12500,
  totalDescription: 'of 15,000 target patients enrolled',
  averageBMI: '31.8',
  ageRange: '25-85',
  enrolledSites: 67,
  targetEnrollment: 15000,
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