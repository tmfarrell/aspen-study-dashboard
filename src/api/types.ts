// Core data types for the application
export interface StudyData {
  id: string;
  name: string;
  enrollmentUnits: 'cases' | 'patients';
  overviewMetrics: Array<{
    metricId: string;
    displayType: 'average' | 'total' | 'range' | 'median';
    icon?: string;
    description?: string;
  }>;
  targetEnrollment?: {
    total: number;
    targetDate?: string; // "YYYY-MM" format
    byCountry?: {
      [countryCode: string]: number;
    };
  };
  enrollmentMetric: {
    metricId: string;
    displayType: 'distribution' | 'pie';
    orientation?: 'horizontal' | 'vertical';
  };
  description: string;
  status: 'active' | 'recruiting' | 'completed' | 'suspended';
  startDate: string;
  estimatedCompletionDate: string;
  regions: {
    us: boolean;
    eu: boolean;
  };
  patientConfig: {
    genderDistribution: { male: number; female: number; other: number };
    ageDistribution: { min: number; max: number; mode: number };
    bmiDistribution: { min: number; max: number; mode: number };
    raceDistribution: Record<string, number>;
    comorbidities: string[];
    medications: string[];
  };
}

export interface PatientData {
  id: string;
  studyId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bmi: number;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'withdrawn';
  siteId: string;
  race?: string;
  ethnicity?: string;
  comorbidities: string[];
  medications: string[];
  enrollmentCategory?: string; // New field for enrollment-specific categorization
}

export interface SiteData {
  id: string;
  name: string;
  city: string;
  subdivision: string; // state for US, region for EU countries
  country: string;
  region: 'us' | 'eu';
  status: 'active' | 'onboarding' | 'inactive';
  healthStatus: 'healthy' | 'warning' | 'critical';
  enrolledPatients: number;
  dataQuality: number;
  lastDataReceived: string | null;
  contactInfo: {
    email: string;
    phone: string;
    principalInvestigator: string;
  };
}

export interface AssessmentData {
  id: string;
  name: string;
  completed: number;
  total: number;
  description: string;
  studyId: string;
  region: string;
}

export interface QualityOfLifeData {
  id: string;
  patientId: string;
  studyId: string;
  assessmentDate: string;
  iwqolScore: number;
  eq5dScore: number;
  physicalWellbeing: number;
  emotionalWellbeing: number;
  socialFunctioning: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// Filter and query types
export interface StudyFilters {
  status?: StudyData['status'][];
  minPatients?: number;
  maxPatients?: number;
}

export interface PatientFilters {
  studyId?: string;
  ageRange?: { min: number; max: number };
  gender?: PatientData['gender'][];
  bmiRange?: { min: number; max: number };
  status?: PatientData['status'][];
}

export interface SiteFilters {
  status?: SiteData['status'][];
  healthStatus?: SiteData['healthStatus'][];
  country?: string[];
  minDataQuality?: number;
}

export type StudyType = 'obesity' | 'diabetes' | 'cardiology' | 'hypertension';