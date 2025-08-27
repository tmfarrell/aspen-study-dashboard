import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { useCohortStore } from '@/stores/cohortStore';
import { studyData, StudyType, getStudyOptions } from '@/data/studyData';

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedStudy } = useCohortStore();

  const handleStudySelect = (studyType: StudyType) => {
    setSelectedStudy(studyType);
    navigate('/patient-registry');
  };

  const getStudyDescription = (studyType: StudyType) => {
    switch (studyType) {
      case 'obesity':
        return 'Comprehensive obesity research tracking patient outcomes, treatments, and interventions';
      case 'diabetes':
        return 'Type 2 diabetes management and outcomes research across multiple healthcare settings';
      case 'heartrhythm':
        return 'Heart rhythm disorders and arrhythmia treatment effectiveness studies';
      case 'hypertension':
        return 'Hypertension management and cardiovascular risk reduction research';
      default:
        return 'Clinical research study tracking patient outcomes and treatments';
    }
  };

  const getStudyIcon = (studyType: StudyType) => {
    switch (studyType) {
      case 'obesity':
        return <TrendingUp className="h-8 w-8 text-blue-600" />;
      case 'diabetes':
        return <Activity className="h-8 w-8 text-green-600" />;
      case 'heartrhythm':
        return <Activity className="h-8 w-8 text-red-600" />;
      case 'hypertension':
        return <TrendingUp className="h-8 w-8 text-purple-600" />;
      default:
        return <Users className="h-8 w-8 text-gray-600" />;
    }
  };

  const studyOptions = getStudyOptions();

  return (
    <div className="flex flex-col h-full">
      <Header title="Aspen" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-[#003f7f]">Welcome to Aspen</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select a registry to access comprehensive clinical research data, analytics, and insights
            </p>
          </div>

          {/* Study Registry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyOptions.map((option) => {
              const studyType = option.value as StudyType;
              const studyInfo = studyData[studyType];
              
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
                        <div>
                          <CardTitle className="text-xl font-semibold text-[#003f7f]">
                            {option.label}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground mt-1">
                            {getStudyDescription(studyType)}
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
                          {studyInfo?.totalPatients?.toLocaleString() || '0'}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Patients</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#003f7f]">
                          {Math.floor(Math.random() * 50) + 20}
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