import { PatientData, SiteData, StudyType, QoLAssessment } from '@/api/types';
import { studyData } from '@/data/studyData';

// Common helper functions for patient generation
export const weightedRandom = (weights: Record<string, number>): string => {
  const random = Math.random();
  let sum = 0;
  for (const [key, weight] of Object.entries(weights)) {
    sum += weight;
    if (random <= sum) return key;
  }
  return Object.keys(weights)[0];
};

// Normal distribution around mode using Box-Muller transform
export const normalRandom = (min: number, max: number, mode: number): number => {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  const scaled = mode + z0 * ((max - min) / 6);
  return Math.max(min, Math.min(max, Math.round(scaled)));
};

// Generate random date within a range
export const randomDate = (startYear: number, startMonth: number, endYear: number, endMonth: number): string => {
  const start = new Date(startYear, startMonth, 1);
  const end = new Date(endYear, endMonth, 28);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

// Helper function to generate assessments for a patient based on study schedule
const generateAssessmentsForPatient = (
  patientId: string,
  studyId: StudyType,
  enrollmentDate: string
): QoLAssessment[] => {
  const currentStudyData = studyData[studyId];
  if (!currentStudyData?.assessmentTargets) return [];

  const assessments: QoLAssessment[] = [];
  const baselineDate = new Date(enrollmentDate);
  const assessmentTypes = currentStudyData.assessmentTargets.assessmentTypes;
  
  // Generate timepoints
  const timepoints: Array<{ timepoint: QoLAssessment['timepoint'], date: Date, targetCount: number }> = [
    { timepoint: 'baseline', date: baselineDate, targetCount: currentStudyData.assessmentTargets.perPatient.baseline },
    { timepoint: '6months', date: new Date(baselineDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000), targetCount: currentStudyData.assessmentTargets.perPatient.sixMonths },
    { timepoint: '1year', date: new Date(baselineDate.getTime() + 365 * 24 * 60 * 60 * 1000), targetCount: currentStudyData.assessmentTargets.perPatient.oneYear },
    { timepoint: '2years', date: new Date(baselineDate.getTime() + 2 * 365 * 24 * 60 * 60 * 1000), targetCount: currentStudyData.assessmentTargets.perPatient.twoYears }
  ];

  timepoints.forEach(({ timepoint, date, targetCount }) => {
    // Only include assessments that should have occurred by now (or baseline)
    const now = new Date();
    if (timepoint === 'baseline' || date <= now) {
      // Study-specific completion rates for realism
      let baseCompletionRate = 0.85; // Default 85%
      
      if (studyId === 'obesity') {
        // Obesity studies typically have good compliance for QoL assessments
        baseCompletionRate = 0.88;
      } else if (studyId === 'diabetes') {
        // Diabetes studies often have high engagement
        baseCompletionRate = 0.92;
      } else if (studyId === 'cardiology') {
        // Cardiology patients often very compliant
        baseCompletionRate = 0.90;
      }
      
      // Add some variation (+/- 15%)
      const variation = (Math.random() - 0.5) * 0.3;
      const finalCompletionRate = Math.max(0.4, Math.min(0.98, baseCompletionRate + variation));
      
      // Generate assessments for each type with realistic scores
      assessmentTypes.forEach((assessmentType, typeIndex) => {
        if (Math.random() < finalCompletionRate) {
          // Generate realistic scores based on assessment type
          let score = 50;
          let maxScore = 100;
          
          switch (assessmentType) {
            case 'IWQOL-Lite':
              score = 60 + Math.random() * 35; // 60-95 range
              maxScore = 100;
              break;
            case 'EQ-5D-5L':
              score = 0.6 + Math.random() * 0.35; // 0.6-0.95 utility score
              maxScore = 1.0;
              break;
            case 'SF-36':
              score = 45 + Math.random() * 40; // 45-85 range
              maxScore = 100;
              break;
            case 'PHQ-9':
              score = Math.random() * 15; // 0-15 depression scale
              maxScore = 27;
              break;
            case 'DTSQ':
              score = 20 + Math.random() * 16; // 20-36 satisfaction score
              maxScore = 36;
              break;
            case 'AFEQT':
              score = 60 + Math.random() * 30; // 60-90 range
              maxScore = 100;
              break;
            default:
              score = Math.random() * 100;
              maxScore = 100;
          }
          
          assessments.push({
            type: assessmentType,
            date: date.toISOString().split('T')[0],
            score: Math.round(score * 100) / 100, // Round to 2 decimal places
            maxScore,
            timepoint
          });
        }
      });
    }
  });

  return assessments;
};

// Patient configuration interface
export interface PatientConfig {
  genderDistribution: { male: number; female: number; other: number };
  ageDistribution: { min: number; max: number; mode: number };
  bmiDistribution: { min: number; max: number; mode: number };
  raceDistribution: Record<string, number>;
  comorbidities: string[];
  medications: string[];
  enrollmentDateRange: {
    startYear: number;
    startMonth: number;
    endYear: number;
    endMonth: number;
  };
  enrollmentCategories?: Array<{
    key: string;
    label: string;
    weight: number;
  }>;
}

// Generate patients for a specific site using patient configuration
export const generatePatientsForSite = (
  site: SiteData,
  studyId: StudyType,
  config: PatientConfig,
  startIndex: number = 0
): PatientData[] => {
  const patients: PatientData[] = [];
  const genders: PatientData['gender'][] = ['male', 'female', 'other'];
  const statuses: PatientData['status'][] = ['active', 'completed', 'withdrawn'];

  for (let i = 0; i < site.enrolledPatients; i++) {
    const patientIndex = startIndex + i;
    const gender = weightedRandom(config.genderDistribution) as PatientData['gender'];
    const age = normalRandom(
      config.ageDistribution.min,
      config.ageDistribution.max,
      config.ageDistribution.mode
    );
    const bmi = normalRandom(
      config.bmiDistribution.min,
      config.bmiDistribution.max,
      config.bmiDistribution.mode
    );
    const race = weightedRandom(config.raceDistribution);
    
    // Generate enrollment category if configured
    const enrollmentCategory = config.enrollmentCategories 
      ? weightedRandom(
          config.enrollmentCategories.reduce((acc, cat) => ({ ...acc, [cat.label]: cat.weight }), {})
        )
      : undefined;
    
    const patientId = `${studyId}-${patientIndex.toString().padStart(4, '0')}`;
    const enrollmentDate = randomDate(
      config.enrollmentDateRange.startYear,
      config.enrollmentDateRange.startMonth,
      config.enrollmentDateRange.endYear,
      config.enrollmentDateRange.endMonth
    );
    
    patients.push({
      id: patientId,
      studyId,
      age,
      gender,
      bmi,
      enrollmentDate,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: site.id,
      race,
      ethnicity: Math.random() > 0.80 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      medicalHistory: config.comorbidities.filter(() => Math.random() > 0.5),
      medications: config.medications.filter(() => Math.random() > 0.6),
      enrollmentCategory,
      visitHistory: [],
      labResults: {},
      qualityOfLifeAssessments: generateAssessmentsForPatient(patientId, studyId, enrollmentDate)
    });
  }

  return patients;
};

// Generate all patients for a study based on site enrollment data
export const generateStudyPatients = (
  studyId: StudyType,
  sites: SiteData[],
  config: PatientConfig
): PatientData[] => {
  let allPatients: PatientData[] = [];
  let currentIndex = 0;

  for (const site of sites) {
    const sitePatients = generatePatientsForSite(site, studyId, config, currentIndex);
    allPatients = allPatients.concat(sitePatients);
    currentIndex += site.enrolledPatients;
  }

  return allPatients;
};