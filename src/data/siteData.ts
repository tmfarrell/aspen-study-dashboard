export type SiteStatus = 'active' | 'onboarding' | 'inactive';
export type ConnectionMethod = 'FHIR' | 'SFTP' | 'API' | 'Manual';
export type HealthStatus = 'green' | 'yellow' | 'red' | 'n/a';

export interface Site {
  id: string;
  name: string;
  state: string;
  city: string;
  caseCount: number;
  status: SiteStatus;
  lastDataReceived: Date | null; // null means no data received yet
  connectionMethod: ConnectionMethod;
  healthStatus: HealthStatus;
  patientsEnrolled: number;
  dataQualityScore: number; // 0-100
  errorCount: number;
  warningCount: number;
}

// Helper function to determine health status based on data quality and issues
const getHealthStatus = (site: Omit<Site, 'healthStatus'>): HealthStatus => {
  // No health status for sites with no data or inactive sites
  if (site.lastDataReceived === null || site.status === 'inactive') {
    return 'n/a';
  }
  
  // Red if data quality is poor (< 75) or there are errors
  if (site.dataQualityScore < 75 || site.errorCount > 0) {
    return 'red';
  }
  
  // Yellow if data quality is moderate (75-89) or there are warnings
  if (site.dataQualityScore < 90 || site.warningCount > 0) {
    return 'yellow';
  }
  
  // Green for good data quality (90+) with no issues
  return 'green';
};

// Site participation years and events per year mapping
const siteEventData: { [key: string]: { eventsPerYear: number; yearsParticipating: number } } = {
  "UCLA Medical Center": { eventsPerYear: 120, yearsParticipating: 3 },
  "UCSF Medical Center": { eventsPerYear: 120, yearsParticipating: 4 },
  "Cedars-Sinai Medical Center": { eventsPerYear: 120, yearsParticipating: 2 },
  "Stanford Health Care": { eventsPerYear: 120, yearsParticipating: 4 },
  "NewYork-Presbyterian Hospital": { eventsPerYear: 120, yearsParticipating: 3 },
  "Mount Sinai Hospital": { eventsPerYear: 60, yearsParticipating: 4 },
  "NYU Langone Health": { eventsPerYear: 30, yearsParticipating: 2 },
  "Memorial Sloan Kettering": { eventsPerYear: 120, yearsParticipating: 3 },
  "Houston Methodist Hospital": { eventsPerYear: 60, yearsParticipating: 4 },
  "MD Anderson Cancer Center": { eventsPerYear: 120, yearsParticipating: 2 }
};

