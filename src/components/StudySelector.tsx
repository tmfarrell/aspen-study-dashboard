import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStudyOptions } from '@/state/studies';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

interface StudySelectorProps {
  className?: string;
}

export function StudySelector({ className = "w-48" }: StudySelectorProps) {
  const { selectedStudy, setSelectedStudy } = useAppState();
  const { data: studyOptions = [], isLoading } = useStudyOptions();

  if (isLoading) {
    return <div className="w-48 h-10 bg-muted animate-pulse rounded-md" />;
  }

  return (
    <div className="flex items-center gap-2 text-blue-500">
      <Select value={selectedStudy} onValueChange={(value) => setSelectedStudy(value as StudyType)}>
        <SelectTrigger className={className} id="study-select">
          <SelectValue placeholder="Select a study" />
        </SelectTrigger>
        <SelectContent>
          {studyOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
