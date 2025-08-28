import { StudyData } from '@/api/types';

export const cardiologyStudyData: StudyData = {
  id: 'cardiology',
  name: 'Cardiology Registry',
  studySize: '12,000 patients',
  totalPatients: 9500,
  totalDescription: 'of 12,000 target patients enrolled',
  averageBMI: '29.8',
  ageRange: '35-85',
  enrolledSites: 52,
  targetEnrollment: 12000,
  description: 'Heart rhythm disorders and arrhythmia treatment effectiveness studies',
  status: 'recruiting',
  startDate: '2023-03-01',
  estimatedCompletionDate: '2026-02-28',
  regions: {
    us: true,
    eu: false
  }
};

export { cardiologySites } from './sites';