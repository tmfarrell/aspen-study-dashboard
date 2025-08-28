import { EnrollmentStats, EnrollmentBreakdown, EnrollmentTrend } from '@/api/enrollmentTypes';
import { StudyType, ApiResponse } from '@/api/types';
import { calculateTotalPatients } from '@/data/studyHelpers';
import { enrollmentConfigs } from '@/data/enrollmentConfigs';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Generate realistic enrollment data based on study configuration
const generateEnrollmentData = (studyId: StudyType): EnrollmentStats => {
  const config = enrollmentConfigs[studyId];
  if (!config) {
    throw new Error(`No enrollment configuration found for study: ${studyId}`);
  }

  const totalPatients = calculateTotalPatients(studyId);
  
  // Generate realistic monthly distribution (higher enrollment in recent months)
  const monthlyBase = Math.floor(totalPatients / 24); // Spread over 24 months
  const recentMonthsMultiplier = 1.5; // Recent months have higher enrollment
  
  const newPatientsLast12Months = Math.floor(totalPatients * 0.6); // 60% enrolled in last 12 months
  const newPatientsLastMonth = Math.floor(newPatientsLast12Months / 12 * recentMonthsMultiplier);
  
  // Generate breakdown data
  const breakdowns: EnrollmentBreakdown[] = config.categories.map(category => {
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
    config.categories.forEach(category => {
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
    topEnrollingCategories
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