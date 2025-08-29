import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UserDropdown from '@/components/UserDropdown';
import BMIDistributionChart from '@/components/cohort/BMIDistributionChart';
import GeographicDistribution from '@/components/cohort/GeographicDistribution';
import AgeDistributionChart from '@/components/cohort/AgeDistributionChart';
import StandardizedOverview from '@/components/cohort/StandardizedOverview';
import PatientTable from '@/components/cohort/PatientTable';
import QualityOfLifeChart from '@/components/cohort/QualityOfLifeChart';

import AssessmentProgressMetrics from '@/components/cohort/AssessmentProgressMetrics';
import MedicationDistribution from '@/components/cohort/MedicationDistribution';
import GenderDistribution from '@/components/cohort/GenderDistribution';
import RaceDistribution from '@/components/cohort/RaceDistribution';

import ComorbidityDistribution from '@/components/cohort/ComorbidityDistribution';
import { StudyType } from '@/api/types';
import { useStudyOptions } from '@/state/studies';

const PatientCohort = () => {
  const [selectedStudy, setSelectedStudy] = useState<StudyType>('obesity');
  const { data: studyOptions = [], isLoading } = useStudyOptions();

  if (isLoading) {
    return <div className="min-h-screen bg-background p-6"><div className="h-96 bg-muted animate-pulse rounded-lg" /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="pt-2">
                <h1 className="text-2xl font-bold text-[#003f7f]">Aspen Study Tracker</h1>
                <p className="text-muted-foreground">Track and manage patient cohorts for your study</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Study Selection Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-muted-foreground">Select Study:</label>
              <Select value={selectedStudy} onValueChange={(value) => setSelectedStudy(value as StudyType)}>
                <SelectTrigger className="w-[200px]">
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
          </CardContent>
        </Card>

        <StandardizedOverview studyId={selectedStudy} />


        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="bmi">BMI Distribution</TabsTrigger>
            <TabsTrigger value="geography">Geographic</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="comorbidity">Comorbidity</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
            <TabsTrigger value="qol">Quality of Life</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BMIDistributionChart />
              <AgeDistributionChart />
              <div className="lg:col-span-2">
                <GeographicDistribution />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enrollment" className="mt-6">
            <div className="text-center p-8 text-muted-foreground">
              Enrollment details have been moved to the Overview tab
            </div>
          </TabsContent>

          <TabsContent value="bmi" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <BMIDistributionChart detailed />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>BMI Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Class I Obesity (30-34.9)</span>
                      <span className="font-semibold">4,200 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Class II Obesity (35-39.9)</span>
                      <span className="font-semibold">3,500 patients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Class III Obesity (40+)</span>
                      <span className="font-semibold">2,300 patients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="mt-6">
            <GeographicDistribution detailed />
          </TabsContent>

          <TabsContent value="demographics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AgeDistributionChart detailed />
              <GenderDistribution />
              <RaceDistribution />
            </div>
            <div className="mt-6">
              <PatientTable />
            </div>
          </TabsContent>

          <TabsContent value="comorbidity" className="mt-6">
            <ComorbidityDistribution />
          </TabsContent>

          <TabsContent value="medication" className="mt-6">
            <MedicationDistribution detailed />
          </TabsContent>

          <TabsContent value="qol" className="mt-6">
            <div className="space-y-6">
              <QualityOfLifeChart />
              <QualityOfLifeChart detailed />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientCohort;
