import React from 'react';
import { Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useStudyOptions } from '@/state/studies';
import { useAppState } from '@/contexts/AppStateContext';
import { StudyType } from '@/api/types';

export function StudyDropdown() {
  const { selectedStudy, setSelectedStudy } = useAppState();
  const { data: studyOptions = [], isLoading } = useStudyOptions();
  
  if (isLoading) {
    return <div className="w-10 h-10 bg-muted animate-pulse rounded-md" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-background border border-border shadow-lg z-50"
      >
        <DropdownMenuLabel>Switch Study</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {studyOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSelectedStudy(option.value as StudyType)}
            className={`cursor-pointer ${
              selectedStudy === option.value 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-muted'
            }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}