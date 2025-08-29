import { atom } from 'jotai';
import { StudyType } from '@/api/types';

// UI State Atoms
export const selectedStudyAtom = atom<StudyType>('obesity');

// Cohort State Atoms
export const populationSizeAtom = atom<number>(0);
export const currentCohortSizeAtom = atom<number>(0);

export const sidebarCollapsedAtom = atom<boolean>(false);

// Filter State Atoms
export const patientFiltersAtom = atom({
  studyId: undefined as StudyType | undefined,
  ageRange: undefined as { min: number; max: number } | undefined,
  gender: [] as string[],
  bmiRange: undefined as { min: number; max: number } | undefined,
  status: [] as string[],
});

export const siteFiltersAtom = atom({
  status: [] as string[],
  healthStatus: [] as string[],
  country: [] as string[],
  minDataQuality: undefined as number | undefined,
});

export const studyFiltersAtom = atom({
  status: [] as string[],
  minPatients: undefined as number | undefined,
  maxPatients: undefined as number | undefined,
});

// Modal State Atoms
export const patientDetailModalAtom = atom<{
  isOpen: boolean;
  patientId: string | null;
}>({
  isOpen: false,
  patientId: null,
});

export const siteDetailModalAtom = atom<{
  isOpen: boolean;
  siteId: string | null;
}>({
  isOpen: false,
  siteId: null,
});

// Chart Settings Atoms
export const chartTypeAtom = atom<'bar' | 'pie' | 'line'>('bar');

export const regionFilterAtom = atom<string>('global');

// Derived Atoms
export const currentStudyFiltersAtom = atom(
  (get) => ({
    ...get(studyFiltersAtom),
  })
);

export const currentPatientFiltersAtom = atom(
  (get) => ({
    ...get(patientFiltersAtom),
    studyId: get(selectedStudyAtom),
  })
);

// Derived cohort atom that updates when study changes
export const populationSizeForStudyAtom = atom(0); // Will be populated by React Query