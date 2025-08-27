// Mock API services that simulate real backend calls
import { 
  StudyData, 
  PatientData, 
  SiteData, 
  AssessmentData, 
  QualityOfLifeData,
  ApiResponse, 
  PaginatedResponse,
  StudyFilters,
  PatientFilters,
  SiteFilters,
  StudyType 
} from './types';
import { 
  mockStudies, 
  mockSites, 
  mockAssessments, 
  generateMockPatients, 
  generateMockQoLData 
} from './mockData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Studies API
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

// Patients API
export const patientsApi = {
  getAll: async (
    filters?: PatientFilters, 
    page: number = 1, 
    limit: number = 50
  ): Promise<PaginatedResponse<PatientData>> => {
    await delay();
    
    const studyId = filters?.studyId as StudyType || 'obesity';
    let patients = generateMockPatients(studyId, 500);
    
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
    
    // Generate a single patient based on ID
    const patients = generateMockPatients('obesity', 1);
    const patient = { ...patients[0], id };

    return {
      data: patient,
      success: true,
      message: 'Patient retrieved successfully'
    };
  }
};

// Sites API
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

// Assessments API
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

// Quality of Life API
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