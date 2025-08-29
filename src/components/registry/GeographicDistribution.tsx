import React from 'react';
import { GeographicTile } from '@/components/common/GeographicTile';
import { StudyType } from '@/api/types';
import { useAppState } from '@/contexts/AppStateContext';

interface GeographicDistributionProps {
  detailed?: boolean;
  studyId?: StudyType;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ studyId }) => {
  const { selectedStudy } = useAppState();
  const currentStudyId = studyId || selectedStudy;

  return <GeographicTile studyId={currentStudyId} />;
};

export default GeographicDistribution;