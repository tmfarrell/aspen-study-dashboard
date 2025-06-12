
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, CartesianGrid, LineChart, Line } from 'recharts';

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

  // Weight reduction trends data
  const weightReductionData = [
    { month: 'Jan 2024', avgWeightLoss: 0 },
    { month: 'Feb 2024', avgWeightLoss: 1.2 },
    { month: 'Mar 2024', avgWeightLoss: 2.8 },
    { month: 'Apr 2024', avgWeightLoss: 4.5 },
    { month: 'May 2024', avgWeightLoss: 6.1 },
    { month: 'Jun 2024', avgWeightLoss: 7.8 },
    { month: 'Jul 2024', avgWeightLoss: 9.2 },
    { month: 'Aug 2024', avgWeightLoss: 10.7 },
    { month: 'Sep 2024', avgWeightLoss: 12.1 },
    { month: 'Oct 2024', avgWeightLoss: 13.5 },
    { month: 'Nov 2024', avgWeightLoss: 14.8 },
    { month: 'Dec 2024', avgWeightLoss: 16.2 }
  ];

  // Obesity class movement data
  const classMovementData = [
    { timePoint: 'Baseline', classI: 4200, classII: 3500, classIII: 2300 },
    { timePoint: '3 Months', classI: 4350, classII: 3420, classIII: 2230 },
    { timePoint: '6 Months', classI: 4480, classII: 3340, classIII: 2180 },
    { timePoint: '9 Months', classI: 4590, classII: 3280, classIII: 2130 },
    { timePoint: '12 Months', classI: 4680, classII: 3220, classIII: 2100 }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
      color: "hsl(var(--primary))",
    },
    avgWeightLoss: {
      label: "Average Weight Loss (kg)",
    },
    classI: {
      label: "Class I Obesity",
    },
    classII: {
      label: "Class II Obesity", 
    },
    classIII: {
      label: "Class III Obesity",
    }
  };

  if (!detailed) {
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
  }

  return (
    <div className="space-y-6">
      {/* BMI Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>BMI Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Current distribution across obesity classes
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
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

      {/* Weight Reduction Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Reduction Trends</CardTitle>
          <p className="text-sm text-muted-foreground">
            Average weight loss across all patients over 12 months
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightReductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={10}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value} kg`, "Average Weight Loss"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="avgWeightLoss" 
                  stroke="#22c55e" 
                  fill="#22c55e"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Obesity Class Movement */}
      <Card>
        <CardHeader>
          <CardTitle>Obesity Class Movement</CardTitle>
          <p className="text-sm text-muted-foreground">
            Patient movement between obesity classes over time
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={classMovementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timePoint" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="classI" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Class I"
                />
                <Line 
                  type="monotone" 
                  dataKey="classII" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Class II"
                />
                <Line 
                  type="monotone" 
                  dataKey="classIII" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Class III"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BMIDistributionChart;
