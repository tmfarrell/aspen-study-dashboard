import { StudyData } from '../../studyData';

export const obesityStudyData: StudyData = {
  name: 'Obesity Registry',
  studySize: '10,000 patients',
  totalPatients: 8000,
  totalDescription: 'of 10,000 target patients enrolled',
  averageBMI: '36.2',
  ageRange: '18-89',
  regions: {
    us: false,
    eu: true
  }
};

export { obesitySites } from './sites';