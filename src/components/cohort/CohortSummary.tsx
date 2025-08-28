import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { EnrollmentProgressTile } from '@/components/common/EnrollmentProgressTile';
import { TotalPatientsTile } from '@/components/common/TotalPatientsTile';
import AgeRangeTile from '@/components/common/AgeRangeTile';
import MetricTile from '@/components/common/MetricTile';
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


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standardized Total Patients/Cases Tile */}
        <TotalPatientsTile studyId={selectedStudy} />
        
        {/* Age Range using metrics system */}
        <AgeRangeTile studyId={selectedStudy} />
        
        {/* Study-specific metric tiles */}
        {currentData.overviewMetrics.map((metricConfig, index) => (
          <MetricTile
            key={index}
            studyId={selectedStudy}
            metricId={metricConfig.metricId}
            displayType={metricConfig.displayType}
            orientation={metricConfig.orientation}
            icon={metricConfig.icon}
            description={metricConfig.description}
          />
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
