import React from 'react';
import { EnrollmentProgressTile } from '@/components/common/EnrollmentProgressTile';
import { GeographicTile } from '@/components/common/GeographicTile';
import MetricTile from '@/components/common/MetricTile';
import AssessmentProgressMetrics from '@/components/cohort/AssessmentProgressMetrics';
import { useStudy } from "@/state/studies";
import { StudyType } from "@/api/types";

interface StandardizedOverviewProps {
  studyId: StudyType;
}

const StandardizedOverview = ({ studyId }: StandardizedOverviewProps) => {
  const { data: study, isLoading } = useStudy(studyId);
  
  if (isLoading) {
    return <div className="h-96 bg-muted animate-pulse rounded-lg" />;
  }
  
  if (!study) {
    return null;
  }

  // Get additional components from study configuration
  const additionalComponents = study.overviewLayout?.additionalComponents || [];

  const renderComponent = (component: any, index: number) => {
    switch (component.type) {
      case 'assessment-progress':
        return (
          <AssessmentProgressMetrics 
            key={`assessment-${index}`}
            selectedStudy={studyId} 
          />
        );
      case 'metric':
        return (
          <MetricTile
            key={`metric-${index}`}
            studyId={studyId}
            metricId={component.metricId}
            displayType={component.displayType}
            orientation={component.orientation}
            icon={component.icon}
            description={component.description}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Standard first row: Enrollment Progress + Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentProgressTile studyId={studyId} />
        <GeographicTile studyId={studyId} />
      </div>
      
      {/* Dynamic additional components - all half width with consistent heights */}
      {additionalComponents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {additionalComponents.map((component, index) => 
            renderComponent(component, index)
          )}
        </div>
      )}
    </div>
  );
};

export default StandardizedOverview;