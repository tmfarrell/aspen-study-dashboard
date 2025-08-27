// Sites API functions
import { 
  SiteData, 
  ApiResponse, 
  SiteFilters 
} from '@/api/types';
import { mockSites } from '@/api/mockData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const sitesApi = {
  getAll: async (filters?: SiteFilters): Promise<ApiResponse<SiteData[]>> => {
    await delay();
    let sites = [...mockSites];
    
    if (filters?.status?.length) {
      sites = sites.filter(site => filters.status!.includes(site.status));
    }
    
    if (filters?.healthStatus?.length) {
      sites = sites.filter(site => filters.healthStatus!.includes(site.healthStatus));
    }
    
    if (filters?.country?.length) {
      sites = sites.filter(site => filters.country!.includes(site.country));
    }
    
    if (filters?.minDataQuality) {
      sites = sites.filter(site => site.dataQuality >= filters.minDataQuality!);
    }

    return {
      data: sites,
      success: true,
      message: 'Sites retrieved successfully'
    };
  },

  getById: async (id: string): Promise<ApiResponse<SiteData>> => {
    await delay();
    const site = mockSites.find(s => s.id === id);
    
    if (!site) {
      throw new Error(`Site with id ${id} not found`);
    }

    return {
      data: site,
      success: true,
      message: 'Site retrieved successfully'
    };
  }
};