import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient } from "@/data/patientData";
import { User, Heart, Pill, TestTube, Stethoscope } from "lucide-react";

interface PatientChartModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock detailed patient data
const generatePatientChart = (patient: Patient) => {
  const procedures = [
    "ECG - 12 Lead", "Echocardiogram", "Holter Monitor", "Cardiac Catheterization",
    "Electrophysiology Study", "Cardioversion", "Ablation Therapy", "Pacemaker Implant"
  ];
  
  const medications = [
    "Metoprolol 50mg BID", "Warfarin 5mg QD", "Amiodarone 200mg QD", 
    "Lisinopril 10mg QD", "Atorvastatin 40mg QHS", "Aspirin 81mg QD"
  ];
  
  const labs = [
    { name: "INR", value: "2.3", range: "2.0-3.0", status: "Normal" },
    { name: "BNP", value: "145", range: "<100", status: "Abnormal" },
    { name: "Troponin I", value: "0.02", range: "<0.04", status: "Normal" },
    { name: "Creatinine", value: "1.1", range: "0.6-1.2", status: "Normal" },
    { name: "Potassium", value: "4.2", range: "3.5-5.0", status: "Normal" },
    { name: "Magnesium", value: "1.8", range: "1.7-2.2", status: "Normal" }
  ];
  
  return {
    procedures: procedures.slice(0, Math.floor(Math.random() * 4) + 2),
    medications: medications.slice(0, Math.floor(Math.random() * 3) + 2),
    labs
  };
};

export function PatientChartModal({ patient, isOpen, onClose }: PatientChartModalProps) {
  if (!patient) return null;
  
  const chart = generatePatientChart(patient);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Anonymized Patient Chart - {patient.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Patient Demographics */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Demographics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <div className="font-medium">{patient.age} years</div>
              </div>
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <div className="font-medium">{patient.gender}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <div className="font-medium">{patient.city}, {patient.state}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Risk Score:</span>
                <div className="font-medium">
                  <Badge variant={patient.riskScore > 70 ? "destructive" : patient.riskScore > 50 ? "secondary" : "default"}>
                    {patient.riskScore}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Diagnosis */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Primary Diagnosis
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {patient.diagnosis}
                </Badge>
                <Badge variant={
                  patient.severity === "Critical" ? "destructive" :
                  patient.severity === "High" ? "secondary" :
                  patient.severity === "Moderate" ? "outline" : "default"
                }>
                  {patient.severity} Severity
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Outcome:</span> 
                <Badge variant={
                  patient.outcome === "Improved" ? "default" :
                  patient.outcome === "Stable" ? "secondary" :
                  patient.outcome === "Declined" ? "destructive" : "outline"
                } className="ml-2">
                  {patient.outcome}
                </Badge>
              </p>
            </div>
          </Card>
          
          {/* Procedures */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Procedures & Tests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {chart.procedures.map((procedure, index) => (
                <div key={index} className="text-sm p-2 bg-accent/50 rounded">
                  {procedure}
                </div>
              ))}
            </div>
          </Card>
          
          {/* Lab Results */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Laboratory Results
            </h3>
            <div className="space-y-2">
              {chart.labs.map((lab, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-accent/30 rounded text-sm">
                  <span className="font-medium">{lab.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{lab.value}</span>
                    <span className="text-muted-foreground">({lab.range})</span>
                    <Badge variant={lab.status === "Normal" ? "default" : "destructive"} className="text-xs">
                      {lab.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Medications */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Current Medications
            </h3>
            <div className="space-y-2">
              {chart.medications.map((medication, index) => (
                <div key={index} className="text-sm p-2 bg-accent/50 rounded">
                  {medication}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}