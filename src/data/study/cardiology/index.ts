import { StudyData } from '@/api/types';

export const cardiologyStudyData: StudyData = {
  id: 'cardiology',
  name: 'Cardiology Registry',
  averageBMI: '29.8',
  ageRange: '35-85',
  enrollmentUnits: 'cases',
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