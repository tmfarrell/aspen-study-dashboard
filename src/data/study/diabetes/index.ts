import { StudyData } from '@/api/types';
import { diabetesPatientConfig } from './patients';

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
  enrollmentConfig: {
    breakdownType: 'demographics',
    breakdownLabel: 'Patient Demographics',
    categories: [
      { key: 'type2_newly_diagnosed', label: 'Type 2 - Newly Diagnosed', weight: 0.30 },
      { key: 'type2_established', label: 'Type 2 - Established', weight: 0.45 },
      { key: 'prediabetes', label: 'Prediabetes', weight: 0.20 },
      { key: 'gestational', label: 'Gestational Diabetes', weight: 0.05 }
    ]
  },
  description: 'Type 2 diabetes management and outcomes research across multiple healthcare settings',
  status: 'active',
  startDate: '2022-06-01',
  estimatedCompletionDate: '2026-05-31',
  regions: {
    us: true,
    eu: true
  },
  patientConfig: diabetesPatientConfig
};

export { diabetesSites } from './sites';
export { generateDiabetesPatients, diabetesPatientConfig } from './patients';