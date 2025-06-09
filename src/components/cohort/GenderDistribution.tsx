
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const GenderDistribution = ({ detailed = false }: { detailed?: boolean }) => {
  // Mock data for gender distribution
  const genderData = [
    { gender: 'Female', count: 6200, percentage: 62, color: '#8884d8' },
    { gender: 'Male', count: 3600, percentage: 36, color: '#82ca9d' },
    { gender: 'Non-binary', count: 150, percentage: 1.5, color: '#ffc658' },
    { gender: 'Prefer not to say', count: 50, percentage: 0.5, color: '#ff7300' }
  ];

  // Age group by gender breakdown
  const ageGenderData = [
    { ageGroup: '18-29', female: 800, male: 450, nonBinary: 25, other: 10 },
    { ageGroup: '30-39', female: 1200, male: 680, nonBinary: 35, other: 15 },
    { ageGroup: '40-49', female: 1600, male: 920, nonBinary: 40, other: 10 },
    { ageGroup: '50-59', female: 1800, male: 1050, nonBinary: 30, other: 8 },
    { ageGroup: '60-69', female: 650, male: 420, nonBinary: 15, other: 5 },
    { ageGroup: '70+', female: 150, male: 80, nonBinary: 5, other: 2 }
  ];

  const chartConfig = {
    count: {
      label: "Count",
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="space-y-4">
              {genderData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.gender}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {detailed && (
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageGenderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageGroup" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="female" stackId="a" fill="#8884d8" name="Female" />
                  <Bar dataKey="male" stackId="a" fill="#82ca9d" name="Male" />
                  <Bar dataKey="nonBinary" stackId="a" fill="#ffc658" name="Non-binary" />
                  <Bar dataKey="other" stackId="a" fill="#ff7300" name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GenderDistribution;
