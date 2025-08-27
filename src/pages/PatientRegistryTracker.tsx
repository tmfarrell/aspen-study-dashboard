import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientCohortDashboard } from "@/components/PatientCohortDashboard";
import { DemographicsPanel } from "@/components/DemographicsPanel";
import { PatientEnrolmentPanel } from "@/components/PatientEnrolmentPanel";
import { MedicationsPanel } from "@/components/MedicationsPanel";
import { AFibPanel } from "@/components/AFibPanel";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import UserDropdown from "@/components/UserDropdown";
import { StudySelector } from "@/components/StudySelector";
import BMIDistributionChart from "@/components/cohort/BMIDistributionChart";
import GeographicDistribution from "@/components/cohort/GeographicDistribution";
import AgeDistributionChart from "@/components/cohort/AgeDistributionChart";
import CohortSummary from "@/components/cohort/CohortSummary";
import PatientTable from "@/components/cohort/PatientTable";
import QualityOfLifeChart from "@/components/cohort/QualityOfLifeChart";
import EnrollmentProgress from "@/components/cohort/EnrollmentProgress";
import AssessmentProgress from "@/components/cohort/AssessmentProgress";
import MedicationDistribution from "@/components/cohort/MedicationDistribution";
import GenderDistribution from "@/components/cohort/GenderDistribution";
import RaceDistribution from "@/components/cohort/RaceDistribution";
import CountryDistribution from "@/components/cohort/CountryDistribution";
import ComorbidityDistribution from "@/components/cohort/ComorbidityDistribution";
import { useCohortStore } from "@/stores/cohortStore";

export default function PatientRegistryTracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const { selectedStudy } = useCohortStore();

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="bg-[#003f7f] text-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">
                {selectedStudy === 'heartrhythm' ? 'Heart Rhythm Registry' : 
                 selectedStudy === 'diabetes' ? 'Diabetes Registry' :
                 selectedStudy === 'obesity' ? 'Obesity Registry' : 'Registry'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <StudySelector />
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Page Title and Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Aspen Registry Tracker</h2>
            <p className="text-muted-foreground">
              Comprehensive view of your registry data and analytics
            </p>
          </div>
        {selectedStudy === 'heartrhythm' ? (
          // Heart Rhythm Study specific content
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
          <>
            <CohortSummary selectedStudy={selectedStudy} />

            {/* Progress tracking section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <EnrollmentProgress selectedStudy={selectedStudy} />
              <AssessmentProgress selectedStudy={selectedStudy} />
            </div>

            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="grid w-full grid-cols-9">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                <TabsTrigger value="bmi">BMI Distribution</TabsTrigger>
                <TabsTrigger value="geography">Geographic</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="comorbidity">Comorbidity</TabsTrigger>
                <TabsTrigger value="medication">Medication</TabsTrigger>
                <TabsTrigger value="qol">Quality of Life</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
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
                <EnrollmentProgress detailed selectedStudy={selectedStudy} />
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

              <TabsContent value="insights" className="mt-6">
                <AIInsightsPanel />
              </TabsContent>
            </Tabs>
          </>
        )}
        </div>
      </div>
    </div>
  );
}