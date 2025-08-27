// Studies API functions
import { 
  StudyData, 
  ApiResponse, 
  StudyFilters,
  StudyType 
} from '@/api/types';
import { mockStudies } from '@/api/mockData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const studiesApi = {
  getAll: async (filters?: StudyFilters): Promise<ApiResponse<StudyData[]>> => {
    await delay();
    let studies = Object.values(mockStudies);
    
    if (filters?.status?.length) {
      studies = studies.filter(study => filters.status!.includes(study.status));
    }
    
    if (filters?.minPatients) {
      studies = studies.filter(study => study.totalPatients >= filters.minPatients!);
    }
    
    if (filters?.maxPatients) {
      studies = studies.filter(study => study.totalPatients <= filters.maxPatients!);
    }

    return {
      data: studies,
      success: true,
      message: 'Studies retrieved successfully'
    };
  },

  getById: async (id: StudyType): Promise<ApiResponse<StudyData>> => {
    await delay();
    const study = mockStudies[id];
    
    if (!study) {
      throw new Error(`Study with id ${id} not found`);
    }

    return {
      data: study,
      success: true,
      message: 'Study retrieved successfully'
    };
  },

  getStats: async (id: StudyType): Promise<ApiResponse<{
    totalPatients: number;
    completedPatients: number;
    activeSites: number;
    dataQuality: number;
  }>> => {
    await delay();
    const study = mockStudies[id];
    
    if (!study) {
      throw new Error(`Study with id ${id} not found`);
    }

    return {
      data: {
        totalPatients: study.totalPatients,
        completedPatients: Math.floor(study.totalPatients * 0.3),
        activeSites: study.enrolledSites,
        dataQuality: 96.2
      },
      success: true
    };
  }
};