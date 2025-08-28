import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useAppState } from '@/contexts/AppStateContext';
import { useStudies } from '@/state/studies';
import { StudyType } from '@/api/types';
import StudyCard from '@/components/StudyCard';

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedStudy } = useAppState();
  const { data: studies, isLoading, error } = useStudies();

  const handleStudySelect = (studyType: StudyType) => {
    setSelectedStudy(studyType);
    navigate('/patient-registry');
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
            {studyList.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                studyType={study.id as StudyType}
                onSelect={handleStudySelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;