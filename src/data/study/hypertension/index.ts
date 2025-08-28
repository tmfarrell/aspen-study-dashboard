import { StudyData } from '@/api/types';

export const hypertensionStudyData: StudyData = {
  id: 'hypertension',
  name: 'MASH Registry',
  averageBMI: '33.4',
  ageRange: '30-80',
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