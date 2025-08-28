// Sites API functions
import { 
  SiteData, 
  ApiResponse, 
  SiteFilters,
  StudyType 
} from '@/api/types';
import { cardiologySites } from '@/data/study/cardiology';
import { diabetesSites } from '@/data/study/diabetes';
import { obesitySites } from '@/data/study/obesity';
import { hypertensionSites } from '@/data/study/hypertension';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get sites for a specific study
const getStudySites = (studyId: StudyType): SiteData[] => {
  switch (studyId) {
    case 'cardiology':
      return cardiologySites;
    case 'diabetes':
      return diabetesSites;
    case 'obesity':
      return obesitySites;
    case 'hypertension':
      return hypertensionSites;
    default:
      return [];
  }
};

export const sitesApi = {
  getAll: async (studyId: StudyType, filters?: SiteFilters): Promise<ApiResponse<SiteData[]>> => {
    await delay();
    let sites = [...getStudySites(studyId)];
    
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

  getById: async (studyId: StudyType, id: string): Promise<ApiResponse<SiteData>> => {
    await delay();
    const studySites = getStudySites(studyId);
    const site = studySites.find(s => s.id === id);
    
    if (!site) {
      throw new Error(`Site with id ${id} not found in study ${studyId}`);
    }

    return {
      data: site,
      success: true,
      message: 'Site retrieved successfully'
    };
  }
};