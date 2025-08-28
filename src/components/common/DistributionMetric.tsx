import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useStudyMetrics } from '@/state/metrics';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

interface DistributionMetricProps {
  metricId: string;
  title: string;
  studyId?: StudyType;
  orientation?: 'vertical' | 'horizontal';
}

const DistributionMetric = ({ metricId, title, studyId, orientation = 'vertical' }: DistributionMetricProps) => {
  const { selectedStudy } = useAppState();
  const currentStudyId = studyId || selectedStudy;
  const { data: metricsData, isLoading } = useStudyMetrics(currentStudyId);

  // Get metric from API
  const metric = metricsData?.metrics.find(m => m.id === metricId);

  // Transform metric data for charts
  const chartData = React.useMemo(() => {
    if (!metric) return [];
    
    if (metric.type === 'numerical') {
      return metric.data.map((item) => ({
        bucket: item.bucket,
        count: item.count,
        percentage: Math.round(item.percentage * 10) / 10,
      }));
    } else if (metric.type === 'categorical') {
      return metric.data.map((item) => ({
        bucket: item.category,
        count: item.count,
        percentage: Math.round(item.percentage * 10) / 10,
      }));
    }
    
    return [];
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
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <ChartContainer config={chartConfig} className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart 
                data={chartData} 
                layout={orientation === 'horizontal' ? 'vertical' : undefined}
                margin={{ 
                  top: 20, 
                  right: 30, 
                  left: orientation === 'horizontal' ? 120 : 20, 
                  bottom: orientation === 'vertical' ? 60 : 20 
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {orientation === 'horizontal' ? (
                  <>
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis 
                      type="category" 
                      dataKey="bucket" 
                      tick={{ fontSize: 10 }}
                      width={100}
                      interval={0}
                    />
                  </>
                ) : (
                  <>
                    <XAxis 
                      dataKey="bucket" 
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                  </>
                )}
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
                  radius={orientation === 'horizontal' ? [0, 2, 2, 0] : [2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-3 flex-shrink-0">
          {metric && metric.type === 'numerical' && (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 text-xs overflow-y-auto max-h-[80px]">
                {[
                  { label: "Total", value: metric.total.toLocaleString() },
                  { label: "Average", value: Math.round(metric.average * 10) / 10 },
                  { label: "Median", value: Math.round(metric.median * 10) / 10 },
                  { label: "Range", value: `${metric.min} - ${metric.max}` }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-xs font-medium">{stat.label}:</span>
                    <span className="font-semibold text-xs">{stat.value}</span>
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