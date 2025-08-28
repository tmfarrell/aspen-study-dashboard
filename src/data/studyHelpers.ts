import { StudyType } from '@/api/types';
import { cardiologySites } from './study/cardiology/sites';
import { diabetesSites } from './study/diabetes/sites';
import { obesitySites } from './study/obesity/sites';
import { hypertensionSites } from './study/hypertension/sites';

// Get sites for a specific study
export const getStudySites = (studyId: StudyType) => {
  switch (studyId) {
    case 'cardiology':
      return cardiologySites;
    case 'diabetes':
      return diabetesSites;
    case 'obesity':
      return obesitySites;
    case 'hypertension':
      return hypertensionSites;
    default:
      return [];
  }
};

// Calculate total patients from site data
export const calculateTotalPatients = (studyId: StudyType): number => {
  const sites = getStudySites(studyId);
  return sites.reduce((total, site) => total + site.enrolledPatients, 0);
};

// Calculate number of enrolled (active) sites
export const calculateEnrolledSites = (studyId: StudyType): number => {
  const sites = getStudySites(studyId);
  return sites.filter(site => site.status === 'active').length;
};

// Generate enrollment description text for studies with target enrollment
export const generateEnrollmentDescription = (totalPatients: number, targetEnrollment?: { total: number }): string => {
  if (!targetEnrollment) {
    return 'registry enrollment ongoing';
  }
  return `of ${targetEnrollment.total.toLocaleString()} target patients enrolled`;
};