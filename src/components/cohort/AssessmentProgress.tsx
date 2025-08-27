import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StudyType } from '@/data/studyData';

interface AssessmentProgressProps {
  selectedStudy?: StudyType;
}

interface AssessmentItem {
  name: string;
  completed: number;
  total: number;
  description: string;
}

const AssessmentProgress = ({ selectedStudy = 'obesity' }: AssessmentProgressProps) => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Study-specific assessment data
  const getAssessmentDataByStudy = (study: StudyType) => {
    const baseMultipliers = {
      obesity: { target: 10000, multiplier: 1 },
      diabetes: { target: 15000, multiplier: 1.5 },
      hypertension: { target: 8500, multiplier: 0.85 }
    };

    const studyConfig = baseMultipliers[study];

    return {
      global: [
        {
          name: 'IWQOL',
          completed: Math.round(8750 * studyConfig.multiplier),
          total: studyConfig.target,
          description: 'Impact of Weight on Quality of Life'
        },
        {
          name: 'IWQOL-lite',
          completed: Math.round(9200 * studyConfig.multiplier),
          total: studyConfig.target,
          description: 'Simplified Quality of Life Assessment'
        },
        {
          name: 'EQ-5D-5L',
          completed: Math.round(7890 * studyConfig.multiplier),
          total: studyConfig.target,
          description: 'European Quality of Life 5-Dimension 5-Level'
        }
      ],
      europe: [
        {
          name: 'IWQOL',
          completed: Math.round(4200 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'Impact of Weight on Quality of Life'
        },
        {
          name: 'IWQOL-lite',
          completed: Math.round(4600 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'Simplified Quality of Life Assessment'
        },
        {
          name: 'EQ-5D-5L',
          completed: Math.round(3900 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'European Quality of Life 5-Dimension 5-Level'
        }
      ],
      americas: [
        {
          name: 'IWQOL',
          completed: Math.round(4550 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'Impact of Weight on Quality of Life'
        },
        {
          name: 'IWQOL-lite',
          completed: Math.round(4600 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'Simplified Quality of Life Assessment'
        },
        {
          name: 'EQ-5D-5L',
          completed: Math.round(3990 * studyConfig.multiplier),
          total: Math.round(5000 * studyConfig.multiplier),
          description: 'European Quality of Life 5-Dimension 5-Level'
        }
      ]
    };
  };

  const assessmentData = getAssessmentDataByStudy(selectedStudy);
  const currentData: AssessmentItem[] = assessmentData[selectedRegion as keyof typeof assessmentData] || [];
  const overallCompleted = currentData.reduce((sum: number, assessment: AssessmentItem) => sum + assessment.completed, 0);
  const overallTotal = currentData.reduce((sum: number, assessment: AssessmentItem) => sum + assessment.total, 0);
  const overallPercentage = overallTotal > 0 ? (overallCompleted / overallTotal) * 100 : 0;

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
