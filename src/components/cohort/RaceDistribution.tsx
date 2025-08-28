
import React from 'react';
import { StudyType } from '@/api/types';
import PieChartMetric from '@/components/common/PieChartMetric';

const RaceDistribution = ({ studyId }: { studyId?: StudyType }) => {
  return (
    <PieChartMetric 
      metricId="race" 
      title="Race/Ethnicity Distribution" 
      studyId={studyId} 
    />
  );
};

export default RaceDistribution;
