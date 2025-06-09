
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface AgeDistributionChartProps {
  detailed?: boolean;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ detailed = false }) => {
  const ageData = [
    { ageGroup: "18-25", patients: 450, percentage: 4.5 },
    { ageGroup: "26-35", patients: 1200, percentage: 12.0 },
    { ageGroup: "36-45", patients: 1800, percentage: 18.0 },
    { ageGroup: "46-55", patients: 2200, percentage: 22.0 },
    { ageGroup: "56-65", patients: 2500, percentage: 25.0 },
    { ageGroup: "66-75", patients: 1500, percentage: 15.0 },
    { ageGroup: "76-85", patients: 300, percentage: 3.0 },
    { ageGroup: "85+", patients: 50, percentage: 0.5 }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Skewed towards middle-aged and older adults
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ageData}>
              <XAxis dataKey="ageGroup" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [value, "Patients"]}
                labelFormatter={(label) => `Age Group: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stroke="var(--color-patients)"
                fill="var(--color-patients)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        {detailed && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Median Age:</span> 52 years
            </div>
            <div>
              <span className="font-medium">Peak Age Group:</span> 56-65 years
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgeDistributionChart;
