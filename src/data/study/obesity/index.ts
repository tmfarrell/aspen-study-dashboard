import { StudyData } from '@/api/types';

export const obesityStudyData: StudyData = {
  id: 'obesity',
  name: 'Obesity Registry',
  studySize: '10,000 patients',
  totalPatients: 8000,
  totalDescription: 'of 10,000 target patients enrolled',
  averageBMI: '36.2',
  ageRange: '18-89',
  enrolledSites: 45,
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