// Assessments API functions
import { 
  AssessmentData, 
  QualityOfLifeData,
  ApiResponse, 
  StudyType 
} from '@/api/types';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const assessmentsApi = {
  getByStudy: async (studyId: StudyType, region: string = 'global'): Promise<ApiResponse<AssessmentData[]>> => {
    await delay();
    
    // Return empty array since assessments are now handled through the metrics system
    return {
      data: [],
      success: true,
      message: 'Assessment data is now available through the metrics system'
    };
  }
};

export const qualityOfLifeApi = {
  getByStudy: async (studyId: StudyType): Promise<ApiResponse<QualityOfLifeData[]>> => {
    await delay();
    
    // Quality of life data is now embedded in patient records as assessments
    // This API is deprecated - use the metrics system instead
    return {
      data: [],
      success: true,
      message: 'Quality of life data is now available through patient assessments and metrics'
    };
  }
};