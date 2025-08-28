import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useStudyMetrics } from '@/state/metrics';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

interface PieChartMetricProps {
  metricId: string;
  title: string;
  studyId?: StudyType;
}

const PieChartMetric = ({ metricId, title, studyId }: PieChartMetricProps) => {
  const { selectedStudy } = useAppState();
  const currentStudyId = studyId || selectedStudy;
  const { data: metricsData, isLoading } = useStudyMetrics(currentStudyId);

  // Get metric from API
  const metric = metricsData?.metrics.find(m => m.id === metricId);

  // OM1 Color scheme for categories
  const om1Colors = [
    'hsl(var(--om1-primary-dark-blue))',     // Primary blue
    'hsl(var(--om1-secondary-light-blue))',  // Light blue
    'hsl(var(--om1-secondary-green))',       // Green
    'hsl(var(--om1-secondary-orange))',      // Orange
    'hsl(var(--om1-secondary-purple))',      // Purple
    'hsl(var(--om1-tertiary-yellow))',       // Yellow
    'hsl(var(--om1-tertiary-red))',          // Red
    'hsl(var(--om1-tertiary-pink))',         // Pink
  ];

  // Transform metric data for charts
  const chartData = React.useMemo(() => {
    if (!metric || metric.type !== 'categorical') return [];
    
    return metric.data.map((item, index) => ({
      category: item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase(),
      count: item.count,
      percentage: Math.round(item.percentage * 10) / 10, // Round to 1 decimal
      color: om1Colors[index % om1Colors.length]
    }));
  }, [metric]);

  const chartConfig = {
    count: {
      label: "Count",
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!chartData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground p-8">
            No {metricId} data available for this study
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ percentage }) => `${percentage}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name, props) => [
                    `${value.toLocaleString()} patients`,
                    props.payload?.category || name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="w-full">
            <div className="grid grid-cols-1 gap-1 text-sm">
              {chartData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1 px-2">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium truncate">{item.category}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-semibold text-sm">{item.count.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartMetric;