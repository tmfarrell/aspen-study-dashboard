import { PatientData, SiteData, AssessmentData, QualityOfLifeData, StudyType } from './types';

// Mock Sites Data
export const mockSites: SiteData[] = [
  {
    id: 'site-001',
    name: 'Johns Hopkins Medical Center',
    city: 'Baltimore',
    subdivision: 'Maryland',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 247,
    targetEnrollment: 300,
    dataQuality: 98.5,
    lastDataReceived: '2024-01-20T14:30:00Z',
    contactInfo: {
      email: 'research@jhmi.edu',
      phone: '+1-410-555-0123',
      principalInvestigator: 'Dr. Sarah Johnson'
    }
  },
  {
    id: 'site-002',
    name: 'Mayo Clinic Rochester',
    city: 'Rochester',
    subdivision: 'Minnesota',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 189,
    targetEnrollment: 250,
    dataQuality: 97.2,
    lastDataReceived: '2024-01-20T12:15:00Z',
    contactInfo: {
      email: 'clinicalresearch@mayo.edu',
      phone: '+1-507-555-0456',
      principalInvestigator: 'Dr. Michael Chen'
    }
  },
  {
    id: 'site-003',
    name: 'Cleveland Clinic',
    city: 'Cleveland',
    subdivision: 'Ohio',
    country: 'United States',
    region: 'us',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 45,
    targetEnrollment: 200,
    dataQuality: 85.3,
    lastDataReceived: '2024-01-18T09:45:00Z',
    contactInfo: {
      email: 'research@ccf.org',
      phone: '+1-216-555-0789',
      principalInvestigator: 'Dr. Lisa Rodriguez'
    }
  }
];

// Mock Assessment Data
export const mockAssessments: AssessmentData[] = [
  {
    id: 'assessment-001',
    name: 'IWQOL',
    completed: 8750,
    total: 10000,
    description: 'Impact of Weight on Quality of Life',
    studyId: 'obesity',
    region: 'global'
  },
  {
    id: 'assessment-002',
    name: 'IWQOL-lite',
    completed: 9200,
    total: 10000,
    description: 'Simplified Quality of Life Assessment',
    studyId: 'obesity',
    region: 'global'
  },
  {
    id: 'assessment-003',
    name: 'EQ-5D-5L',
    completed: 7890,
    total: 10000,
    description: 'European Quality of Life 5-Dimension 5-Level',
    studyId: 'obesity',
    region: 'global'
  }
];

// Generate mock patient data
export const generateMockPatients = (studyId: StudyType, count: number = 100): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];
  const races = ['White', 'Black', 'Asian', 'Hispanic', 'Other'];
  const comorbidities = ['Hypertension', 'Type 2 Diabetes', 'Sleep Apnea', 'Depression', 'Arthritis'];
  const medications = ['Metformin', 'Lisinopril', 'Atorvastatin', 'Omeprazole', 'Levothyroxine'];

  for (let i = 0; i < count; i++) {
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const age = Math.floor(Math.random() * 50) + 25; // 25-75 years
    const bmi = Math.floor(Math.random() * 20) + 25; // 25-45 BMI
    
    patients.push({
      id: `patient-${studyId}-${i.toString().padStart(3, '0')}`,
      studyId,
      age,
      gender,
      bmi,
      enrollmentDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: mockSites[Math.floor(Math.random() * mockSites.length)].id,
      race: races[Math.floor(Math.random() * races.length)],
      ethnicity: Math.random() > 0.8 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      comorbidities: comorbidities.filter(() => Math.random() > 0.7),
      medications: medications.filter(() => Math.random() > 0.6)
    });
  }

  return patients;
};

// Mock Quality of Life Data
export const generateMockQoLData = (patientIds: string[], studyId: StudyType): QualityOfLifeData[] => {
  return patientIds.map(patientId => ({
    id: `qol-${patientId}`,
    patientId,
    studyId,
    assessmentDate: new Date(2024, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toISOString(),
    iwqolScore: Math.floor(Math.random() * 50) + 50, // 50-100
    eq5dScore: Math.floor(Math.random() * 30) + 70, // 70-100
    physicalWellbeing: Math.floor(Math.random() * 40) + 60, // 60-100
    emotionalWellbeing: Math.floor(Math.random() * 40) + 60, // 60-100
    socialFunctioning: Math.floor(Math.random() * 40) + 60 // 60-100
  }));
};

// Study options for dropdowns (now using src/data as source of truth)
// This function is deprecated - use getStudyOptions from src/data/studyData.ts instead