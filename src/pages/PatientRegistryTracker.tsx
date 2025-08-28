import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientCohortDashboard } from "@/components/PatientCohortDashboard";
import { DemographicsPanel } from "@/components/DemographicsPanel";
import { PatientEnrolmentPanel } from "@/components/PatientEnrolmentPanel";
import { MedicationsPanel } from "@/components/MedicationsPanel";
import { AFibPanel } from "@/components/AFibPanel";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { StudySelector } from "@/components/StudySelector";
import { Header } from "@/components/Header";
import BMIDistributionChart from "@/components/cohort/BMIDistributionChart";
import GeographicDistribution from "@/components/cohort/GeographicDistribution";
import AgeDistributionChart from "@/components/cohort/AgeDistributionChart";
import { GeographicTile } from "@/components/common/GeographicTile";
import CohortSummary from "@/components/cohort/CohortSummary";
import PatientTable from "@/components/cohort/PatientTable";
import QualityOfLifeChart from "@/components/cohort/QualityOfLifeChart";

import AssessmentProgress from "@/components/cohort/AssessmentProgress";
import MedicationDistribution from "@/components/cohort/MedicationDistribution";
import GenderDistribution from "@/components/cohort/GenderDistribution";
import RaceDistribution from "@/components/cohort/RaceDistribution";
import CountryDistribution from "@/components/cohort/CountryDistribution";
import ComorbidityDistribution from "@/components/cohort/ComorbidityDistribution";
import { useAppState } from "@/contexts/AppStateContext";

export default function PatientRegistryTracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const { selectedStudy } = useAppState();

  return (
    <div className="flex flex-col h-full">
      <Header useRegistryTitle={true} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Page Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Aspen Registry Overview</h2>
            <p className="text-muted-foreground">
              Comprehensive view of your registry data and analytics
            </p>
          </div>
        {selectedStudy === 'cardiology' ? (
          // Cardiology Study specific content
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="enrollment">Patient Enrollment</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="afib">AFib Analysis</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <PatientCohortDashboard />
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <DemographicsPanel />
            </TabsContent>

            <TabsContent value="enrollment" className="space-y-6">
              <PatientEnrolmentPanel />
            </TabsContent>

            <TabsContent value="medications" className="space-y-6">
              <MedicationsPanel />
            </TabsContent>

            <TabsContent value="afib" className="space-y-6">
              <AFibPanel />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <AIInsightsPanel />
            </TabsContent>
          </Tabs>
        ) : (
          // Other studies content (from PatientCohort)
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
              <TabsTrigger value="bmi">BMI Distribution</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="comorbidity">Comorbidity</TabsTrigger>
              <TabsTrigger value="medication">Medication</TabsTrigger>
              <TabsTrigger value="qol">Quality of Life</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <CohortSummary selectedStudy={selectedStudy} />
              
              {/* Progress tracking section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AssessmentProgress selectedStudy={selectedStudy} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BMIDistributionChart />
                <AgeDistributionChart />
                <div className="lg:col-span-2">
                  <GeographicTile studyId={selectedStudy} />
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

              <TabsContent value="insights" className="mt-6">
                <AIInsightsPanel />
              </TabsContent>
          </Tabs>
        )}
        </div>
      </div>
    </div>
  );
}