// Enhanced site data based on realistic cardiovascular events
export const sites: Site[] = [
  // California
  { 
    id: "1", 
    name: "UCLA Medical Center", 
    state: "California", 
    city: "Los Angeles", 
    caseCount: 347, // ~120 events/year × 3 years
    status: 'active',
    lastDataReceived: new Date('2025-07-15T14:30:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 347,
    dataQualityScore: 94,
    errorCount: 0,
    warningCount: 0
  },
  { 
    id: "2", 
    name: "UCSF Medical Center", 
    state: "California", 
    city: "San Francisco", 
    caseCount: 463, // ~120 events/year × 4 years
    status: 'active',
    lastDataReceived: new Date('2025-07-20T13:15:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 463,
    dataQualityScore: 92,
    errorCount: 0,
    warningCount: 0
  },
  { 
    id: "3", 
    name: "Cedars-Sinai Medical Center", 
    state: "California", 
    city: "Los Angeles", 
    caseCount: 227, // ~120 events/year × 2 years
    status: 'active',
    lastDataReceived: new Date('2025-08-10T09:45:00'), // Within last 60 days
    connectionMethod: 'SFTP',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 227,
    dataQualityScore: 91,
    errorCount: 0,
    warningCount: 0
  },
  { 
    id: "4", 
    name: "Stanford Health Care", 
    state: "California", 
    city: "Stanford", 
    caseCount: 498, // ~120 events/year × 4 years
    status: 'active',
    lastDataReceived: new Date('2025-08-25T16:22:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 498,
    dataQualityScore: 96,
    errorCount: 0,
    warningCount: 0
  },
  
  // New York
  { 
    id: "5", 
    name: "NewYork-Presbyterian Hospital", 
    state: "New York", 
    city: "New York", 
    caseCount: 378, // ~120 events/year × 3 years
    status: 'active',
    lastDataReceived: new Date('2025-08-20T15:18:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'yellow', // Will be recalculated
    patientsEnrolled: 378,
    dataQualityScore: 84,
    errorCount: 0,
    warningCount: 3
  },
  { 
    id: "6", 
    name: "Mount Sinai Hospital", 
    state: "New York", 
    city: "New York", 
    caseCount: 253, // ~60 events/year × 4 years
    status: 'active',
    lastDataReceived: new Date('2025-08-18T22:30:00'), // Within last 60 days
    connectionMethod: 'SFTP',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 253,
    dataQualityScore: 93,
    errorCount: 0,
    warningCount: 0
  },
  { 
    id: "7", 
    name: "NYU Langone Health", 
    state: "New York", 
    city: "New York", 
    caseCount: 67, // ~30 events/year × 2 years (onboarding)
    status: 'onboarding',
    lastDataReceived: new Date('2025-08-15T11:45:00'), // Recent for onboarding
    connectionMethod: 'API',
    healthStatus: 'yellow', // Will be recalculated
    patientsEnrolled: 67,
    dataQualityScore: 82,
    errorCount: 0,
    warningCount: 2
  },
  { 
    id: "8", 
    name: "Memorial Sloan Kettering", 
    state: "New York", 
    city: "New York", 
    caseCount: 341, // ~120 events/year × 3 years (but inactive now)
    status: 'inactive',
    lastDataReceived: new Date('2024-06-15T08:30:00'), // 2024 date for inactive site
    connectionMethod: 'SFTP',
    healthStatus: 'red', // Will be recalculated
    patientsEnrolled: 341,
    dataQualityScore: 45,
    errorCount: 12,
    warningCount: 25
  },
  
  // Texas
  { 
    id: "9", 
    name: "Houston Methodist Hospital", 
    state: "Texas", 
    city: "Houston", 
    caseCount: 231, // ~60 events/year × 4 years
    status: 'active',
    lastDataReceived: new Date('2025-08-26T14:55:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 231,
    dataQualityScore: 89,
    errorCount: 0,
    warningCount: 0
  },
  { 
    id: "10", 
    name: "MD Anderson Cancer Center", 
    state: "Texas", 
    city: "Houston", 
    caseCount: 219, // ~120 events/year × 2 years
    status: 'active',
    lastDataReceived: new Date('2025-08-22T12:20:00'), // Within last 60 days
    connectionMethod: 'FHIR',
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: 219,
    dataQualityScore: 93,
    errorCount: 0,
    warningCount: 0
  }
];

// Recalculate health status for all hardcoded sites
sites.forEach(site => {
  site.healthStatus = getHealthStatus(site);
});

// Add more sites based on remaining hospital data with realistic event counts
const remainingHospitalData = [
  { id: "11", name: "Baylor Scott & White Health", state: "Texas", city: "Dallas", caseCount: 173 }, // ~60 events/year × 3 years
  { id: "12", name: "UT Southwestern Medical Center", state: "Texas", city: "Dallas", caseCount: 107 }, // ~60 events/year × 2 years
  { id: "13", name: "Miami-Dade Jackson Health", state: "Florida", city: "Miami", caseCount: 0 }, // Inactive, 0 events/year
  { id: "14", name: "Tampa General Hospital", state: "Florida", city: "Tampa", caseCount: 234 }, // ~60 events/year × 4 years
  { id: "15", name: "Orlando Health", state: "Florida", city: "Orlando", caseCount: 55 }, // ~30 events/year × 2 years (onboarding)
  { id: "16", name: "Baptist Health South Florida", state: "Florida", city: "Miami", caseCount: 187 }, // ~60 events/year × 3 years
  { id: "17", name: "Northwestern Memorial Hospital", state: "Illinois", city: "Chicago", caseCount: 251 }, // ~60 events/year × 4 years
  { id: "18", name: "University of Chicago Medical", state: "Illinois", city: "Chicago", caseCount: 83 }, // ~30 events/year × 3 years (onboarding)
  { id: "19", name: "Rush University Medical Center", state: "Illinois", city: "Chicago", caseCount: 27 }, // ~30 events/year × 1 year (onboarding)
  { id: "20", name: "Massachusetts General Hospital", state: "Massachusetts", city: "Boston", caseCount: 374 } // ~120 events/year × 3 years
];

// Generate additional sites with varied statuses
remainingHospitalData.forEach((hospital, index) => {
  const connections: ConnectionMethod[] = ['FHIR', 'SFTP', 'API', 'Manual'];
  
  // Create realistic patterns - most sites should be healthy
  const isProblematic = index === 2; // Miami-Dade Jackson Health (inactive)
  const isOnboarding = index === 4 || index === 7 || index === 8; // Orlando Health, University of Chicago Medical, Rush University Medical Center
  const hasMinorIssues = index === 1; // Only 1 site with minor warnings
  
  // Determine status first to ensure consistency
  let status: SiteStatus;
  if (isProblematic) {
    status = 'inactive'; // Miami-Dade Jackson Health
  } else if (isOnboarding) {
    status = 'onboarding';
  } else {
    status = 'active';
  }
  
  // Generate realistic last data received dates based on status
  let lastDataReceived: Date | null;
  if (status === 'inactive') {
    // Inactive sites get old 2024 dates
    lastDataReceived = new Date('2024-09-15T08:30:00');
  } else if (status === 'onboarding') {
    if (index === 8) { // Rush University Medical Center with only 30 cases - might not have data yet
      lastDataReceived = null; // No data received yet
    } else {
      // Recent 2025 data (within last 2 weeks)
      const daysAgo = 5 + (index % 10); // Deterministic: 5-14 days ago
      lastDataReceived = new Date();
      lastDataReceived.setDate(lastDataReceived.getDate() - daysAgo);
    }
  } else {
    // Active sites: MUST have data within last 60 days
    const daysAgo = 1 + (index % 60); // Deterministic: 1-60 days ago
    lastDataReceived = new Date();
    lastDataReceived.setDate(lastDataReceived.getDate() - daysAgo);
  }
  
  sites.push({
    ...hospital,
    status,
    lastDataReceived,
    connectionMethod: connections[index % connections.length],
    healthStatus: 'green', // Will be recalculated
    patientsEnrolled: hospital.caseCount,
    dataQualityScore: isProblematic ? 50 + (index % 20) : (hasMinorIssues ? 80 + (index % 10) : 90 + (index % 8)),
    errorCount: isProblematic ? 3 + (index % 8) : 0,
    warningCount: isProblematic ? 8 + (index % 15) : (hasMinorIssues ? 2 + (index % 3) : 0)
  });
});

// Recalculate health status for all sites based on deterministic rules
sites.forEach(site => {
  site.healthStatus = getHealthStatus(site);
});

export const getSitesByStatus = (status?: SiteStatus): Site[] => {
  if (!status) return sites;
  return sites.filter(site => site.status === status);
};

export const getSitesByHealthStatus = (health?: HealthStatus): Site[] => {
  if (!health) return sites;
  return sites.filter(site => site.healthStatus === health);
};

export const getSitesNeedingAttention = (): Site[] => {
  return sites.filter(site => 
    site.healthStatus === 'red' || 
    site.healthStatus === 'yellow' ||
    (site.status === 'onboarding' && site.caseCount > 0) ||
    site.errorCount > 3
  );
};

export const getTotalPatients = (): number => {
  return sites.reduce((sum, site) => sum + site.patientsEnrolled, 0);
};

export const getAverageDataQuality = (): number => {
  const total = sites.reduce((sum, site) => sum + site.dataQualityScore, 0);
  return Math.round(total / sites.length);
};