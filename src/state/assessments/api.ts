// Assessments API functions
import { 
  AssessmentData, 
  QualityOfLifeData,
  ApiResponse, 
  StudyType 
} from '@/api/types';
import { 
  mockAssessments, 
  generateMockQoLData 
} from '@/api/mockData';
import { generateCardiologyPatients } from '@/data/study/cardiology/patients';
import { generateObesityPatients } from '@/data/study/obesity/patients';
import { generateDiabetesPatients } from '@/data/study/diabetes/patients';
import { generateHypertensionPatients } from '@/data/study/hypertension/patients';

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
    
    let patients: any[] = [];
    switch (studyId) {
      case 'cardiology':
        patients = generateCardiologyPatients(100);
        break;
      case 'obesity':
        patients = generateObesityPatients(100);
        break;
      case 'diabetes':
        patients = generateDiabetesPatients(100);
        break;
      case 'hypertension':
        patients = generateHypertensionPatients(100);
        break;
      default:
        patients = generateObesityPatients(100);
    }
    const patientIds = patients.map(p => p.id);
    const qolData = generateMockQoLData(patientIds, studyId);

    return {
      data: qolData,
      success: true,
      message: 'Quality of life data retrieved successfully'
    };
  }
};