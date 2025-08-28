import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { EnrollmentProgressTile } from '@/components/common/EnrollmentProgressTile';
import { TotalPatientsTile } from '@/components/common/TotalPatientsTile';
import AgeRangeTile from '@/components/common/AgeRangeTile';
import AssessmentProgress from '@/components/cohort/AssessmentProgress';
import { useStudy } from "@/state/studies";
import { StudyType } from "@/api/types";

interface CohortSummaryProps {
  selectedStudy: StudyType;
}

const CohortSummary = ({ selectedStudy }: CohortSummaryProps) => {
  const { data: currentData, isLoading } = useStudy(selectedStudy);
  
  if (isLoading) {
    return <div className="h-96 bg-muted animate-pulse rounded-lg" />;
  }
  
  if (!currentData) {
    return null;
  }
  
  // Generate target enrollment subtitle if target exists
  const getEnrollmentSubtitle = () => {
    if (currentData.targetEnrollment) {
      return `of ${currentData.targetEnrollment.total.toLocaleString()} target`;
    }
    return undefined;
  };

  // Get the correct unit label based on enrollmentUnits
  const getUnitLabel = () => {
    return currentData.enrollmentUnits === 'cases' ? 'Cases' : 'Patients';
  };

  const summaryStats = [
    {
      title: "Average BMI",
      value: currentData.averageBMI,
      description: "kg/m² across cohort"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standardized Total Patients/Cases Tile */}
        <TotalPatientsTile studyId={selectedStudy} />
        
        {/* Age Range using metrics system */}
        <AgeRangeTile studyId={selectedStudy} />
        
        {/* Other summary stats using existing Card style */}
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
      
      {/* Progress tracking tiles - side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentProgressTile studyId={selectedStudy} />
        <AssessmentProgress selectedStudy={selectedStudy} />
      </div>
    </div>
  );
};

export default CohortSummary;
