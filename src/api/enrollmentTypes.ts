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

export interface EnrollmentTargetProgress {
  country: string;
  target: number;
  current: number;
  lastMonthProgress: number;
  progressPercentage: number;
}

export interface TargetCompletion {
  targetDate: string; // "YYYY-MM" format
  confidence: 'high' | 'medium' | 'low';
  estimatedCompletion: string;
}

export interface SiteEnrollment {
  siteId: string;
  siteName: string;
  state: string;
  city: string;
  lastMonthEnrollment: number;
  totalEnrollment: number;
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
  targetProgress?: EnrollmentTargetProgress[];
  targetCompletion?: TargetCompletion;
  recentSiteEnrollment: SiteEnrollment[];
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
  targetEnrollment?: {
    total: number;
    targetDate: string; // "YYYY-MM" format
    byCountry?: Array<{
      country: string;
      target: number;
    }>;
  };
}