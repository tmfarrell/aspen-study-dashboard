import { StudyData, StudyType } from '@/api/types';

import { cardiologyStudyData } from './study/cardiology';
import { obesityStudyData } from './study/obesity';
import { diabetesStudyData } from './study/diabetes';
import { hypertensionStudyData } from './study/hypertension';

export const studyData: Record<StudyType, StudyData> = {
  cardiology: cardiologyStudyData,
  obesity: obesityStudyData,
  diabetes: diabetesStudyData,
  hypertension: hypertensionStudyData
};

export type { StudyType };

// Helper function to get study options for Select components
export const getStudyOptions = () => {
  return Object.entries(studyData).map(([key, study]) => ({
    value: key,
    label: study.name
  }));
}; 