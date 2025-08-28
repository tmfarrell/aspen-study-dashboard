export interface StudyData {
  name: string;
  studySize: string;
  totalPatients: number;
  totalDescription: string;
  averageBMI: string;
  ageRange: string;
}

import { heartrhuythmStudyData } from './study/heartrhythm';
import { obesityStudyData } from './study/obesity';
import { diabetesStudyData } from './study/diabetes';
import { hypertensionStudyData } from './study/hypertension';

export const studyData: Record<string, StudyData> = {
  heartrhythm: heartrhuythmStudyData,
  obesity: obesityStudyData,
  diabetes: diabetesStudyData,
  hypertension: hypertensionStudyData
};

export type StudyType = keyof typeof studyData;

// Helper function to get study options for Select components
export const getStudyOptions = () => {
  return Object.entries(studyData).map(([key, study]) => ({
    value: key,
    label: study.name
  }));
}; 