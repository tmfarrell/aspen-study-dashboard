import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { EnrollmentDashboard } from "@/components/registry/EnrollmentDashboard";
import { AFibPanel } from "@/components/registry/AFibPanel";
import { StudySelector } from "@/components/StudySelector";
import { Header } from "@/components/Header";

import DistributionMetric from "@/components/common/DistributionMetric";
import { GeographicTile } from "@/components/common/GeographicTile";
import StandardizedOverview from "@/components/registry/StandardizedOverview";
import PatientDataTable from "@/components/registry/PatientDataTable";

import AssessmentProgressMetrics from "@/components/registry/AssessmentProgressMetrics";

import PieChartMetric from "@/components/common/PieChartMetric";

import { DrillDownPieChart } from "@/components/medications/DrillDownPieChart";
import { DosingTab } from "@/components/medications/DosingTab";
import { TreatmentDurationTab } from "@/components/medications/TreatmentDurationTab";
import { DiscontinuationTab } from "@/components/medications/DiscontinuationTab";
import { getPharmaClassDistribution, generateMedicationData } from "@/data/medications/pharmaClasses";

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
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
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
              {selectedStudy === 'cardiology' ? (
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dosing">Dosing</TabsTrigger>
                    <TabsTrigger value="duration">Treatment Duration</TabsTrigger>
                    <TabsTrigger value="discontinuation">Discontinuation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                      <DrillDownPieChart 
                        title="Pharmaceutical Classes" 
                        initialData={getPharmaClassDistribution().map(item => ({
                          ...item,
                          percentage: (item.count / getPharmaClassDistribution().reduce((sum, i) => sum + i.count, 0)) * 100
                        }))}
                        onDrillDown={(item) => {
                          if (item.pharmaClassId) {
                            const medications = generateMedicationData(item.pharmaClassId, 500);
                            return medications.map(med => ({
                              category: med.medicationName,
                              count: med.patientCount,
                              percentage: (med.patientCount / medications.reduce((sum, m) => sum + m.patientCount, 0)) * 100,
                              medicationId: med.medicationId
                            }));
                          }
                          return null;
                        }}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="dosing">
                    <DosingTab studyId={selectedStudy} />
                  </TabsContent>

                  <TabsContent value="duration">
                    <TreatmentDurationTab studyId={selectedStudy} />
                  </TabsContent>

                  <TabsContent value="discontinuation">
                    <DiscontinuationTab studyId={selectedStudy} />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedStudy === 'diabetes' && (
                    <>
                      <PieChartMetric metricId="diabetes_medications" title="Diabetes Medications" />
                      <DistributionMetric metricId="medication_adherence" title="Medication Adherence" />
                    </>
                  )}
                  {selectedStudy === 'hypertension' && (
                    <>
                      <PieChartMetric metricId="bp_medications" title="Blood Pressure Medications" />
                      <DistributionMetric metricId="medication_adherence" title="Medication Adherence" />
                    </>
                  )}
                  {selectedStudy === 'obesity' && (
                    <>
                      <PieChartMetric metricId="weight_loss_medications" title="Weight Loss Medications" />
                      <DistributionMetric metricId="medication_adherence" title="Medication Adherence" />
                    </>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-6">
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