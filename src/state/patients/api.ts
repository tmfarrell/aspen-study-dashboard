// Patients API functions
import { 
  PatientData, 
  ApiResponse, 
  PaginatedResponse,
  PatientFilters,
  StudyType 
} from '@/api/types';
import { generateCardiologyPatients } from '@/data/study/cardiology/patients';
import { generateObesityPatients } from '@/data/study/obesity/patients';
import { generateDiabetesPatients } from '@/data/study/diabetes/patients';
import { generateHypertensionPatients } from '@/data/study/hypertension/patients';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const patientsApi = {
  getAll: async (
    filters?: PatientFilters, 
    page: number = 1, 
    limit: number = 50
  ): Promise<PaginatedResponse<PatientData>> => {
    await delay();
    
    const studyId = filters?.studyId as StudyType || 'obesity';
    let patients: PatientData[] = [];
    
    // Generate study-specific patients
    switch (studyId) {
      case 'cardiology':
        patients = generateCardiologyPatients(500);
        break;
      case 'obesity':
        patients = generateObesityPatients(500);
        break;
      case 'diabetes':
        patients = generateDiabetesPatients(500);
        break;
      case 'hypertension':
        patients = generateHypertensionPatients(500);
        break;
      default:
        patients = generateObesityPatients(500);
    }
    
    // Apply filters
    if (filters?.ageRange) {
      patients = patients.filter(p => 
        p.age >= filters.ageRange!.min && p.age <= filters.ageRange!.max
      );
    }
    
    if (filters?.gender?.length) {
      patients = patients.filter(p => filters.gender!.includes(p.gender));
    }
    
    if (filters?.bmiRange) {
      patients = patients.filter(p => 
        p.bmi >= filters.bmiRange!.min && p.bmi <= filters.bmiRange!.max
      );
    }
    
    if (filters?.status?.length) {
      patients = patients.filter(p => filters.status!.includes(p.status));
    }

    // Pagination
    const total = patients.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPatients = patients.slice(startIndex, endIndex);

    return {
      data: paginatedPatients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      success: true
    };
  },

  getById: async (id: string): Promise<ApiResponse<PatientData>> => {
    await delay();
    
    // Extract study from patient ID prefix
    const studyId = id.split('-')[0] as StudyType || 'obesity';
    let patients: PatientData[] = [];
    
    switch (studyId) {
      case 'cardiology':
        patients = generateCardiologyPatients(1);
        break;
      case 'obesity':
        patients = generateObesityPatients(1);
        break;
      case 'diabetes':
        patients = generateDiabetesPatients(1);
        break;
      case 'hypertension':
        patients = generateHypertensionPatients(1);
        break;
      default:
        patients = generateObesityPatients(1);
    }
    
    const patient = { ...patients[0], id };

    return {
      data: patient,
      success: true,
      message: 'Patient retrieved successfully'
    };
  }
};