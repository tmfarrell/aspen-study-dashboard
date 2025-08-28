import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  selectedStudyAtom, 
  sidebarCollapsedAtom,
  patientFiltersAtom,
  siteFiltersAtom,
  studyFiltersAtom,
  patientDetailModalAtom,
  siteDetailModalAtom,
  chartTypeAtom,
  regionFilterAtom,
  populationSizeAtom,
  currentCohortSizeAtom,
  populationSizeForStudyAtom
} from '@/stores/atoms';
import { StudyType } from '@/api/types';
import { useStudyStats } from '@/state/studies';

interface AppStateContextType {
  // Study Selection
  selectedStudy: StudyType;
  setSelectedStudy: (study: StudyType) => void;
  
  // UI State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Filters
  patientFilters: any;
  setPatientFilters: (filters: any) => void;
  siteFilters: any;
  setSiteFilters: (filters: any) => void;
  studyFilters: any;
  setStudyFilters: (filters: any) => void;
  
  // Modals
  patientDetailModal: { isOpen: boolean; patientId: string | null };
  setPatientDetailModal: (modal: { isOpen: boolean; patientId: string | null }) => void;
  siteDetailModal: { isOpen: boolean; siteId: string | null };
  setSiteDetailModal: (modal: { isOpen: boolean; siteId: string | null }) => void;
  
  // Chart Settings
  chartType: 'bar' | 'pie' | 'line';
  setChartType: (type: 'bar' | 'pie' | 'line') => void;
  regionFilter: string;
  setRegionFilter: (region: string) => void;
  
  // Cohort Management
  populationSize: number;
  currentCohortSize: number;
  applyCriteria: (criteriaCount: number) => void;
  resetCohortSize: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [selectedStudy, setSelectedStudy] = useAtom(selectedStudyAtom);
  const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarCollapsedAtom);
  const [patientFilters, setPatientFilters] = useAtom(patientFiltersAtom);
  const [siteFilters, setSiteFilters] = useAtom(siteFiltersAtom);
  const [studyFilters, setStudyFilters] = useAtom(studyFiltersAtom);
  const [patientDetailModal, setPatientDetailModal] = useAtom(patientDetailModalAtom);
  const [siteDetailModal, setSiteDetailModal] = useAtom(siteDetailModalAtom);
  const [chartType, setChartType] = useAtom(chartTypeAtom);
  const [regionFilter, setRegionFilter] = useAtom(regionFilterAtom);
  const [populationSize, setPopulationSize] = useAtom(populationSizeAtom);
  const [currentCohortSize, setCurrentCohortSize] = useAtom(currentCohortSizeAtom);
  const [populationForStudy] = useAtom(populationSizeForStudyAtom);

  // Get study stats through React Query
  const { data: stats } = useStudyStats(selectedStudy);

  // Custom setSelectedStudy that also updates cohort data
  const handleSetSelectedStudy = (study: StudyType) => {
    setSelectedStudy(study);
    // The effect below will handle updating population size when stats load
  };

  // Apply criteria function (same logic as cohortStore)
  const applyCriteria = (criteriaCount: number) => {
    if (!populationSize || criteriaCount === 0) {
      setCurrentCohortSize(populationSize);
      return;
    }
    
    // Simulate reduction based on criteria count
    // Each criteria reduces the cohort by 5-15% randomly
    const reductionFactor = Math.pow(
      1 - (Math.random() * 0.1 + 0.05), 
      criteriaCount
    );
    
    const newCohortSize = Math.max(Math.floor(populationSize * reductionFactor), 0);
    setCurrentCohortSize(newCohortSize);
  };

  // Reset cohort size function
  const resetCohortSize = () => {
    setCurrentCohortSize(populationSize);
  };

  // Initialize population size when stats are loaded
  useEffect(() => {
    if (stats?.totalPatients) {
      const newPopulation = stats.totalPatients;
      setPopulationSize(newPopulation);
      if (currentCohortSize === 0) {
        setCurrentCohortSize(newPopulation);
      }
    }
  }, [stats, setPopulationSize, setCurrentCohortSize, currentCohortSize]);

  const value: AppStateContextType = {
    selectedStudy,
    setSelectedStudy: handleSetSelectedStudy,
    sidebarCollapsed,
    setSidebarCollapsed,
    patientFilters,
    setPatientFilters,
    siteFilters,
    setSiteFilters,
    studyFilters,
    setStudyFilters,
    patientDetailModal,
    setPatientDetailModal,
    siteDetailModal,
    setSiteDetailModal,
    chartType,
    setChartType,
    regionFilter,
    setRegionFilter,
    populationSize,
    currentCohortSize,
    applyCriteria,
    resetCohortSize,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};