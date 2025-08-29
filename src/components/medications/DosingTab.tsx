import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cardiologyPharmaClasses, generateMedicationData } from '@/data/medications/pharmaClasses';

interface DosingTabProps {
  studyId: string;
}

export function DosingTab({ studyId }: DosingTabProps) {
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

  if (selectedPharmaClass && selectedClass) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Pharma Classes
          </Button>
          <h3 className="text-lg font-semibold">{selectedClass.name} - Dosing Information</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {medicationData.map(medication => (
            <Card key={medication.medicationId}>
              <CardHeader>
                <CardTitle className="text-base">{medication.medicationName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Patients</p>
                    <p className="text-2xl font-bold">{medication.patientCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                    <p className="text-2xl font-bold">{medication.averageTreatmentDuration} months</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {medication.loadingDose && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Loading Dose</p>
                      <p className="text-lg font-semibold">{medication.loadingDose} {medication.unit}</p>
                    </div>
                  )}
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Maintenance Dose</p>
                    <p className="text-lg font-semibold">{medication.averageDose} {medication.unit}</p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Click a pharma class to see individual medication dosing details
                  </p>
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
        <h3 className="text-lg font-semibold mb-2">Average Dosing by Pharmaceutical Class</h3>
        <p className="text-muted-foreground">
          Click on a pharmaceutical class to see detailed dosing information for individual medications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardiologyPharmaClasses.map(pharmaClass => {
          const totalPatients = Math.floor(Math.random() * 300) + 150;
          const avgDosing = pharmaClass.medications.reduce((sum, med) => {
            const doseRange = med.typicalDose.maintenance.split('-');
            const avgDose = doseRange.length > 1 
              ? (parseFloat(doseRange[0]) + parseFloat(doseRange[1])) / 2
              : parseFloat(doseRange[0]);
            return sum + avgDose;
          }, 0) / pharmaClass.medications.length;

          return (
            <Card 
              key={pharmaClass.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePharmaClassClick(pharmaClass.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{pharmaClass.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{pharmaClass.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Patients</span>
                    <span className="font-semibold">{totalPatients.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Medications</span>
                    <span className="font-semibold">{pharmaClass.medications.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Dose Range</span>
                    <span className="font-semibold">{avgDosing.toFixed(0)} mg</span>
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