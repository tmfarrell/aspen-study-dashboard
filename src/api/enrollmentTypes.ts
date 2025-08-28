import { StudyType } from './types';

export interface EnrollmentBreakdown {
  key: string;
  label: string;
  total: number;
  lastMonth: number;
  last12Months: number;
  percentage?: number;
}

export interface EnrollmentTrend {
  month: string;
  enrolled: number;
  cumulative: number;
  breakdown: Record<string, number>;
}

export interface EnrollmentStats {
  totalPatients: number;
  newPatientsLastMonth: number;
  newPatientsLast12Months: number;
  averageMonthlyEnrollment: number;
  enrollmentVelocity: {
    thisWeek: number;
    thisMonth: number;
    dailyAverage: number;
  };
  breakdowns: EnrollmentBreakdown[];
  monthlyTrends: EnrollmentTrend[];
  topEnrollingCategories: EnrollmentBreakdown[];
}

export interface StudyEnrollmentConfig {
  studyId: StudyType;
  breakdownType: 'conditions' | 'bmi' | 'demographics' | 'procedures';
  breakdownLabel: string;
  categories: Array<{
    key: string;
    label: string;
    weight: number; // Used for realistic data distribution
  }>;
}