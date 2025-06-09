
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BMIDistributionChart from '@/components/cohort/BMIDistributionChart';
import GeographicDistribution from '@/components/cohort/GeographicDistribution';
import AgeDistributionChart from '@/components/cohort/AgeDistributionChart';
import CohortSummary from '@/components/cohort/CohortSummary';
import PatientTable from '@/components/cohort/PatientTable';

const PatientCohort = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Obesity Patient Cohort Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of 10,000 obesity patients across the United States
          </p>
        </div>

        <CohortSummary />

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bmi">BMI Distribution</TabsTrigger>
            <TabsTrigger value="geography">Geographic</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
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
              <PatientTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientCohort;
