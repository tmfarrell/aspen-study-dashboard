
import React from 'react';
import DistributionMetric from '@/components/common/DistributionMetric';

interface AgeDistributionChartProps {
  detailed?: boolean;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ detailed = false }) => {
  return <DistributionMetric metricId="age" title="Age Distribution" />;
};

export default AgeDistributionChart;
