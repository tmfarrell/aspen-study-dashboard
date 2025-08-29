
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { StudyType } from '@/api/types';
import PieChartMetric from '@/components/common/PieChartMetric';

const GenderDistribution = ({ detailed = false, studyId }: { detailed?: boolean; studyId?: StudyType }) => {
  // Mock age-gender data for detailed view (this could be a separate metric in the future)
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
      <PieChartMetric 
        metricId="gender" 
        title="Gender Distribution" 
        studyId={studyId} 
      />

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
                  <Bar dataKey="female" stackId="a" fill="hsl(var(--om1-primary-dark-blue))" name="Female" />
                  <Bar dataKey="male" stackId="a" fill="hsl(var(--om1-secondary-light-blue))" name="Male" />
                  <Bar dataKey="nonBinary" stackId="a" fill="hsl(var(--om1-secondary-green))" name="Non-binary" />
                  <Bar dataKey="other" stackId="a" fill="hsl(var(--om1-secondary-orange))" name="Other" />
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
