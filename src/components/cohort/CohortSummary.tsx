import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { EnrollmentProgressTile } from '@/components/common/EnrollmentProgressTile';
import { studyData, StudyType } from '@/data/studyData';
import { calculateTotalPatients, generateEnrollmentDescription } from '@/data/studyHelpers';
import { Users } from 'lucide-react';

interface CohortSummaryProps {
  selectedStudy: StudyType;
}

const CohortSummary = ({ selectedStudy }: CohortSummaryProps) => {
  const currentData = studyData[selectedStudy];
  const totalPatients = calculateTotalPatients(selectedStudy);
  
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
      title: `Total ${getUnitLabel()}`,
      value: totalPatients.toLocaleString(),
      description: getEnrollmentSubtitle()
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Standardized Total Patients/Cases MetricCard */}
        <MetricCard
          title={`Total ${getUnitLabel()}`}
          value={totalPatients.toLocaleString()}
          subtitle={getEnrollmentSubtitle()}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        
        {/* Other summary stats using existing Card style */}
        {summaryStats.slice(1).map((stat, index) => (
          <Card key={index + 1}>
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
      
      {/* Enrollment Progress Tile - only show if target enrollment exists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentProgressTile studyId={selectedStudy} />
      </div>
    </div>
  );
};

export default CohortSummary;
