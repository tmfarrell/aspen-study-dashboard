import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StudyType } from '@/api/types';
import { studyData } from '@/data/studyData';
import { getStudySites } from '@/data/studyHelpers';

// Country name to code mapping
const countryToCode: Record<string, string> = {
  'Germany': 'DE',
  'France': 'FR', 
  'Spain': 'ES',
  'Italy': 'IT',
  'Switzerland': 'CH',
  'United States': 'US',
  'Canada': 'CA',
  'United Kingdom': 'GB'
};

interface EnrollmentProgressTileProps {
  studyId: StudyType;
}

export function EnrollmentProgressTile({ studyId }: EnrollmentProgressTileProps) {
  const study = studyData[studyId];
  const sites = getStudySites(studyId);
  
  // Don't render if no target enrollment
  if (!study.targetEnrollment) {
    return null;
  }

  // Calculate total enrolled from sites
  const totalEnrolled = sites.reduce((sum, site) => sum + site.enrolledPatients, 0);
  const progressPercentage = (totalEnrolled / study.targetEnrollment.total) * 100;

  // Determine if this is US-only study
  const countries = [...new Set(sites.map(site => site.country))];
  const isUSOnly = countries.length === 1 && countries[0] === 'United States';

  // Get enrollment breakdown
  const getEnrollmentBreakdown = () => {
    if (isUSOnly) {
      // Group by state for US-only studies
      const stateData = sites.reduce((acc, site) => {
        const state = site.subdivision || 'Unknown';
        if (!acc[state]) {
          acc[state] = { enrolled: 0, sites: 0 };
        }
        acc[state].enrolled += site.enrolledPatients;
        acc[state].sites += 1;
        return acc;
      }, {} as Record<string, { enrolled: number; sites: number }>);

      return Object.entries(stateData)
        .map(([state, data]) => ({
          name: state,
          enrolled: data.enrolled,
          target: null, // No state-level targets
          percentage: null
        }))
        .sort((a, b) => b.enrolled - a.enrolled);
    } else {
      // Group by country for international studies
      const countryData = sites.reduce((acc, site) => {
        const country = site.country;
        if (!acc[country]) {
          acc[country] = { enrolled: 0, sites: 0 };
        }
        acc[country].enrolled += site.enrolledPatients;
        acc[country].sites += 1;
        return acc;
      }, {} as Record<string, { enrolled: number; sites: number }>);

      return Object.entries(countryData)
        .map(([country, data]) => {
          const countryCode = countryToCode[country];
          const target = countryCode ? study.targetEnrollment?.byCountry?.[countryCode] : undefined;
          return {
            name: country,
            enrolled: data.enrolled,
            target,
            percentage: target ? (data.enrolled / target) * 100 : null
          };
        })
        .sort((a, b) => b.enrolled - a.enrolled);
    }
  };

  const breakdown = getEnrollmentBreakdown();

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Enrollment Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Progress */}
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">
            {totalEnrolled.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">
            of {study.targetEnrollment.total.toLocaleString()} target {study.enrollmentUnits} enrolled
          </p>
          <div className="space-y-1">
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(1)}% complete
            </p>
          </div>
        </div>

        {/* Breakdown by Country/State */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">
            By {isUSOnly ? 'State' : 'Country'}:
          </h4>
          <div className="space-y-2">
            {breakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <div className="flex items-center gap-2 min-w-0 flex-1 max-w-48">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {item.target ? (
                      `${item.enrolled.toLocaleString()}/${item.target.toLocaleString()}`
                    ) : (
                      item.enrolled.toLocaleString()
                    )}
                  </span>
                  <Progress 
                    value={item.percentage || 0} 
                    className="h-2 flex-1" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}