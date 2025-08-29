import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cardiologyPharmaClasses, generateMedicationData } from '@/data/medications/pharmaClasses';

interface TreatmentDurationTabProps {
  studyId: string;
}

export function TreatmentDurationTab({ studyId }: TreatmentDurationTabProps) {
  const [selectedPharmaClass, setSelectedPharmaClass] = useState<string | null>(null);
  const [medicationData, setMedicationData] = useState<any[]>([]);

  const handlePharmaClassClick = (pharmaClassId: string) => {
    setSelectedPharmaClass(pharmaClassId);
    const data = generateMedicationData(pharmaClassId, 500);
    setMedicationData(data);
  };

  const handleBackClick = () => {
    setSelectedPharmaClass(null);
    setMedicationData([]);
  };

  const selectedClass = cardiologyPharmaClasses.find(pc => pc.id === selectedPharmaClass);

  // Generate duration distribution data for chart
  const generateDurationData = (medications: any[]) => {
    const durations = ['0-6 months', '6-12 months', '1-2 years', '2-3 years', '3+ years'];
    return durations.map(duration => {
      let count = 0;
      medications.forEach(med => {
        const avgDuration = med.averageTreatmentDuration;
        if (duration === '0-6 months' && avgDuration <= 6) count += Math.floor(med.patientCount * 0.2);
        else if (duration === '6-12 months' && avgDuration > 6 && avgDuration <= 12) count += Math.floor(med.patientCount * 0.3);
        else if (duration === '1-2 years' && avgDuration > 12 && avgDuration <= 24) count += Math.floor(med.patientCount * 0.3);
        else if (duration === '2-3 years' && avgDuration > 24 && avgDuration <= 36) count += Math.floor(med.patientCount * 0.15);
        else if (duration === '3+ years' && avgDuration > 36) count += Math.floor(med.patientCount * 0.05);
      });
      return { duration, count };
    });
  };

  const chartConfig = {
    count: {
      label: 'Patients',
      color: 'hsl(var(--chart-1))',
    },
  };

  if (selectedPharmaClass && selectedClass) {
    const durationData = generateDurationData(medicationData);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Pharma Classes
          </Button>
          <h3 className="text-lg font-semibold">{selectedClass.name} - Treatment Duration</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Duration Distribution Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Treatment Duration Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={durationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Individual Medication Details */}
          {medicationData.map(medication => (
            <Card key={medication.medicationId}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {medication.medicationName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                    <p className="text-2xl font-bold text-primary">{medication.patientCount.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                    <p className="text-2xl font-bold text-primary">{medication.averageTreatmentDuration} months</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Duration Breakdown:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short-term (≤12 months)</span>
                      <span className="font-medium">{Math.floor(medication.patientCount * 0.3)} patients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium-term (1-2 years)</span>
                      <span className="font-medium">{Math.floor(medication.patientCount * 0.4)} patients</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long-term (2+ years)</span>
                      <span className="font-medium">{Math.floor(medication.patientCount * 0.3)} patients</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Treatment Duration by Pharmaceutical Class</h3>
        <p className="text-muted-foreground">
          Click on a pharmaceutical class to see detailed treatment duration data for individual medications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardiologyPharmaClasses.map(pharmaClass => {
          const totalPatients = Math.floor(Math.random() * 300) + 150;
          const avgDuration = pharmaClass.medications.reduce((sum, med) => sum + med.averageTreatmentDuration, 0) / pharmaClass.medications.length;

          return (
            <Card 
              key={pharmaClass.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePharmaClassClick(pharmaClass.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {pharmaClass.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{pharmaClass.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Patients</span>
                    <span className="font-semibold">{totalPatients.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Duration</span>
                    <span className="font-semibold">{avgDuration.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Medications</span>
                    <span className="font-semibold">{pharmaClass.medications.length}</span>
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