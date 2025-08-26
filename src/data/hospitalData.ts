export interface Hospital {
  id: string;
  name: string;
  state: string;
  caseCount: number;
  city: string;
}

export const hospitals: Hospital[] = [
  // California
  { id: "1", name: "UCLA Medical Center", state: "California", city: "Los Angeles", caseCount: 1247 },
  { id: "2", name: "UCSF Medical Center", state: "California", city: "San Francisco", caseCount: 1156 },
  { id: "3", name: "Cedars-Sinai Medical Center", state: "California", city: "Los Angeles", caseCount: 987 },
  { id: "4", name: "Stanford Health Care", state: "California", city: "Stanford", caseCount: 834 },
  
  // New York
  { id: "5", name: "NewYork-Presbyterian Hospital", state: "New York", city: "New York", caseCount: 1423 },
  { id: "6", name: "Mount Sinai Hospital", state: "New York", city: "New York", caseCount: 1198 },
  { id: "7", name: "NYU Langone Health", state: "New York", city: "New York", caseCount: 1067 },
  { id: "8", name: "Memorial Sloan Kettering", state: "New York", city: "New York", caseCount: 756 },
  
  // Texas
  { id: "9", name: "Houston Methodist Hospital", state: "Texas", city: "Houston", caseCount: 1334 },
  { id: "10", name: "MD Anderson Cancer Center", state: "Texas", city: "Houston", caseCount: 1089 },
  { id: "11", name: "Baylor Scott & White Health", state: "Texas", city: "Dallas", caseCount: 923 },
  { id: "12", name: "UT Southwestern Medical Center", state: "Texas", city: "Dallas", caseCount: 878 },
  
  // Florida
  { id: "13", name: "Miami-Dade Jackson Health", state: "Florida", city: "Miami", caseCount: 1156 },
  { id: "14", name: "Tampa General Hospital", state: "Florida", city: "Tampa", caseCount: 987 },
  { id: "15", name: "Orlando Health", state: "Florida", city: "Orlando", caseCount: 834 },
  { id: "16", name: "Baptist Health South Florida", state: "Florida", city: "Miami", caseCount: 789 },
  
  // Illinois
  { id: "17", name: "Northwestern Memorial Hospital", state: "Illinois", city: "Chicago", caseCount: 1267 },
  { id: "18", name: "University of Chicago Medical", state: "Illinois", city: "Chicago", caseCount: 1034 },
  { id: "19", name: "Rush University Medical Center", state: "Illinois", city: "Chicago", caseCount: 876 },
  
  // Massachusetts
  { id: "20", name: "Massachusetts General Hospital", state: "Massachusetts", city: "Boston", caseCount: 1389 },
  { id: "21", name: "Brigham and Women's Hospital", state: "Massachusetts", city: "Boston", caseCount: 1178 },
  { id: "22", name: "Boston Medical Center", state: "Massachusetts", city: "Boston", caseCount: 945 },
  
  // Pennsylvania
  { id: "23", name: "Hospital of Univ of Pennsylvania", state: "Pennsylvania", city: "Philadelphia", caseCount: 1234 },
  { id: "24", name: "UPMC Presbyterian", state: "Pennsylvania", city: "Pittsburgh", caseCount: 1098 },
  { id: "25", name: "Jefferson Health", state: "Pennsylvania", city: "Philadelphia", caseCount: 876 },
  
  // Ohio
  { id: "26", name: "Cleveland Clinic", state: "Ohio", city: "Cleveland", caseCount: 1456 },
  { id: "27", name: "Ohio State University Wexner", state: "Ohio", city: "Columbus", caseCount: 1123 },
  { id: "28", name: "Cincinnati Children's Hospital", state: "Ohio", city: "Cincinnati", caseCount: 789 },
  
  // Michigan
  { id: "29", name: "University of Michigan Hospital", state: "Michigan", city: "Ann Arbor", caseCount: 1189 },
  { id: "30", name: "Henry Ford Hospital", state: "Michigan", city: "Detroit", caseCount: 967 },
  
  // Georgia
  { id: "31", name: "Emory University Hospital", state: "Georgia", city: "Atlanta", caseCount: 1145 },
  { id: "32", name: "Grady Memorial Hospital", state: "Georgia", city: "Atlanta", caseCount: 834 },
  
  // North Carolina
  { id: "33", name: "Duke University Hospital", state: "North Carolina", city: "Durham", caseCount: 1089 },
  { id: "34", name: "UNC Medical Center", state: "North Carolina", city: "Chapel Hill", caseCount: 923 },
  
  // Washington
  { id: "35", name: "University of Washington Medical", state: "Washington", city: "Seattle", caseCount: 1067 },
  { id: "36", name: "Seattle Children's Hospital", state: "Washington", city: "Seattle", caseCount: 756 },
  
  // Virginia
  { id: "37", name: "VCU Medical Center", state: "Virginia", city: "Richmond", caseCount: 987 },
  { id: "38", name: "University of Virginia Medical", state: "Virginia", city: "Charlottesville", caseCount: 723 },
  
  // Maryland
  { id: "39", name: "Johns Hopkins Hospital", state: "Maryland", city: "Baltimore", caseCount: 1389 },
  { id: "40", name: "University of Maryland Medical", state: "Maryland", city: "Baltimore", caseCount: 1034 },
  
  // Arizona
  { id: "41", name: "Mayo Clinic Arizona", state: "Arizona", city: "Phoenix", caseCount: 1156 },
  { id: "42", name: "Banner University Medical Center", state: "Arizona", city: "Phoenix", caseCount: 834 },
  
  // Colorado
  { id: "43", name: "University of Colorado Hospital", state: "Colorado", city: "Aurora", caseCount: 923 },
  { id: "44", name: "National Jewish Health", state: "Colorado", city: "Denver", caseCount: 678 },
  
  // Tennessee
  { id: "45", name: "Vanderbilt University Medical", state: "Tennessee", city: "Nashville", caseCount: 1067 },
  { id: "46", name: "St. Jude Children's Research", state: "Tennessee", city: "Memphis", caseCount: 789 },
  
  // Minnesota
  { id: "47", name: "Mayo Clinic Rochester", state: "Minnesota", city: "Rochester", caseCount: 1345 },
  { id: "48", name: "University of Minnesota Medical", state: "Minnesota", city: "Minneapolis", caseCount: 876 },
  
  // Wisconsin
  { id: "49", name: "University of Wisconsin Hospital", state: "Wisconsin", city: "Madison", caseCount: 734 },
  { id: "50", name: "Froedtert Hospital", state: "Wisconsin", city: "Milwaukee", caseCount: 623 }
];

export const getHospitalsByState = (state: string | null): Hospital[] => {
  if (!state || state === "Total") {
    return hospitals.sort((a, b) => b.caseCount - a.caseCount);
  }
  return hospitals
    .filter(hospital => hospital.state === state)
    .sort((a, b) => b.caseCount - a.caseCount);
};

export const getTotalCasesByState = (state: string | null): number => {
  if (!state || state === "Total") {
    return hospitals.reduce((sum, hospital) => sum + hospital.caseCount, 0);
  }
  return hospitals
    .filter(hospital => hospital.state === state)
    .reduce((sum, hospital) => sum + hospital.caseCount, 0);
};

export const getStateList = (): string[] => {
  const states = Array.from(new Set(hospitals.map(h => h.state))).sort();
  return states;
};