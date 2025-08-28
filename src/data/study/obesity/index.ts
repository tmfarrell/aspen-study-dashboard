import { StudyData } from '@/api/types';

export const obesityStudyData: StudyData = {
  id: 'obesity',
  name: 'Obesity Registry',
  averageBMI: '36.2',
  ageRange: '18-89',
  targetEnrollment: 10000,
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