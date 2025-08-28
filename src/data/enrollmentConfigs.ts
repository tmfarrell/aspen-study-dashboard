import { StudyEnrollmentConfig } from '@/api/enrollmentTypes';

export const enrollmentConfigs: Record<string, StudyEnrollmentConfig> = {
  cardiology: {
    studyId: 'cardiology',
    breakdownType: 'conditions',
    breakdownLabel: 'Heart Rhythm Disorders',
    categories: [
      { key: 'atrial_fibrillation', label: 'Atrial Fibrillation', weight: 0.35 },
      { key: 'ventricular_tachycardia', label: 'Ventricular Tachycardia', weight: 0.25 },
      { key: 'supraventricular_tachycardia', label: 'Supraventricular Tachycardia', weight: 0.20 },
      { key: 'bradycardia', label: 'Bradycardia', weight: 0.15 },
      { key: 'heart_block', label: 'Heart Block', weight: 0.05 }
    ],
    targetEnrollment: {
      total: 5000,
      targetDate: '2026-03',
      byCountry: [
        { country: 'United States', target: 4000 },
        { country: 'Canada', target: 600 },
        { country: 'Mexico', target: 400 }
      ]
    }
  },
  diabetes: {
    studyId: 'diabetes',
    breakdownType: 'demographics',
    breakdownLabel: 'Patient Demographics',
    categories: [
      { key: 'type2_newly_diagnosed', label: 'Type 2 - Newly Diagnosed', weight: 0.30 },
      { key: 'type2_established', label: 'Type 2 - Established', weight: 0.45 },
      { key: 'prediabetes', label: 'Prediabetes', weight: 0.20 },
      { key: 'gestational', label: 'Gestational Diabetes', weight: 0.05 }
    ]
  },
  obesity: {
    studyId: 'obesity',
    breakdownType: 'bmi',
    breakdownLabel: 'BMI Categories',
    categories: [
      { key: 'class1', label: 'Class I Obesity (30-34.9)', weight: 0.42 },
      { key: 'class2', label: 'Class II Obesity (35-39.9)', weight: 0.35 },
      { key: 'class3', label: 'Class III Obesity (40+)', weight: 0.23 }
    ]
  },
  hypertension: {
    studyId: 'hypertension',
    breakdownType: 'procedures',
    breakdownLabel: 'Treatment Categories',
    categories: [
      { key: 'medication_management', label: 'Medication Management', weight: 0.50 },
      { key: 'lifestyle_intervention', label: 'Lifestyle Intervention', weight: 0.30 },
      { key: 'surgical_intervention', label: 'Surgical Intervention', weight: 0.15 },
      { key: 'combination_therapy', label: 'Combination Therapy', weight: 0.05 }
    ],
    targetEnrollment: {
      total: 2500,
      targetDate: '2025-12',
      byCountry: [
        { country: 'United States', target: 2000 },
        { country: 'Canada', target: 300 },
        { country: 'Mexico', target: 200 }
      ]
    }
  }
};