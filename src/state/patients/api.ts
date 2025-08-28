// Patients API functions
import { 
  PatientData, 
  ApiResponse, 
  PaginatedResponse,
  PatientFilters,
  StudyType 
} from '@/api/types';
import { generateStudyPatients } from '@/data/patientHelpers';
import { getStudySites } from '@/data/studyHelpers';
import { cardiologyPatientConfig } from '@/data/study/cardiology/patients';
import { obesityPatientConfig } from '@/data/study/obesity/patients';
import { diabetesPatientConfig } from '@/data/study/diabetes/patients';
import { hypertensionPatientConfig } from '@/data/study/hypertension/patients';

// Cache for generated patients to avoid recalculation
const patientsCache = new Map<StudyType, PatientData[]>();

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get patient config for study
const getPatientConfig = (studyId: StudyType) => {
  switch (studyId) {
    case 'cardiology': return cardiologyPatientConfig;
    case 'obesity': return obesityPatientConfig;
    case 'diabetes': return diabetesPatientConfig;
    case 'hypertension': return hypertensionPatientConfig;
    default: return obesityPatientConfig;
  }
};

export const patientsApi = {
  getAll: async (
    filters?: PatientFilters, 
    page: number = 1, 
    limit: number = 50
  ): Promise<PaginatedResponse<PatientData>> => {
    await delay();
    
    const studyId = filters?.studyId as StudyType || 'obesity';
    
    // Check cache first
    let patients: PatientData[] = [];
    if (patientsCache.has(studyId)) {
      patients = patientsCache.get(studyId)!;
    } else {
      // Generate study-specific patients based on site enrollment
      const sites = getStudySites(studyId);
      const config = getPatientConfig(studyId);
      patients = generateStudyPatients(studyId, sites, config);
      patientsCache.set(studyId, patients);
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
    
    // Get all patients for the study and find the specific one
    const allPatients = await patientsApi.getAll({ studyId }, 1, 10000);
    const patient = allPatients.data.find(p => p.id === id);
    
    if (!patient) {
      // Fallback: generate a single patient with the requested ID
      const sites = getStudySites(studyId);
      const config = getPatientConfig(studyId);
      const fallbackPatients = generateStudyPatients(studyId, sites.slice(0, 1), config);
      const fallbackPatient = { ...fallbackPatients[0], id };
      
      return {
        data: fallbackPatient,
        success: true,
        message: 'Patient retrieved successfully'
      };
    }

    return {
      data: patient,
      success: true,
      message: 'Patient retrieved successfully'
    };
  },

  // Clear cache (useful for testing or forced refresh)
  clearCache: () => {
    patientsCache.clear();
  }
};