// Core data types for the application
export interface StudyData {
  id: string;
  name: string;
  enrollmentUnits: 'cases' | 'patients';
  overviewMetrics: Array<{
    metricId: string;
    displayType: 'average' | 'total' | 'range' | 'median' | 'distribution';
    orientation?: 'horizontal' | 'vertical';
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

export interface QoLAssessment {
  type: string;
  date: string;
  score: number;
  maxScore: number;
  timepoint: 'baseline' | '6months' | '1year' | '2years';
}

export interface VisitData {
  id: string;
  date: string;
  type: string;
}

export interface PatientData {
  id: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bmi: number;
  race: string;
  medicalHistory: string[];
  medications: string[];
  enrollmentDate: string;
  enrollmentCategory: string;
  status: 'active' | 'withdrawn' | 'completed';
  visitHistory: VisitData[];
  labResults: Record<string, any>;
  studyId: StudyType;
  siteId?: string;
  ethnicity?: string;
  qualityOfLifeAssessments?: QoLAssessment[];
}

export interface PatientConfig {
  genderDistribution: { male: number; female: number; other: number };
  ageDistribution: { min: number; max: number; mode: number };
  bmiDistribution: { min: number; max: number; mode: number };
  raceDistribution: Record<string, number>;
  comorbidities: string[];
  medications: string[];
  enrollmentDateRange: { startYear: number; startMonth: number; endYear: number; endMonth: number };
  enrollmentCategories: Array<{ key: string; label: string; weight: number }>;
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