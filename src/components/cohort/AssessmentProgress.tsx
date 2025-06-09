
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AssessmentProgress = () => {
  // Mock data for assessment completion
  const assessmentData = [
    {
      name: 'IWQOL',
      completed: 8750,
      total: 10000,
      description: 'Impact of Weight on Quality of Life'
    },
    {
      name: 'IWQOL-lite',
      completed: 9200,
      total: 10000,
      description: 'Simplified Quality of Life Assessment'
    },
    {
      name: 'SF-36',
      completed: 7890,
      total: 10000,
      description: 'Short Form Health Survey'
    }
  ];

  const overallCompleted = assessmentData.reduce((sum, assessment) => sum + assessment.completed, 0);
  const overallTotal = assessmentData.reduce((sum, assessment) => sum + assessment.total, 0);
  const overallPercentage = (overallCompleted / overallTotal) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Assessment Completion Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center border-b pb-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {overallPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Overall completion rate
          </div>
          <Progress value={overallPercentage} className="mb-1" />
          <div className="text-xs text-muted-foreground">
            {overallCompleted.toLocaleString()} of {overallTotal.toLocaleString()} assessments completed
          </div>
        </div>

        <div className="space-y-3">
          {assessmentData.map((assessment, index) => {
            const percentage = (assessment.completed / assessment.total) * 100;
            return (
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
                  <Progress value={percentage} className="flex-1" />
                  <span className="text-xs text-muted-foreground w-12">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentProgress;
