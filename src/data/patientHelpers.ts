import { PatientData, SiteData, StudyType } from '@/api/types';

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
  return new Date(randomTime).toISOString();
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
    
    patients.push({
      id: `${studyId}-${patientIndex.toString().padStart(4, '0')}`,
      studyId,
      age,
      gender,
      bmi,
      enrollmentDate: randomDate(
        config.enrollmentDateRange.startYear,
        config.enrollmentDateRange.startMonth,
        config.enrollmentDateRange.endYear,
        config.enrollmentDateRange.endMonth
      ),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      siteId: site.id,
      race,
      ethnicity: Math.random() > 0.80 ? 'Hispanic or Latino' : 'Not Hispanic or Latino',
      comorbidities: config.comorbidities.filter(() => Math.random() > 0.5),
      medications: config.medications.filter(() => Math.random() > 0.6)
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