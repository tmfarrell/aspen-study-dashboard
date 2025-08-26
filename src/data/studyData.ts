export interface StudyData {
  name: string;
  studySize: string;
  totalPatients: number;
  totalDescription: string;
  averageBMI: string;
  ageRange: string;
}

export const studyData: Record<string, StudyData> = {
  heartrhythm: {
    name: 'Heart Rhythm Registry',
    studySize: '12,000 patients',
    totalPatients: 9500,
    totalDescription: 'of 12,000 target patients enrolled',
    averageBMI: '29.8',
    ageRange: '35-85'
  },
  obesity: {
    name: 'Obesity Registry',
    studySize: '10,000 patients',
    totalPatients: 8000,
    totalDescription: 'of 10,000 target patients enrolled',
    averageBMI: '36.2',
    ageRange: '18-89'
  },
  diabetes: {
    name: 'Diabetes Registry',
    studySize: '15,000 patients',
    totalPatients: 12500,
    totalDescription: 'of 15,000 target patients enrolled',
    averageBMI: '31.8',
    ageRange: '25-85'
  },
  hypertension: {
    name: 'MASH Registry',
    studySize: '8,500 patients',
    totalPatients: 6800,
    totalDescription: 'of 8,500 target patients enrolled',
    averageBMI: '33.4',
    ageRange: '30-80'
  }
};

export type StudyType = keyof typeof studyData;

// Helper function to get study options for Select components
export const getStudyOptions = () => {
  return Object.entries(studyData).map(([key, study]) => ({
    value: key,
    label: study.name
  }));
}; 