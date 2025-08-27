import React from 'react';
import UserDropdown from './UserDropdown';
import { StudySelector } from './StudySelector';
import { useCohortStore } from '@/stores/cohortStore';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showStudySelector?: boolean;
  actions?: React.ReactNode;
  useRegistryTitle?: boolean;
}

const getRegistryTitle = (selectedStudy: string) => {
  switch (selectedStudy) {
    case 'heartrhythm':
      return 'Heart Rhythm Registry';
    case 'diabetes':
      return 'Diabetes Registry';
    case 'obesity':
      return 'Obesity Registry';
    case 'hypertension':
      return 'Hypertension Registry';
    default:
      return 'Registry';
  }
};

export function Header({ title, subtitle, showStudySelector = false, actions, useRegistryTitle = false }: HeaderProps) {
  const { selectedStudy } = useCohortStore();
  
  const displayTitle = useRegistryTitle ? getRegistryTitle(selectedStudy) : title;

  return (
    <div className="bg-[#003f7f] text-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
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