import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { useStudyStats } from '@/state/studies';
import { StudyType, StudyData } from '@/api/types';

interface StudyCardProps {
  study: StudyData;
  studyType: StudyType;
  onSelect: (studyType: StudyType) => void;
}

const StudyCard = ({ study, studyType, onSelect }: StudyCardProps) => {
  const { data: stats, isLoading } = useStudyStats(studyType);

  const getStudyIcon = (studyType: StudyType) => {
    switch (studyType) {
      case 'obesity':
        return <TrendingUp className="h-8 w-8 text-blue-600" />;
      case 'diabetes':
        return <Activity className="h-8 w-8 text-green-600" />;
      case 'cardiology':
        return <Activity className="h-8 w-8 text-red-600" />;
      case 'hypertension':
        return <TrendingUp className="h-8 w-8 text-purple-600" />;
      default:
        return <Users className="h-8 w-8 text-gray-600" />;
    }
  };

  const getRegionBadge = (study: StudyData) => {
    const { regions } = study;
    const badges = [];
    
    if (regions?.us) {
      badges.push(<Badge key="us" variant="outline" className="text-xs">US</Badge>);
    }
    if (regions?.eu) {
      badges.push(<Badge key="eu" variant="outline" className="text-xs">EU</Badge>);
    }
    
    return badges.length > 0 ? <div className="flex gap-1">{badges}</div> : null;
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-[#003f7f]"
      onClick={() => onSelect(studyType)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStudyIcon(studyType)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-xl font-semibold text-[#003f7f]">
                  {study.name}
                </CardTitle>
                {getRegionBadge(study)}
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                {study.description}
              </CardDescription>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#003f7f]">
              {isLoading ? '...' : stats?.totalPatients.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-muted-foreground">Total Patients</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[#003f7f]">
              {isLoading ? '...' : stats?.activeSites || '0'}
            </div>
            <div className="text-sm text-muted-foreground">Active Sites</div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(studyType);
          }}
        >
          Access Registry
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudyCard;