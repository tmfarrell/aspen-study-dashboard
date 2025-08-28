import { PatientData, SiteData, AssessmentData, QualityOfLifeData, StudyType } from './types';

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

// Patient data generation is now handled in study-specific data files

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

// Study options for dropdowns are now handled via React Query APIs