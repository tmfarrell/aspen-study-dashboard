import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cardiologyPharmaClasses, generateMedicationData } from '@/data/medications/pharmaClasses';

interface DiscontinuationTabProps {
  studyId: string;
}

const COLORS = [
  'hsl(var(--om1-primary-dark-blue))',
  'hsl(var(--om1-secondary-light-blue))',
  'hsl(var(--om1-secondary-light-blue-light))',
  'hsl(var(--om1-secondary-light-blue-lighter))',
  'hsl(var(--om1-secondary-light-blue-lightest))',
];

export function DiscontinuationTab({ studyId }: DiscontinuationTabProps) {
  const [selectedPharmaClass, setSelectedPharmaClass] = useState<string | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [medicationData, setMedicationData] = useState<any[]>([]);

  const handlePharmaClassClick = (pharmaClassId: string) => {
    setSelectedPharmaClass(pharmaClassId);
    setSelectedMedication(null);
    const data = generateMedicationData(pharmaClassId, 500);
    setMedicationData(data);
  };

  const handleMedicationClick = (medicationId: string) => {
    setSelectedMedication(medicationId);
  };

  const handleBackClick = () => {
    if (selectedMedication) {
      setSelectedMedication(null);
    } else {
      setSelectedPharmaClass(null);
      setMedicationData([]);
    }
  };

  const selectedClass = cardiologyPharmaClasses.find(pc => pc.id === selectedPharmaClass);
  const selectedMedicationData = medicationData.find(med => med.medicationId === selectedMedication);

  const chartConfig = {
    count: {
      label: 'Patients',
      color: 'hsl(var(--chart-1))',
    },
  };

  // Show detailed discontinuation reasons for a specific medication
  if (selectedMedication && selectedMedicationData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to {selectedClass?.name}
          </Button>
          <h3 className="text-lg font-semibold">{selectedMedicationData.medicationName} - Discontinuation Reasons</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Discontinuation Reasons Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Reasons for Discontinuation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={selectedMedicationData.discontinuationReasons}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={30}
                      paddingAngle={2}
                      dataKey="patientCount"
                      nameKey="reason"
                    >
                      {selectedMedicationData.discontinuationReasons.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent 
                        nameKey="reason"
                        labelKey="reason"
                        formatter={(value, name) => [`${value} patients`, name]}
                      />} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Discontinuation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Total Patients Who Discontinued</p>
                  <p className="text-2xl font-bold text-red-600">
                    {selectedMedicationData.discontinuationReasons.reduce((sum: number, reason: any) => sum + reason.patientCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Out of {selectedMedicationData.patientCount} total patients
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedMedicationData.discontinuationReasons.map((reason: any, index: number) => (
                    <div key={reason.reason} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{reason.reason}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{reason.patientCount}</span>
                        <span className="text-muted-foreground ml-1">
                          ({reason.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show medications within a pharma class
  if (selectedPharmaClass && selectedClass) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Pharma Classes
          </Button>
          <h3 className="text-lg font-semibold">{selectedClass.name} - Discontinuation Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicationData.map(medication => {
            const totalDiscontinued = medication.discontinuationReasons.reduce((sum: number, reason: any) => sum + reason.patientCount, 0);
            const discontinuationRate = ((totalDiscontinued / medication.patientCount) * 100).toFixed(1);

            return (
              <Card 
                key={medication.medicationId}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMedicationClick(medication.medicationId)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    {medication.medicationName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Patients</span>
                      <span className="font-semibold">{medication.patientCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Discontinued</span>
                      <span className="font-semibold text-red-600">{totalDiscontinued}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Discontinuation Rate</span>
                      <span className="font-semibold text-red-600">{discontinuationRate}%</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Click to see detailed discontinuation reasons
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Show pharma class overview
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Discontinuation Analysis by Pharmaceutical Class</h3>
        <p className="text-muted-foreground">
          Click on a pharmaceutical class to see detailed discontinuation data for individual medications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardiologyPharmaClasses.map(pharmaClass => {
          const totalPatients = Math.floor(Math.random() * 300) + 150;
          const avgDiscontinuationRate = pharmaClass.medications.reduce((sum, med) => {
            const totalDisc = med.commonDiscontinuationReasons.reduce((s, r) => s + r.percentage, 0);
            return sum + (totalDisc * 0.3); // Assume 30% of percentages represent actual discontinuation
          }, 0) / pharmaClass.medications.length;

          // Generate discontinuation reasons data for pie chart
          const discontinuationReasons = [
            { reason: 'Adverse Reactions', patientCount: Math.floor(totalPatients * 0.33), percentage: 33 },
            { reason: 'Drug Ineffectiveness', patientCount: Math.floor(totalPatients * 0.25), percentage: 25 },
            { reason: 'Cost/Insurance', patientCount: Math.floor(totalPatients * 0.20), percentage: 20 },
            { reason: 'Patient Preference', patientCount: Math.floor(totalPatients * 0.12), percentage: 12 },
            { reason: 'Other', patientCount: Math.floor(totalPatients * 0.10), percentage: 10 },
          ];

          return (
            <Card 
              key={pharmaClass.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePharmaClassClick(pharmaClass.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {pharmaClass.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{pharmaClass.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Patients</span>
                      <span className="font-semibold">{totalPatients.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg Discontinuation</span>
                      <span className="font-semibold text-red-600">{avgDiscontinuationRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Medications</span>
                      <span className="font-semibold">{pharmaClass.medications.length}</span>
                    </div>
                  </div>
                  
                  {/* Pie Chart */}
                  <div className="h-32">
                    <ChartContainer config={chartConfig} className="h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                          data={discontinuationReasons}
                          cx="50%"
                          cy="50%"
                          outerRadius={40}
                          innerRadius={20}
                          paddingAngle={2}
                          dataKey="patientCount"
                          nameKey="reason"
                        >
                            {discontinuationReasons.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        <ChartTooltip 
                          content={<ChartTooltipContent 
                            nameKey="reason"
                            labelKey="reason"
                            formatter={(value, name) => [`${value} patients`, name]}
                          />} 
                        />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}