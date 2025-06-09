
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CohortSummary = () => {
  const summaryStats = [
    {
      title: "Total Patients",
      value: "10,000",
      description: "Obesity patients enrolled"
    },
    {
      title: "Average BMI",
      value: "36.2",
      description: "kg/m² across cohort"
    },
    {
      title: "Age Range",
      value: "18-89",
      description: "Years (median: 52)"
    },
    {
      title: "Geographic Coverage",
      value: "50 States",
      description: "Uneven distribution"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
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
