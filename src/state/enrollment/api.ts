import { EnrollmentStats, EnrollmentBreakdown, EnrollmentTrend, SiteEnrollment, EnrollmentTargetProgress, TargetCompletion } from '@/api/enrollmentTypes';
import { StudyType, ApiResponse } from '@/api/types';
import { calculateTotalPatients } from '@/data/studyHelpers';
import { studyData } from '@/data/studyData';
import { sites } from '@/data/siteData';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Country code to full name mapping
const countryNames: Record<string, string> = {
  'US': 'United States',
  'CA': 'Canada', 
  'MX': 'Mexico',
  'DE': 'Germany',
  'FR': 'France',
  'UK': 'United Kingdom',
  'IT': 'Italy',
  'ES': 'Spain',
  'CH': 'Switzerland'
};

// Generate realistic enrollment data based on study configuration
const generateEnrollmentData = (studyId: StudyType): EnrollmentStats => {
  const study = studyData[studyId];
  if (!study) {
    throw new Error(`No study data found for study: ${studyId}`);
  }

  const totalPatients = calculateTotalPatients(studyId);
  
  // Generate realistic monthly distribution (higher enrollment in recent months)
  const monthlyBase = Math.floor(totalPatients / 24); // Spread over 24 months
  const recentMonthsMultiplier = 1.5; // Recent months have higher enrollment
  
  const newPatientsLast12Months = Math.floor(totalPatients * 0.6); // 60% enrolled in last 12 months
  const newPatientsLastMonth = Math.floor(newPatientsLast12Months / 12 * recentMonthsMultiplier);
  
  // Generate breakdown data
  const breakdowns: EnrollmentBreakdown[] = study.enrollmentConfig.categories.map(category => {
    const total = Math.floor(totalPatients * category.weight);
    const last12Months = Math.floor(total * 0.6);
    const lastMonth = Math.floor(last12Months / 12 * recentMonthsMultiplier);
    
    return {
      key: category.key,
      label: category.label,
      total,
      lastMonth,
      last12Months,
      percentage: Math.round((total / totalPatients) * 100)
    };
  });

  // Generate monthly trends
  const monthlyTrends: EnrollmentTrend[] = [];
  let cumulativeTotal = totalPatients - newPatientsLast12Months;
  
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - i);
    const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
    
    // Vary enrollment by month with some randomness
    const baseEnrollment = Math.floor(newPatientsLast12Months / 12);
    const variance = Math.random() * 0.4 - 0.2; // ±20% variance
    const monthlyEnrollment = Math.max(1, Math.floor(baseEnrollment * (1 + variance)));
    
    cumulativeTotal += monthlyEnrollment;
    
    // Generate breakdown for this month
    const monthlyBreakdown: Record<string, number> = {};
    study.enrollmentConfig.categories.forEach(category => {
      monthlyBreakdown[category.key] = Math.floor(monthlyEnrollment * category.weight);
    });

    monthlyTrends.push({
      month: monthName,
      enrolled: monthlyEnrollment,
      cumulative: cumulativeTotal,
      breakdown: monthlyBreakdown
    });
  }

  const topEnrollingCategories = [...breakdowns]
    .sort((a, b) => b.last12Months - a.last12Months)
    .slice(0, 3);

  // Generate site enrollment data
  const recentSiteEnrollment: SiteEnrollment[] = sites
    .filter(site => site.status === 'active')
    .map(site => ({
      siteId: site.id,
      siteName: site.name,
      state: site.state,
      city: site.city,
      lastMonthEnrollment: Math.floor(site.patientsEnrolled * 0.05 + Math.random() * 10), // 5% base + variance
      totalEnrollment: site.patientsEnrolled
    }))
    .sort((a, b) => b.lastMonthEnrollment - a.lastMonthEnrollment)
    .slice(0, 10);

  // Generate target progress if targets are defined
  let targetProgress: EnrollmentTargetProgress[] | undefined;
  let targetCompletion: TargetCompletion | undefined;
  
  if (study.targetEnrollment?.byCountry) {
    const countryEntries = Object.entries(study.targetEnrollment.byCountry);
    targetProgress = countryEntries.map(([countryCode, target]) => {
      const current = Math.floor(totalPatients * (target / study.targetEnrollment!.total));
      const lastMonthProgress = Math.floor(newPatientsLastMonth * (target / study.targetEnrollment!.total));
      return {
        country: countryNames[countryCode] || countryCode,
        target,
        current,
        lastMonthProgress,
        progressPercentage: Math.round((current / target) * 100)
      };
    });
  }

  if (study.targetEnrollment) {
    const currentProgress = totalPatients / study.targetEnrollment.total;
    const monthsRemaining = Math.ceil((study.targetEnrollment.total - totalPatients) / (newPatientsLast12Months / 12));
    
    let confidence: 'high' | 'medium' | 'low' = 'medium';
    if (currentProgress > 0.8 && monthsRemaining <= 6) confidence = 'high';
    else if (currentProgress < 0.3 || monthsRemaining > 24) confidence = 'low';
    
    const estimatedDate = new Date();
    estimatedDate.setMonth(estimatedDate.getMonth() + monthsRemaining);
    
    targetCompletion = {
      targetDate: study.targetEnrollment.targetDate || estimatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      confidence,
      estimatedCompletion: estimatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    };
  }

  return {
    totalPatients,
    newPatientsLastMonth,
    newPatientsLast12Months,
    averageMonthlyEnrollment: Math.floor(newPatientsLast12Months / 12),
    enrollmentVelocity: {
      thisWeek: Math.floor(newPatientsLastMonth / 4),
      thisMonth: newPatientsLastMonth,
      dailyAverage: Math.floor(newPatientsLastMonth / 30)
    },
    breakdowns,
    monthlyTrends,
    topEnrollingCategories,
    targetProgress,
    targetCompletion,
    recentSiteEnrollment
  };
};

export const enrollmentApi = {
  getEnrollmentStats: async (studyId: StudyType): Promise<ApiResponse<EnrollmentStats>> => {
    await delay();
    
    try {
      const data = generateEnrollmentData(studyId);
      
      return {
        data,
        success: true,
        message: 'Enrollment statistics retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get enrollment stats for study ${studyId}: ${error}`);
    }
  }
};