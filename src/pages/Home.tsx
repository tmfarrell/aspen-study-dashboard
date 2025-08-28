import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { useAppState } from '@/contexts/AppStateContext';
import { useStudies } from '@/state/studies';
import { StudyType } from '@/api/types';

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedStudy } = useAppState();
  const { data: studies, isLoading, error } = useStudies();

  const handleStudySelect = (studyType: StudyType) => {
    setSelectedStudy(studyType);
    navigate('/patient-registry');
  };

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

  const getRegionBadge = (study: any) => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Aspen" />
        <div className="flex-1 overflow-y-auto">
          <div className="pl-8 pr-4 py-6 space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">Loading studies...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <Header title="Aspen" />
        <div className="flex-1 overflow-y-auto">
          <div className="pl-8 pr-4 py-6 space-y-6">
            <div className="text-center">
              <p className="text-red-500">Error loading studies: {error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const studyList = studies || [];

  return (
    <div className="flex flex-col h-full">
      <Header title="Aspen" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Welcome Section */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-[#003f7f]">Welcome to Aspen</h1>
            <p className="text-xl text-muted-foreground max-w-4xl">
              Select a registry to access comprehensive clinical research data, analytics, and insights
            </p>
          </div>

          {/* Study Registry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
            {studyList.map((study) => {
              const studyType = study.id as StudyType;
              
              return (
                <Card 
                  key={studyType}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-[#003f7f]"
                  onClick={() => handleStudySelect(studyType)}
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
                          {study.totalPatients?.toLocaleString() || '0'}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Patients</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#003f7f]">
                          {study.enrolledSites || Math.floor(Math.random() * 50) + 20}
                        </div>
                        <div className="text-sm text-muted-foreground">Active Sites</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStudySelect(studyType);
                      }}
                    >
                      Access Registry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;