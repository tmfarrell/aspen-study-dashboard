
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BMIDistributionChart from '@/components/cohort/BMIDistributionChart';
import GeographicDistribution from '@/components/cohort/GeographicDistribution';
import AgeDistributionChart from '@/components/cohort/AgeDistributionChart';
import CohortSummary from '@/components/cohort/CohortSummary';
import PatientTable from '@/components/cohort/PatientTable';
import QualityOfLifeChart from '@/components/cohort/QualityOfLifeChart';
import EnrollmentProgress from '@/components/cohort/EnrollmentProgress';
import AssessmentProgress from '@/components/cohort/AssessmentProgress';
import MedicationDistribution from '@/components/cohort/MedicationDistribution';
import GenderDistribution from '@/components/cohort/GenderDistribution';
import RaceDistribution from '@/components/cohort/RaceDistribution';
import CountryDistribution from '@/components/cohort/CountryDistribution';
import ComorbidityDistribution from '@/components/cohort/ComorbidityDistribution';

const PatientCohort = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with branding */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#003f7f] mb-2">Aspen</h1>
            <h2 className="text-3xl font-semibold text-foreground">Obesity Registry</h2>
          </div>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/3889fd89-3a5a-4489-aeb3-e1706b42c091.png" 
              alt="OM1 Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of 10,000 obesity patients globally
          </p>
        </div>

        <CohortSummary />

        {/* Progress tracking section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <EnrollmentProgress />
          <AssessmentProgress />
        </div>

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
            <EnrollmentProgress detailed />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgeDistributionChart detailed />
              <GenderDistribution />
              <RaceDistribution />
              <CountryDistribution />
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
