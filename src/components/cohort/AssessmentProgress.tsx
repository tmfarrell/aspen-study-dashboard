
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AssessmentProgress = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Assessment data by region
  const assessmentData = {
    global: [
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
        name: 'EQ-5D-5L',
        completed: 7890,
        total: 10000,
        description: 'European Quality of Life 5-Dimension 5-Level'
      }
    ],
    europe: [
      {
        name: 'IWQOL',
        completed: 4200,
        total: 5000,
        description: 'Impact of Weight on Quality of Life'
      },
      {
        name: 'IWQOL-lite',
        completed: 4600,
        total: 5000,
        description: 'Simplified Quality of Life Assessment'
      },
      {
        name: 'EQ-5D-5L',
        completed: 3900,
        total: 5000,
        description: 'European Quality of Life 5-Dimension 5-Level'
      }
    ],
    americas: [
      {
        name: 'IWQOL',
        completed: 4550,
        total: 5000,
        description: 'Impact of Weight on Quality of Life'
      },
      {
        name: 'IWQOL-lite',
        completed: 4600,
        total: 5000,
        description: 'Simplified Quality of Life Assessment'
      },
      {
        name: 'EQ-5D-5L',
        completed: 3990,
        total: 5000,
        description: 'European Quality of Life 5-Dimension 5-Level'
      }
    ]
  };

  const currentData = assessmentData[selectedRegion as keyof typeof assessmentData];
  const overallCompleted = currentData.reduce((sum, assessment) => sum + assessment.completed, 0);
  const overallTotal = currentData.reduce((sum, assessment) => sum + assessment.total, 0);
  const overallPercentage = (overallCompleted / overallTotal) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Assessment Completion Progress</CardTitle>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="americas">Americas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center border-b pb-4">
          <div className="text-2xl font-bold mb-1" style={{ color: '#003f7f' }}>
            {overallPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            Overall completion rate ({selectedRegion})
          </div>
          <Progress value={overallPercentage} className="mb-1" style={{ backgroundColor: '#e8f4ff' }} />
          <div className="text-xs text-muted-foreground">
            {overallCompleted.toLocaleString()} of {overallTotal.toLocaleString()} assessments completed
          </div>
        </div>

        <div className="space-y-3">
          {currentData.map((assessment, index) => {
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
                  <Progress 
                    value={percentage} 
                    className="flex-1" 
                    style={{ backgroundColor: '#e8f4ff' }}
                  />
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
