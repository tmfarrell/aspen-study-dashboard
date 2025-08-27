// Assessments API functions
import { 
  AssessmentData, 
  QualityOfLifeData,
  ApiResponse, 
  StudyType 
} from '@/api/types';
import { 
  mockAssessments, 
  generateMockPatients, 
  generateMockQoLData 
} from '@/api/mockData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const assessmentsApi = {
  getByStudy: async (studyId: StudyType, region: string = 'global'): Promise<ApiResponse<AssessmentData[]>> => {
    await delay();
    
    const assessments = mockAssessments.filter(a => 
      a.studyId === studyId && a.region === region
    );

    return {
      data: assessments,
      success: true,
      message: 'Assessments retrieved successfully'
    };
  }
};

export const qualityOfLifeApi = {
  getByStudy: async (studyId: StudyType): Promise<ApiResponse<QualityOfLifeData[]>> => {
    await delay();
    
    const patients = generateMockPatients(studyId, 100);
    const patientIds = patients.map(p => p.id);
    const qolData = generateMockQoLData(patientIds, studyId);

    return {
      data: qolData,
      success: true,
      message: 'Quality of life data retrieved successfully'
    };
  }
};