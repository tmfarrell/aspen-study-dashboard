import React, { createContext, useContext, ReactNode } from 'react';
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
  regionFilterAtom
} from '@/stores/atoms';
import { StudyType } from '@/api/types';

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

  const value: AppStateContextType = {
    selectedStudy,
    setSelectedStudy,
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