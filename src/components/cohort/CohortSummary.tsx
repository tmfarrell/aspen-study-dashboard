import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { studyData, StudyType } from '@/data/studyData';
import { calculateTotalPatients, generateEnrollmentDescription } from '@/data/studyHelpers';

interface CohortSummaryProps {
  selectedStudy: StudyType;
}

const CohortSummary = ({ selectedStudy }: CohortSummaryProps) => {
  const currentData = studyData[selectedStudy];
  const totalPatients = calculateTotalPatients(selectedStudy);

  const summaryStats = [
    {
      title: "Total Patients",
      value: totalPatients,
      description: generateEnrollmentDescription(totalPatients, currentData.targetEnrollment)
    },
    {
      title: "Average BMI",
      value: currentData.averageBMI,
      description: "kg/m² across cohort"
    },
    {
      title: "Age Range",
      value: currentData.ageRange,
      description: "Years (median: 52)"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#0066CC]">{stat.value}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CohortSummary;
