import { useQuery } from '@tanstack/react-query';
import { hospitalizationApi } from './api';
import { StudyType } from '@/api/types';

// Query keys
export const outcomesKeys = {
  all: ['outcomes'] as const,
  hospitalizations: ['hospitalizations'] as const,
  hospitalizationsByStudy: (studyId: StudyType) => [...outcomesKeys.hospitalizations, studyId] as const,
};

// Get hospitalization outcomes by study
export const useHospitalizationOutcomes = (studyId: StudyType) => {
  return useQuery({
    queryKey: outcomesKeys.hospitalizationsByStudy(studyId),
    queryFn: () => hospitalizationApi.getByStudy(studyId),
    select: (response) => response.data,
    enabled: !!studyId,
  });
};