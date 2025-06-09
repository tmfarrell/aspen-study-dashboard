
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface BMIDistributionChartProps {
  detailed?: boolean;
}

const BMIDistributionChart: React.FC<BMIDistributionChartProps> = ({ detailed = false }) => {
  const bmiData = [
    { range: "30-31", patients: 1200, category: "Class I" },
    { range: "31-32", patients: 1100, category: "Class I" },
    { range: "32-33", patients: 950, category: "Class I" },
    { range: "33-34", patients: 800, category: "Class I" },
    { range: "34-35", patients: 150, category: "Class I" },
    { range: "35-36", patients: 900, category: "Class II" },
    { range: "36-37", patients: 850, category: "Class II" },
    { range: "37-38", patients: 750, category: "Class II" },
    { range: "38-39", patients: 650, category: "Class II" },
    { range: "39-40", patients: 350, category: "Class II" },
    { range: "40-42", patients: 800, category: "Class III" },
    { range: "42-44", patients: 650, category: "Class III" },
    { range: "44-46", patients: 450, category: "Class III" },
    { range: "46-48", patients: 250, category: "Class III" },
    { range: "48+", patients: 150, category: "Class III" }
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
        <CardTitle>BMI Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Uneven distribution across obesity classifications
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bmiData}>
              <XAxis 
                dataKey="range" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name) => [value, "Patients"]}
                labelFormatter={(label) => `BMI Range: ${label}`}
              />
              <Bar 
                dataKey="patients" 
                fill="var(--color-patients)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BMIDistributionChart;
