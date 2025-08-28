import { useQuery } from '@tanstack/react-query';
import { enrollmentApi } from './api';
import { StudyType } from '@/api/types';

// Query keys
export const enrollmentKeys = {
  all: ['enrollment'] as const,
  stats: (studyId: StudyType) => [...enrollmentKeys.all, 'stats', studyId] as const,
};

// Get enrollment statistics for a study
export const useEnrollmentStats = (studyId: StudyType) => {
  return useQuery({
    queryKey: enrollmentKeys.stats(studyId),
    queryFn: () => enrollmentApi.getEnrollmentStats(studyId),
    select: (response) => response.data,
    enabled: !!studyId,
  });
};