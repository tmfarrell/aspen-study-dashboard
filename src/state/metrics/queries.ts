// React Query hooks for metrics
import { useQuery } from '@tanstack/react-query';
import { StudyType } from '@/api/types';
import { metricsApi } from './api';

export const useStudyMetrics = (studyId: StudyType) => {
  return useQuery({
    queryKey: ['metrics', studyId],
    queryFn: () => metricsApi.getStudyMetrics(studyId),
    staleTime: 1000 * 60 * 10, // 10 minutes - metrics don't change often
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useMetric = (studyId: StudyType, metricId: string) => {
  return useQuery({
    queryKey: ['metric', studyId, metricId],
    queryFn: () => metricsApi.getMetricById(studyId, metricId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};