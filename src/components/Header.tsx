import React from 'react';
import UserDropdown from './UserDropdown';
import { StudySelector } from './StudySelector';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showStudySelector?: boolean;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, showStudySelector = false, actions }: HeaderProps) {
  return (
    <div className="bg-[#003f7f] text-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
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