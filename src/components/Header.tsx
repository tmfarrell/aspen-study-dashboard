import React from 'react';
import UserDropdown from './UserDropdown';
import { StudySelector } from './StudySelector';
import { useAppState } from '@/contexts/AppStateContext';
import { useStudy } from '@/state/studies';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showStudySelector?: boolean;
  actions?: React.ReactNode;
  useRegistryTitle?: boolean;
}

export function Header({ title, subtitle, showStudySelector = false, actions, useRegistryTitle = false }: HeaderProps) {
  const { selectedStudy } = useAppState();
  const { data: currentStudy } = useStudy(selectedStudy);
  
  const displayTitle = useRegistryTitle && currentStudy ? currentStudy.name : title;

  return (
    <div className="bg-[#003f7f] text-white border-b border-border sticky top-0 z-50">
      <div className="pl-8 pr-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{displayTitle}</h1>
            {subtitle && (
              <p className="text-white/80 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {showStudySelector && <StudySelector />}
            {actions}
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}