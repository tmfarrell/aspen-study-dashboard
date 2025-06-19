
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CohortSummaryProps {
  selectedStudy: string;
}

const CohortSummary = ({ selectedStudy }: CohortSummaryProps) => {
  // Study-specific data
  const studyData = {
    obesity: {
      totalPatients: "8,000",
      totalDescription: "of 10,000 target patients enrolled",
      averageBMI: "36.2",
      ageRange: "18-89"
    },
    diabetes: {
      totalPatients: "12,500", 
      totalDescription: "of 15,000 target patients enrolled",
      averageBMI: "31.8",
      ageRange: "25-85"
    },
    hypertension: {
      totalPatients: "6,800",
      totalDescription: "of 8,500 target patients enrolled", 
      averageBMI: "33.4",
      ageRange: "30-80"
    }
  };

  const currentData = studyData[selectedStudy as keyof typeof studyData];

  const summaryStats = [
    {
      title: "Total Patients",
      value: currentData.totalPatients,
      description: currentData.totalDescription
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
