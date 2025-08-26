// Quality of Life Assessment data for heart rhythm disorders
export interface QoLAssessment {
  condition: string;
  assessmentName: string;
  totalPatients: number;
  completedAssessments: number;
  averageScore?: number;
  scoreRange: string;
  description: string;
}

export const qualityOfLifeAssessments: QoLAssessment[] = [
  {
    condition: "Atrial Fibrillation",
    assessmentName: "AFEQT (Atrial Fibrillation Effect on Quality of Life)",
    totalPatients: 892,
    completedAssessments: 743,
    averageScore: 67.8,
    scoreRange: "0-100",
    description: "Disease-specific QoL measure for AF patients"
  },
  {
    condition: "Atrial Flutter",
    assessmentName: "SF-36 Physical Function",
    totalPatients: 234,
    completedAssessments: 198,
    averageScore: 72.4,
    scoreRange: "0-100",
    description: "General health and physical function assessment"
  },
  {
    condition: "Supraventricular Tachycardia",
    assessmentName: "SQLS (Supraventricular Tachycardia QoL Scale)",
    totalPatients: 567,
    completedAssessments: 489,
    averageScore: 58.3,
    scoreRange: "0-100",
    description: "SVT-specific quality of life measurement"
  },
  {
    condition: "Ventricular Tachycardia",
    assessmentName: "ICD Patient Acceptance Scale",
    totalPatients: 445,
    completedAssessments: 367,
    averageScore: 4.2,
    scoreRange: "1-7",
    description: "Assessment for patients with ICDs"
  },
  {
    condition: "Bradycardia",
    assessmentName: "Pacemaker Patient QoL Questionnaire",
    totalPatients: 1023,
    completedAssessments: 856,
    averageScore: 78.9,
    scoreRange: "0-100",
    description: "QoL assessment for pacemaker patients"
  },
  {
    condition: "Heart Block",
    assessmentName: "EQ-5D-5L Health Status",
    totalPatients: 334,
    completedAssessments: 289,
    averageScore: 0.76,
    scoreRange: "0-1",
    description: "Generic health-related quality of life measure"
  },
  {
    condition: "Premature Ventricular Contractions",
    assessmentName: "PVC Symptom Severity Scale",
    totalPatients: 1456,
    completedAssessments: 1234,
    averageScore: 3.4,
    scoreRange: "1-10",
    description: "Symptom severity and impact assessment"
  },
  {
    condition: "Wolff-Parkinson-White Syndrome",
    assessmentName: "Arrhythmia-Specific QoL Questionnaire",
    totalPatients: 296,
    completedAssessments: 241,
    averageScore: 65.7,
    scoreRange: "0-100",
    description: "WPW syndrome specific quality of life tool"
  }
];

// Registry growth data over 12 months with regional distribution
export const registryGrowthData = [
  { month: "Jan 2024", patients: 3547, newPatients: 234, region: "Northeast: 28%, South: 35%, Midwest: 22%, West: 15%" },
  { month: "Feb 2024", patients: 3698, newPatients: 151, region: "Northeast: 27%, South: 36%, Midwest: 22%, West: 15%" },
  { month: "Mar 2024", patients: 3892, newPatients: 194, region: "Northeast: 27%, South: 36%, Midwest: 21%, West: 16%" },
  { month: "Apr 2024", patients: 4067, newPatients: 175, region: "Northeast: 26%, South: 37%, Midwest: 21%, West: 16%" },
  { month: "May 2024", patients: 4289, newPatients: 222, region: "Northeast: 26%, South: 37%, Midwest: 20%, West: 17%" },
  { month: "Jun 2024", patients: 4456, newPatients: 167, region: "Northeast: 25%, South: 38%, Midwest: 20%, West: 17%" },
  { month: "Jul 2024", patients: 4634, newPatients: 178, region: "Northeast: 25%, South: 38%, Midwest: 19%, West: 18%" },
  { month: "Aug 2024", patients: 4823, newPatients: 189, region: "Northeast: 24%, South: 39%, Midwest: 19%, West: 18%" },
  { month: "Sep 2024", patients: 4987, newPatients: 164, region: "Northeast: 24%, South: 39%, Midwest: 18%, West: 19%" },
  { month: "Oct 2024", patients: 5134, newPatients: 147, region: "Northeast: 23%, South: 40%, Midwest: 18%, West: 19%" },
  { month: "Nov 2024", patients: 5289, newPatients: 155, region: "Northeast: 23%, South: 40%, Midwest: 17%, West: 20%" },
  { month: "Dec 2024", patients: 5447, newPatients: 158, region: "Northeast: 22%, South: 41%, Midwest: 17%, West: 20%" }
];