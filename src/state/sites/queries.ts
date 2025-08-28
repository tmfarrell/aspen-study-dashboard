import { useQuery } from '@tanstack/react-query';
import { sitesApi } from './api';
import { SiteFilters, StudyType } from '@/api/types';

export const useSites = (studyId: StudyType, filters?: SiteFilters) => {
  return useQuery({
    queryKey: ['sites', studyId, filters],
    queryFn: () => sitesApi.getAll(studyId, filters),
    select: (response) => response.data,
  });
};

export const useSite = (studyId: StudyType, id: string) => {
  return useQuery({
    queryKey: ['sites', studyId, id],
    queryFn: () => sitesApi.getById(studyId, id),
    select: (response) => response.data,
    enabled: !!id && !!studyId,
  });
};