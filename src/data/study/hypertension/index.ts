import { StudyData } from '@/api/types';

export const hypertensionStudyData: StudyData = {
  id: 'hypertension',
  name: 'MASH Registry',
  averageBMI: '33.4',
  ageRange: '30-80',
  enrollmentUnits: 'patients',
  targetEnrollment: {
    total: 8500,
    targetDate: '2025-12',
    byCountry: {
      'US': 6800,
      'CA': 1020,
      'MX': 680
    }
  },
  enrollmentConfig: {
    breakdownType: 'procedures',
    breakdownLabel: 'Treatment Categories',
    categories: [
      { key: 'medication_management', label: 'Medication Management', weight: 0.50 },
      { key: 'lifestyle_intervention', label: 'Lifestyle Intervention', weight: 0.30 },
      { key: 'surgical_intervention', label: 'Surgical Intervention', weight: 0.15 },
      { key: 'combination_therapy', label: 'Combination Therapy', weight: 0.05 }
    ]
  },
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