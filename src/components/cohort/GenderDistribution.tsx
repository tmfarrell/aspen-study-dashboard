
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useStudyMetrics } from '@/state/metrics';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

const GenderDistribution = ({ detailed = false, studyId }: { detailed?: boolean; studyId?: StudyType }) => {
  const { selectedStudy } = useAppState();
  const currentStudyId = studyId || selectedStudy;
  const { data: metricsData, isLoading } = useStudyMetrics(currentStudyId);

  // Get gender metric from API
  const genderMetric = metricsData?.metrics.find(m => m.id === 'gender');

  // OM1 Color scheme for gender categories
  const om1Colors = [
    'hsl(var(--om1-primary-dark-blue))',     // Primary blue
    'hsl(var(--om1-secondary-light-blue))',  // Light blue
    'hsl(var(--om1-secondary-green))',       // Green
    'hsl(var(--om1-secondary-orange))',      // Orange
    'hsl(var(--om1-secondary-purple))',      // Purple
  ];

  // Transform metric data for charts
  const genderData = React.useMemo(() => {
    if (!genderMetric || genderMetric.type !== 'categorical') return [];
    
    return genderMetric.data.map((item, index) => ({
      gender: item.category,
      count: item.count,
      percentage: Math.round(item.percentage * 10) / 10, // Round to 1 decimal
      color: om1Colors[index % om1Colors.length]
    }));
  }, [genderMetric]);

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!genderData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground p-8">
            No gender data available for this study
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-start">
              <ChartContainer config={chartConfig} className="h-[400px] w-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                      labelLine={false}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="space-y-2">
              {genderData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium text-sm">{item.gender}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{item.count.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}%</div>
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
