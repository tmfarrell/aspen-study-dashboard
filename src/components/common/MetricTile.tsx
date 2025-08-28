import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudyMetrics } from '@/state/metrics';
import { StudyType } from '@/api/types';
import { Activity, TrendingUp, Users, BarChart3 } from 'lucide-react';

interface MetricTileProps {
  studyId: StudyType;
  metricId: string;
  displayType: 'average' | 'total' | 'range' | 'median';
  icon?: string;
  description?: string;
}

const MetricTile: React.FC<MetricTileProps> = ({ 
  studyId, 
  metricId, 
  displayType, 
  icon,
  description 
}) => {
  const { data: metricsData, isLoading } = useStudyMetrics(studyId);
  
  // Get metric from API
  const metric = metricsData?.metrics.find(m => m.id === metricId);

  // Icon mapping
  const getIcon = () => {
    switch (icon) {
      case 'activity': return <Activity className="w-4 h-4" />;
      case 'trending-up': return <TrendingUp className="w-4 h-4" />;
      case 'users': return <Users className="w-4 h-4" />;
      case 'bar-chart': return <BarChart3 className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[50px] bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!metric) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metricId} Metric
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0066CC]">N/A</div>
          <p className="text-sm text-muted-foreground mt-1">
            No data available
          </p>
        </CardContent>
      </Card>
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
        default:
          return metric.name;
      }
    }
    
    return metric.name;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {getIcon()}
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-[#0066CC]">{getDisplayValue()}</div>
        <p className="text-sm text-muted-foreground mt-1">
          {getDisplayDescription()}
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricTile;