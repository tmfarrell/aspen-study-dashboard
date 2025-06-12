
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ isOpen, onClose, patientId }) => {
  // Mock patient data based on ID
  const getPatientData = (id: string) => {
    const baseData = {
      P001: {
        demographics: { age: 45, gender: 'Female', race: 'White', height: '165 cm', weight: '87 kg' },
        bmi: 32.1,
        state: 'Texas',
        diagnosis: ['Obesity Class I (ICD-10: E66.01)', 'Type 2 Diabetes (ICD-10: E11.9)', 'Hypertension (ICD-10: I10)'],
        procedures: ['Dietary counseling (CPT: 97802)', 'BMI calculation (CPT: 3008F)', 'Diabetes screening (CPT: 82947)'],
        observations: ['Blood pressure: 142/88 mmHg', 'Heart rate: 78 bpm', 'Temperature: 98.6°F'],
        labs: ['HbA1c: 7.2%', 'Fasting glucose: 165 mg/dL', 'Total cholesterol: 220 mg/dL', 'HDL: 42 mg/dL'],
        medications: ['Semaglutide 1.0mg weekly', 'Metformin 1000mg twice daily', 'Lisinopril 10mg daily']
      },
      P002: {
        demographics: { age: 58, gender: 'Male', race: 'Hispanic', height: '175 cm', weight: '113 kg' },
        bmi: 36.8,
        state: 'California',
        diagnosis: ['Obesity Class II (ICD-10: E66.01)', 'Sleep apnea (ICD-10: G47.33)', 'Dyslipidemia (ICD-10: E78.5)'],
        procedures: ['Sleep study (CPT: 95810)', 'Lipid panel (CPT: 80061)', 'Nutrition counseling (CPT: 97803)'],
        observations: ['Blood pressure: 138/85 mmHg', 'Oxygen saturation: 96%', 'Waist circumference: 115 cm'],
        labs: ['Total cholesterol: 285 mg/dL', 'LDL: 185 mg/dL', 'Triglycerides: 320 mg/dL', 'HbA1c: 6.1%'],
        medications: ['Liraglutide 1.8mg daily', 'Atorvastatin 40mg daily', 'CPAP therapy']
      }
      // Add more patient data as needed
    };

    return baseData[id as keyof typeof baseData] || baseData.P001;
  };

  const patientData = getPatientData(patientId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Details - {patientId}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            De-identified patient summary for research analysis
          </p>
        </DialogHeader>

        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            <TabsTrigger value="procedures">Procedures</TabsTrigger>
            <TabsTrigger value="observations">Observations</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demographic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <div className="font-semibold">{patientData.demographics.age} years</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Gender:</span>
                    <div className="font-semibold">{patientData.demographics.gender}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Race/Ethnicity:</span>
                    <div className="font-semibold">{patientData.demographics.race}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <div className="font-semibold">{patientData.state}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Height:</span>
                    <div className="font-semibold">{patientData.demographics.height}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Weight:</span>
                    <div className="font-semibold">{patientData.demographics.weight}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">BMI:</span>
                    <div className="font-semibold">{patientData.bmi} kg/m²</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Primary & Secondary Diagnoses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.diagnosis.map((diagnosis, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {diagnosis}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.procedures.map((procedure, index) => (
                    <div key={index} className="p-2 border rounded">
                      {procedure}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="observations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clinical Observations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.observations.map((observation, index) => (
                    <div key={index} className="p-2 border rounded">
                      {observation}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="labs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.labs.map((lab, index) => (
                    <div key={index} className="p-2 border rounded flex justify-between">
                      <span>{lab}</span>
                      <Badge variant={lab.includes('glucose') || lab.includes('HbA1c') ? 'destructive' : 'secondary'}>
                        {lab.includes('glucose') || lab.includes('HbA1c') ? 'Elevated' : 'Normal'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.medications.map((medication, index) => (
                    <div key={index} className="p-2 border rounded">
                      {medication}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
