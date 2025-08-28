import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useStudyMetrics } from '@/state/metrics';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

interface DistributionMetricProps {
  metricId: string;
  title: string;
  studyId?: StudyType;
}

const DistributionMetric = ({ metricId, title, studyId }: DistributionMetricProps) => {
  const { selectedStudy } = useAppState();
  const currentStudyId = studyId || selectedStudy;
  const { data: metricsData, isLoading } = useStudyMetrics(currentStudyId);

  // Get metric from API
  const metric = metricsData?.metrics.find(m => m.id === metricId);

  // Transform metric data for charts
  const chartData = React.useMemo(() => {
    if (!metric || metric.type !== 'numerical') return [];
    
    return metric.data.map((item) => ({
      bucket: item.bucket,
      count: item.count,
      percentage: Math.round(item.percentage * 10) / 10, // Round to 1 decimal
    }));
  }, [metric]);

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--om1-primary-dark-blue))",
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
        <div className="flex flex-col space-y-4">
          <ChartContainer config={chartConfig} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="bucket" 
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [
                    `${value.toLocaleString()} patients (${chartData.find(d => d.count === value)?.percentage}%)`,
                    "Count"
                  ]}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-count)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {metric && metric.type === 'numerical' && (
            <div className="w-full">
              <div className="grid grid-cols-1 gap-1 text-xs">
                {[
                  { label: "Total", value: metric.total.toLocaleString() },
                  { label: "Average", value: Math.round(metric.average * 10) / 10 },
                  { label: "Median", value: Math.round(metric.median * 10) / 10 },
                  { label: "Range", value: `${metric.min} - ${metric.max}` }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-2">
                    <span className="text-sm font-medium">{stat.label}:</span>
                    <span className="font-semibold text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionMetric;