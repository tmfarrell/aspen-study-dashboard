import { StudyData } from '@/api/types';

export const hypertensionStudyData: StudyData = {
  id: 'hypertension',
  name: 'MASH Registry',
  studySize: '8,500 patients',
  totalPatients: 6800,
  totalDescription: 'of 8,500 target patients enrolled',
  averageBMI: '33.4',
  ageRange: '30-80',
  enrolledSites: 34,
  targetEnrollment: 8500,
  description: 'Hypertension management and cardiovascular risk reduction research',
  status: 'active',
  startDate: '2023-09-01',
  estimatedCompletionDate: '2025-08-31',
  regions: {
    us: true,
    eu: false
  }
};

export { hypertensionSites } from './sites';