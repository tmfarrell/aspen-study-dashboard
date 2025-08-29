import React from 'react';
import DistributionMetric from '@/components/common/DistributionMetric';

interface BMIDistributionChartProps {
  detailed?: boolean;
}

const BMIDistributionChart: React.FC<BMIDistributionChartProps> = ({ detailed = false }) => {
  return <DistributionMetric metricId="bmi" title="BMI Distribution" />;
};

export default BMIDistributionChart;