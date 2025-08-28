// Studies API functions
import { 
  StudyData, 
  ApiResponse, 
  StudyFilters,
  StudyType 
} from '@/api/types';
import { studyData } from '@/data/studyData';
import { calculateTotalPatients, calculateEnrolledSites } from '@/data/studyHelpers';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const studiesApi = {
  getAll: async (filters?: StudyFilters): Promise<ApiResponse<StudyData[]>> => {
    await delay();
    let studies = Object.values(studyData);
    
    if (filters?.status?.length) {
      studies = studies.filter(study => filters.status!.includes(study.status));
    }
    
    if (filters?.minPatients) {
      studies = studies.filter(study => calculateTotalPatients(study.id as StudyType) >= filters.minPatients!);
    }
    
    if (filters?.maxPatients) {
      studies = studies.filter(study => calculateTotalPatients(study.id as StudyType) <= filters.maxPatients!);
    }

    return {
      data: studies,
      success: true,
      message: 'Studies retrieved successfully'
    };
  },

  getById: async (id: StudyType): Promise<ApiResponse<StudyData>> => {
    await delay();
    const study = studyData[id];
    
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
    const study = studyData[id];
    
    if (!study) {
      throw new Error(`Study with id ${id} not found`);
    }

    const totalPatients = calculateTotalPatients(id);
    
    return {
      data: {
        totalPatients,
        completedPatients: Math.floor(totalPatients * 0.3),
        activeSites: calculateEnrolledSites(id),
        dataQuality: 96.2
      },
      success: true
    };
  }
};