import { useQuery } from '@tanstack/react-query';
import { sitesApi } from '@/api/services';
import { SiteFilters } from '@/api/types';

// Query keys
export const siteKeys = {
  all: ['sites'] as const,
  lists: () => [...siteKeys.all, 'list'] as const,
  list: (filters?: SiteFilters) => [...siteKeys.lists(), filters] as const,
  details: () => [...siteKeys.all, 'detail'] as const,
  detail: (id: string) => [...siteKeys.details(), id] as const,
};

// Get all sites
export const useSites = (filters?: SiteFilters) => {
  return useQuery({
    queryKey: siteKeys.list(filters),
    queryFn: () => sitesApi.getAll(filters),
    select: (response) => response.data,
  });
};

// Get single site
export const useSite = (id: string) => {
  return useQuery({
    queryKey: siteKeys.detail(id),
    queryFn: () => sitesApi.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

// Get site statistics
export const useSiteStats = (filters?: SiteFilters) => {
  return useQuery({
    queryKey: [...siteKeys.all, 'stats', filters],
    queryFn: async () => {
      const response = await sitesApi.getAll(filters);
      const sites = response.data;
      
      return {
        total: sites.length,
        byStatus: {
          active: sites.filter(s => s.status === 'active').length,
          onboarding: sites.filter(s => s.status === 'onboarding').length,
          inactive: sites.filter(s => s.status === 'inactive').length,
        },
        byHealthStatus: {
          healthy: sites.filter(s => s.healthStatus === 'healthy').length,
          warning: sites.filter(s => s.healthStatus === 'warning').length,
          critical: sites.filter(s => s.healthStatus === 'critical').length,
        },
        totalPatients: sites.reduce((sum, s) => sum + s.enrolledPatients, 0),
        averageDataQuality: Math.round((sites.reduce((sum, s) => sum + s.dataQuality, 0) / sites.length) * 10) / 10,
      };
    },
    select: (data) => data,
  });
};