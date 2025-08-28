import { StudyData } from '@/api/types';
import { cardiologyPatientConfig } from './patients';

export const cardiologyStudyData: StudyData = {
  id: 'cardiology',
  name: 'Cardiology Registry',
  averageBMI: '29.8',
  ageRange: '35-85',
  enrollmentUnits: 'cases',
  enrollmentConfig: {
    breakdownType: 'conditions',
    breakdownLabel: 'Heart Rhythm Disorders',
    categories: [
      { key: 'atrial_fibrillation', label: 'Atrial Fibrillation', weight: 0.35 },
      { key: 'ventricular_tachycardia', label: 'Ventricular Tachycardia', weight: 0.25 },
      { key: 'supraventricular_tachycardia', label: 'Supraventricular Tachycardia', weight: 0.20 },
      { key: 'bradycardia', label: 'Bradycardia', weight: 0.15 },
      { key: 'heart_block', label: 'Heart Block', weight: 0.05 }
    ]
  },
  description: 'Heart rhythm disorders and arrhythmia treatment effectiveness studies',
  status: 'recruiting',
  startDate: '2023-03-01',
  estimatedCompletionDate: '2026-02-28',
  regions: {
    us: true,
    eu: false
  },
  patientConfig: cardiologyPatientConfig
};

export { cardiologySites } from './sites';
export { generateCardiologyPatients, cardiologyPatientConfig } from './patients';