import React from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { useStudyMetrics } from '@/state/metrics';
import { StudyType } from '@/api/types';
import { Clock } from 'lucide-react';

interface AgeRangeTileProps {
  studyId: StudyType;
  showAverage?: boolean;
}

const AgeRangeTile: React.FC<AgeRangeTileProps> = ({ studyId, showAverage = false }) => {
  const { data: metricsData, isLoading } = useStudyMetrics(studyId);
  
  // Get age metric from API
  const ageMetric = metricsData?.metrics.find(m => m.id === 'age');

  if (isLoading) {
    return <div className="h-32 bg-muted animate-pulse rounded-lg" />;
  }

  if (!ageMetric || ageMetric.type !== 'numerical') {
    return (
      <MetricCard
        title="Age Range"
        value="N/A"
        subtitle="No age data available"
        icon={<Clock className="w-5 h-5" />}
      />
    );
  }

  const ageRange = `${ageMetric.min}-${ageMetric.max}`;
  const description = showAverage 
    ? `Average: ${ageMetric.average} years`
    : `Years (median: ${ageMetric.median})`;

  return (
    <MetricCard
      title="Age Range"
      value={ageRange}
      subtitle={description}
      icon={<Clock className="w-5 h-5" />}
    />
  );
};

export default AgeRangeTile;