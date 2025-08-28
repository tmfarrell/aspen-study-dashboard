import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Age Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[50px] bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!ageMetric || ageMetric.type !== 'numerical') {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Age Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#0066CC]">N/A</div>
          <p className="text-sm text-muted-foreground mt-1">
            No age data available
          </p>
        </CardContent>
      </Card>
    );
  }

  const ageRange = `${ageMetric.min}-${ageMetric.max}`;
  const description = showAverage 
    ? `Average: ${ageMetric.average} years`
    : `Years (median: ${ageMetric.median})`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Age Range
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-[#0066CC]">{ageRange}</div>
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default AgeRangeTile;