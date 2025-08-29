import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StudyType } from '@/api/types';
import { useStudyMetrics } from '@/state/metrics/queries';
import { useStudy } from '@/state/studies/queries';
import { Skeleton } from '@/components/ui/skeleton';

interface AssessmentProgressMetricsProps {
  selectedStudy: StudyType;
}

const AssessmentProgressMetrics = ({ selectedStudy }: AssessmentProgressMetricsProps) => {
  const { data: metrics, isLoading: metricsLoading } = useStudyMetrics(selectedStudy);
  const { data: study, isLoading: studyLoading } = useStudy(selectedStudy);

  if (metricsLoading || studyLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Completion Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!study?.assessmentTargets || !metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Completion Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Assessment tracking not available for this study
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate overall completion metrics
  const completionRateMetric = metrics.metrics.find(m => m.id === 'assessment_completion_rate');
  const totalPatients = metrics.totalPatients;
  
  // Calculate totals based on assessment targets and patient data
  const assessmentTypes = study.assessmentTargets.assessmentTypes;
  const now = new Date();
  
  // Calculate expected and completed assessments
  let totalExpected = 0;
  let totalCompleted = 0;
  
  // For simplification, we'll use the completion rate metric to estimate totals
  if (completionRateMetric && completionRateMetric.type === 'numerical') {
    const avgCompletionRate = completionRateMetric.average / 100;
    
    // Estimate based on average targets per patient
    const avgTargetsPerPatient = (
      study.assessmentTargets.perPatient.baseline +
      study.assessmentTargets.perPatient.sixMonths +
      study.assessmentTargets.perPatient.oneYear +
      study.assessmentTargets.perPatient.twoYears
    ) / 4; // Average across timepoints
    
    totalExpected = Math.round(totalPatients * avgTargetsPerPatient * assessmentTypes.length);
    totalCompleted = Math.round(totalExpected * avgCompletionRate);
  }

  const overallPercentage = totalExpected > 0 ? (totalCompleted / totalExpected) * 100 : 0;

  // Create individual assessment data
  const assessmentData = assessmentTypes.map((type, index) => {
    const expectedPerType = Math.round(totalExpected / assessmentTypes.length);
    const completedPerType = Math.round(totalCompleted / assessmentTypes.length);
    const percentage = expectedPerType > 0 ? (completedPerType / expectedPerType) * 100 : 0;
    
    return {
      name: type,
      completed: completedPerType,
      total: expectedPerType,
      description: getAssessmentDescription(type),
      percentage
    };
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Assessment Completion Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center border-b pb-4">
          <div className="text-2xl font-bold mb-1 text-primary">
            {overallPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Overall completion rate
          </div>
          <Progress value={overallPercentage} className="mb-1" />
          <div className="text-xs text-muted-foreground">
            {totalCompleted.toLocaleString()} of {totalExpected.toLocaleString()} assessments completed
          </div>
        </div>

        <div className="space-y-3">
          {assessmentData.map((assessment, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-sm">{assessment.name}</span>
                  <p className="text-xs text-muted-foreground">{assessment.description}</p>
                </div>
                <span className="text-sm font-semibold">
                  {assessment.completed.toLocaleString()}/{assessment.total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={assessment.percentage} 
                  className="flex-1" 
                />
                <span className="text-xs text-muted-foreground w-12">
                  {assessment.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get assessment descriptions
const getAssessmentDescription = (type: string): string => {
  const descriptions: Record<string, string> = {
    'IWQOL': 'Impact of Weight on Quality of Life',
    'IWQOL-lite': 'Simplified Quality of Life Assessment',
    'EQ-5D': 'European Quality of Life 5-Dimension',
    'AFEQT': 'Atrial Fibrillation Effect on Quality of Life',
    'SF-36': 'Short Form 36 Health Survey'
  };
  return descriptions[type] || 'Quality of Life Assessment';
};

export default AssessmentProgressMetrics;