import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studiesApi } from './api';
import { StudyFilters, StudyType } from '@/api/types';

// Query keys
export const studyKeys = {
  all: ['studies'] as const,
  lists: () => [...studyKeys.all, 'list'] as const,
  list: (filters?: StudyFilters) => [...studyKeys.lists(), filters] as const,
  details: () => [...studyKeys.all, 'detail'] as const,
  detail: (id: StudyType) => [...studyKeys.details(), id] as const,
  stats: (id: StudyType) => [...studyKeys.all, 'stats', id] as const,
};

// Get all studies
export const useStudies = (filters?: StudyFilters) => {
  return useQuery({
    queryKey: studyKeys.list(filters),
    queryFn: () => studiesApi.getAll(filters),
    select: (response) => response.data,
  });
};

// Get single study
export const useStudy = (id: StudyType) => {
  return useQuery({
    queryKey: studyKeys.detail(id),
    queryFn: () => studiesApi.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

// Get study statistics
export const useStudyStats = (id: StudyType) => {
  return useQuery({
    queryKey: studyKeys.stats(id),
    queryFn: () => studiesApi.getStats(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

// Prefetch study data
export const usePrefetchStudy = () => {
  const queryClient = useQueryClient();

  return (id: StudyType) => {
    queryClient.prefetchQuery({
      queryKey: studyKeys.detail(id),
      queryFn: () => studiesApi.getById(id),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };
};

// Invalidate study data
export const useInvalidateStudies = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: studyKeys.all });
  };
};

// Get study options for Select components
export const useStudyOptions = () => {
  return useQuery({
    queryKey: [...studyKeys.all, 'options'],
    queryFn: () => studiesApi.getStudyOptions(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 10, // 10 minutes - options don't change often
  });
};