import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStudyOptions } from '@/data/studyData';
import { useCohortStore } from '@/stores/cohortStore';

interface StudySelectorProps {
  className?: string;
}

export function StudySelector({ className = "w-48" }: StudySelectorProps) {
  const { selectedStudy, setSelectedStudy } = useCohortStore();
  const studyOptions = getStudyOptions();

  return (
    <div className="flex items-center gap-2 text-blue-500">
      <Select value={selectedStudy} onValueChange={setSelectedStudy}>
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
