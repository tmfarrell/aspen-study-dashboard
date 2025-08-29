import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { EnrollmentDashboard } from "@/components/registry/EnrollmentDashboard";
import { MedicationsPanel } from "@/components/registry/MedicationsPanel";
import { AFibPanel } from "@/components/registry/AFibPanel";
import { StudySelector } from "@/components/StudySelector";
import { Header } from "@/components/Header";


import DistributionMetric from "@/components/common/DistributionMetric";
import { GeographicTile } from "@/components/common/GeographicTile";
import StandardizedOverview from "@/components/registry/StandardizedOverview";
import PatientDataTable from "@/components/registry/PatientDataTable";


import AssessmentProgressMetrics from "@/components/registry/AssessmentProgressMetrics";
import MedicationDistribution from "@/components/registry/MedicationDistribution";
import PieChartMetric from "@/components/common/PieChartMetric";



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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="analysis">Analytics</TabsTrigger>
          </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <StandardizedOverview studyId={selectedStudy} />
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DistributionMetric metricId="age" title="Age Distribution" />
                <PieChartMetric metricId="gender" title="Gender Distribution" />
                <PieChartMetric metricId="race" title="Race/Ethnicity Distribution" />
              </div>
              <div className="mt-6">
                <PatientDataTable studyId={selectedStudy} />
              </div>
            </TabsContent>

            <TabsContent value="enrollment" className="space-y-6">
              <EnrollmentDashboard studyId={selectedStudy} />
            </TabsContent>

            <TabsContent value="medications" className="space-y-6">
              <div className="text-center p-8 text-muted-foreground">
                Medications content will be implemented here
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {selectedStudy === 'cardiology' ? (
                <AFibPanel />
              ) : selectedStudy === 'obesity' ? (
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
              ) : selectedStudy === 'diabetes' || selectedStudy === 'hypertension' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DistributionMetric metricId="comorbidity_count" title="Comorbidity Count Distribution" />
                  <PieChartMetric metricId="medicalHistory" title="Medical Conditions" />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DistributionMetric metricId="qualityOfLife" title="Quality of Life Scores" />
                  <PieChartMetric metricId="healthUtility" title="Health Utility Index" />
                </div>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}