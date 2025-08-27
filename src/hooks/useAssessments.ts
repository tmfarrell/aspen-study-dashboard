import { useQuery } from '@tanstack/react-query';
import { assessmentsApi, qualityOfLifeApi } from '@/api/services';
import { StudyType } from '@/api/types';

// Query keys
export const assessmentKeys = {
  all: ['assessments'] as const,
  byStudy: (studyId: StudyType, region?: string) => [...assessmentKeys.all, studyId, region] as const,
  qol: ['qualityOfLife'] as const,
  qolByStudy: (studyId: StudyType) => [...assessmentKeys.qol, studyId] as const,
};

// Get assessments by study
export const useAssessments = (studyId: StudyType, region: string = 'global') => {
  return useQuery({
    queryKey: assessmentKeys.byStudy(studyId, region),
    queryFn: () => assessmentsApi.getByStudy(studyId, region),
    select: (response) => response.data,
    enabled: !!studyId,
  });
};

// Get quality of life data
export const useQualityOfLife = (studyId: StudyType) => {
  return useQuery({
    queryKey: assessmentKeys.qolByStudy(studyId),
    queryFn: () => qualityOfLifeApi.getByStudy(studyId),
    select: (response) => response.data,
    enabled: !!studyId,
  });
};

// Get assessment completion statistics
export const useAssessmentStats = (studyId: StudyType, region: string = 'global') => {
  return useQuery({
    queryKey: [...assessmentKeys.byStudy(studyId, region), 'stats'],
    queryFn: async () => {
      const response = await assessmentsApi.getByStudy(studyId, region);
      const assessments = response.data;
      
      const totalCompleted = assessments.reduce((sum, a) => sum + a.completed, 0);
      const totalAssessments = assessments.reduce((sum, a) => sum + a.total, 0);
      const completionRate = totalAssessments > 0 ? (totalCompleted / totalAssessments) * 100 : 0;
      
      return {
        assessments,
        totalCompleted,
        totalAssessments,
        completionRate: Math.round(completionRate * 10) / 10,
        byAssessment: assessments.map(a => ({
          name: a.name,
          completionRate: Math.round((a.completed / a.total) * 1000) / 10,
          completed: a.completed,
          total: a.total,
        })),
      };
    },
    enabled: !!studyId,
  });
};