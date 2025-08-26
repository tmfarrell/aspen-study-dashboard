// Mock healthcare data for heart rhythm disorders demo
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  ethnicity: string;
  state: string;
  city: string;
  diagnosis: string;
  severity: "Low" | "Moderate" | "High" | "Critical";
  lastVisit: string;
  riskScore: number;
  outcome: "Improved" | "Stable" | "Declined" | "Unknown";
}

export interface StateStats {
  state: string;
  patientCount: number;
  avgAge: number;
  criticalCases: number;
}

export const heartRhythmDisorders = [
  "Atrial Fibrillation",
  "Atrial Flutter", 
  "Supraventricular Tachycardia",
  "Ventricular Tachycardia",
  "Bradycardia",
  "Heart Block",
  "Premature Ventricular Contractions",
  "Wolff-Parkinson-White Syndrome"
];

export const ethnicities = [
  "White/Caucasian",
  "Black/African American", 
  "Hispanic/Latino",
  "Asian",
  "Native American",
  "Pacific Islander",
  "Mixed/Other"
];

export const usStates = [
  "California", "Texas", "Florida", "New York", "Pennsylvania", "Illinois", "Ohio", 
  "Georgia", "North Carolina", "Michigan", "New Jersey", "Virginia", "Washington", 
  "Arizona", "Massachusetts", "Tennessee", "Indiana", "Maryland", "Missouri", 
  "Wisconsin", "Colorado", "Minnesota", "South Carolina", "Alabama", "Louisiana",
  "Kentucky", "Oregon", "Oklahoma", "Connecticut", "Utah", "Iowa", "Nevada",
  "Arkansas", "Mississippi", "Kansas", "New Mexico", "Nebraska", "West Virginia",
  "Idaho", "Hawaii", "New Hampshire", "Maine", "Montana", "Rhode Island",
  "Delaware", "South Dakota", "North Dakota", "Alaska", "Vermont", "Wyoming"
];

// Generate mock patient data
function generatePatients(count: number): Patient[] {
  const patients: Patient[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = ["John", "Jane", "Michael", "Sarah", "David", "Lisa", "Robert", "Mary", "James", "Patricia"][Math.floor(Math.random() * 10)];
    const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"][Math.floor(Math.random() * 10)];
    
    // Uneven age distribution - more patients in older age groups
    let age: number;
    const ageGroup = Math.random();
    if (ageGroup < 0.1) age = Math.floor(Math.random() * 30) + 18; // 18-47: 10%
    else if (ageGroup < 0.3) age = Math.floor(Math.random() * 20) + 48; // 48-67: 20%
    else age = Math.floor(Math.random() * 25) + 68; // 68-92: 70%
    
    const state = usStates[Math.floor(Math.random() * usStates.length)];
    const diagnosis = heartRhythmDisorders[Math.floor(Math.random() * heartRhythmDisorders.length)];
    
    // Weighted ethnicity distribution based on US demographics
    let ethnicity: string;
    const ethnicityRand = Math.random();
    if (ethnicityRand < 0.60) ethnicity = "White/Caucasian";
    else if (ethnicityRand < 0.73) ethnicity = "Black/African American";
    else if (ethnicityRand < 0.91) ethnicity = "Hispanic/Latino";
    else if (ethnicityRand < 0.96) ethnicity = "Asian";
    else if (ethnicityRand < 0.98) ethnicity = "Native American";
    else if (ethnicityRand < 0.99) ethnicity = "Pacific Islander";
    else ethnicity = "Mixed/Other";
    
    // Risk score correlates with age and certain conditions
    let baseRisk = Math.random() * 100;
    if (age > 75) baseRisk += 20;
    if (["Ventricular Tachycardia", "Heart Block"].includes(diagnosis)) baseRisk += 15;
    
    const riskScore = Math.min(100, Math.max(0, baseRisk));
    
    let severity: Patient["severity"];
    if (riskScore > 80) severity = "Critical";
    else if (riskScore > 60) severity = "High";
    else if (riskScore > 35) severity = "Moderate";
    else severity = "Low";
    
    patients.push({
      id: `PT-${(i + 1).toString().padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      age,
      gender: Math.random() > 0.52 ? "Female" : "Male", // Slight female majority in healthcare data
      ethnicity,
      state,
      city: `${["Metro", "Central", "North", "South", "East", "West"][Math.floor(Math.random() * 6)]} ${state.split(' ')[0]}`,
      diagnosis,
      severity,
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riskScore: Math.round(riskScore),
      outcome: ["Improved", "Stable", "Declined", "Unknown"][Math.floor(Math.random() * 4)] as Patient["outcome"]
    });
  }
  
  return patients;
}

export const mockPatients = generatePatients(5000);

// Calculate state statistics
export const stateStatistics: StateStats[] = usStates.map(state => {
  const statePatients = mockPatients.filter(p => p.state === state);
  return {
    state,
    patientCount: statePatients.length,
    avgAge: statePatients.length > 0 ? Math.round(statePatients.reduce((sum, p) => sum + p.age, 0) / statePatients.length) : 0,
    criticalCases: statePatients.filter(p => p.severity === "Critical").length
  };
}).filter(stat => stat.patientCount > 0).sort((a, b) => b.patientCount - a.patientCount);

// Analytics insights
export const analyticsInsights = {
  totalPatients: mockPatients.length,
  averageAge: Math.round(mockPatients.reduce((sum, p) => sum + p.age, 0) / mockPatients.length),
  criticalCases: mockPatients.filter(p => p.severity === "Critical").length,
  improvedOutcomes: mockPatients.filter(p => p.outcome === "Improved").length,
  highRiskPatients: mockPatients.filter(p => p.riskScore > 70).length,
  recentVisits: mockPatients.filter(p => {
    const visitDate = new Date(p.lastVisit);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return visitDate > thirtyDaysAgo;
  }).length
};