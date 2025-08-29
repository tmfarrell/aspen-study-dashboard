import React from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudyMetrics } from '@/state/metrics';
import { StudyType } from '@/api/types';
import { Activity, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricTileProps {
  studyId: StudyType;
  metricId: string;
  displayType: 'average' | 'total' | 'range' | 'median' | 'distribution';
  orientation?: 'horizontal' | 'vertical';
  icon?: string;
  description?: string;
}

const MetricTile: React.FC<MetricTileProps> = ({ 
  studyId, 
  metricId, 
  displayType, 
  orientation = 'horizontal',
  icon,
  description 
}) => {
  const { data: metricsData, isLoading } = useStudyMetrics(studyId);
  
  // Get metric from API
  const metric = metricsData?.metrics.find(m => m.id === metricId);

  // Icon mapping
  const getIcon = () => {
    switch (icon) {
      case 'activity': return <Activity className="w-5 h-5" />;
      case 'trending-up': return <TrendingUp className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'bar-chart': return <BarChart3 className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return <div className="h-32 bg-muted animate-pulse rounded-lg" />;
  }

  if (!metric) {
    return (
      <MetricCard
        title={`${metricId} Metric`}
        value="N/A"
        subtitle="No data available"
        icon={getIcon()}
      />
    );
  }

  const getDisplayValue = () => {
    if (metric.type === 'categorical') {
      if (displayType === 'total') {
        return metric.total.toLocaleString();
      }
      // For categorical, show the most common category
      const topCategory = metric.data[0];
      return topCategory ? `${topCategory.category} (${Math.round(topCategory.percentage)}%)` : 'N/A';
    }
    
    if (metric.type === 'numerical') {
      switch (displayType) {
        case 'average':
          return Math.round(metric.average * 10) / 10;
        case 'total':
          return metric.total.toLocaleString();
        case 'range':
          return `${metric.min}-${metric.max}`;
        case 'median':
          return Math.round(metric.median * 10) / 10;
        default:
          return metric.average;
      }
    }
    
    return 'N/A';
  };

  const getDisplayDescription = () => {
    if (description) return description;
    
    if (metric.type === 'numerical') {
      switch (displayType) {
        case 'average':
          return `Average across ${metric.total} patients`;
        case 'total':
          return `Total patients with data`;
        case 'range':
          return `Range across cohort`;
        case 'median':
          return `Median value`;
        default:
          return `Across ${metric.total} patients`;
      }
    }
    
    if (metric.type === 'categorical') {
      if (displayType === 'total') {
        return `Total patients`;
      }
      return `Most common category`;
    }
    
    return 'Study metric';
  };

  const getTitle = () => {
    if (metric.type === 'numerical') {
      switch (displayType) {
        case 'average':
          return `Average ${metric.name}`;
        case 'total':
          return `Total ${metric.name}`;
        case 'range':
          return `${metric.name} Range`;
        case 'median':
          return `Median ${metric.name}`;
        case 'distribution':
          return description || `${metric.name} Distribution`;
        default:
          return metric.name;
      }
    }
    
    return metric.name;
  };

  // For distribution display type, render a chart
  if (displayType === 'distribution') {
    // Use categorical chart styling for consistency
    const chartData = metric.type === 'categorical' ? 
      metric.data : 
      (metric.data || []).map((item: any, index: number) => ({
        ...item,
        color: `hsl(${200 + index * 20}, 70%, 60%)`
      }));

    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {getIcon()}
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={metric.type === 'categorical' ? 'category' : 'bucket'} 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  formatter={(value: number) => [value, metric.type === 'categorical' ? 'Patients' : 'Count']}
                  labelFormatter={(label) => `${getTitle()}: ${label}`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Standard metric tile for non-distribution types
  return (
    <MetricCard
      title={getTitle()}
      value={getDisplayValue()}
      subtitle={getDisplayDescription()}
      icon={getIcon()}
    />
  );
};

export default MetricTile;