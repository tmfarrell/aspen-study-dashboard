import { create } from 'zustand';
import { studyData, StudyType } from '@/data/studyData';

interface CohortStore {
  selectedStudy: StudyType;
  populationSize: number;
  currentCohortSize: number;
  setSelectedStudy: (study: StudyType) => void;
  applyCriteria: (criteriaCount: number) => void;
  resetCohortSize: () => void;
}

// Get initial values from the default study
const DEFAULT_STUDY: StudyType = 'obesity';
const getInitialPopulation = (): number => {
  return studyData[DEFAULT_STUDY]?.totalPatients || 0;
};

export const useCohortStore = create<CohortStore>((set, get) => ({
  selectedStudy: DEFAULT_STUDY,
  populationSize: getInitialPopulation(),
  currentCohortSize: getInitialPopulation(),
  
  setSelectedStudy: (study) => set(() => {
    const newPopulation = studyData[study]?.totalPatients || 0;
    return {
      selectedStudy: study,
      populationSize: newPopulation,
      currentCohortSize: newPopulation, // Reset cohort size to full population when changing studies
    };
  }),
  
  applyCriteria: (criteriaCount) => set((state) => {
    if (!state.populationSize || criteriaCount === 0) {
      return { currentCohortSize: state.populationSize };
    }
    
    // Simulate reduction based on criteria count
    // Each criteria reduces the cohort by 5-15% randomly
    const reductionFactor = Math.pow(
      1 - (Math.random() * 0.1 + 0.05), 
      criteriaCount
    );
    
    return {
      currentCohortSize: Math.max(Math.floor(state.populationSize * reductionFactor), 0)
    };
  }),

  resetCohortSize: () => set((state) => ({
    currentCohortSize: state.populationSize
  })),
})); 