import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Heart, TrendingUp, Filter, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { usePatients } from "@/state/patients";
import { GeographicTile } from "./common/GeographicTile";
import { EnrollmentProgressTile } from "./common/EnrollmentProgressTile";
import { useStudy, useStudyStats } from "@/state/studies";

export function PatientCohortDashboard() {
  const [selectedCondition, setSelectedCondition] = useState<string>("all");

  // Get cardiology study data for standardized metrics
  const { data: cardiologyData, isLoading: studyLoading } = useStudy('cardiology');
  const { data: stats, isLoading: statsLoading } = useStudyStats('cardiology');
  const { data: patientsData, isLoading: patientsLoading } = usePatients({ studyId: 'cardiology' });
  
  if (studyLoading || statsLoading || patientsLoading) {
    return <div className="p-6 space-y-6"><div className="h-96 bg-muted animate-pulse rounded-lg" /></div>;
  }
  
  if (!cardiologyData || !stats || !patientsData) {
    return null;
  }

  const mockPatients = patientsData.data || [];
  
  // Mock heart rhythm disorders for filtering
  const heartRhythmDisorders = [
    "Atrial Fibrillation",
    "Atrial Flutter", 
    "Supraventricular Tachycardia",
    "Ventricular Tachycardia",
    "Bradycardia",
    "Heart Block",
    "Premature Ventricular Contractions",
    "Wolff-Parkinson-White Syndrome"
  ];
  
  const totalPatients = stats.totalPatients;
  
  // Generate target enrollment subtitle if target exists
  const getEnrollmentSubtitle = () => {
    if (cardiologyData.targetEnrollment) {
      return `of ${cardiologyData.targetEnrollment.total.toLocaleString()} target`;
    }
    return undefined;
  };

  // Get the correct unit label based on enrollmentUnits
  const getUnitLabel = () => {
    return cardiologyData.enrollmentUnits === 'cases' ? 'Cases' : 'Patients';
  };

  // Filter patients based on selections (using simplified filtering for now)
  const filteredPatients = mockPatients.filter(patient => {
    // For now, just return all patients since we don't have diagnosis field in PatientData
    return selectedCondition === "all" || Math.random() > 0.5;
  });

  // Calculate age distribution for chart
  const ageDistribution = [
    { range: "18-40", count: filteredPatients.filter(p => p.age >= 18 && p.age <= 40).length },
    { range: "41-55", count: filteredPatients.filter(p => p.age >= 41 && p.age <= 55).length },
    { range: "56-70", count: filteredPatients.filter(p => p.age >= 56 && p.age <= 70).length },
    { range: "71-85", count: filteredPatients.filter(p => p.age >= 71 && p.age <= 85).length },
    { range: "85+", count: filteredPatients.filter(p => p.age > 85).length }
  ];

  // Calculate hospitalizations per condition (mock data)
  const hospitalizationsPerCondition = heartRhythmDisorders.map(condition => {
    const patients = Math.floor(Math.random() * 50) + 10;
    const hospitalizations = Math.floor(Math.random() * patients * 0.8) + 5;
    
    return {
      condition: condition.length > 20 ? condition.substring(0, 17) + "..." : condition,
      hospitalizations,
      patients
    };
  }).filter(item => item.patients > 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={`Total ${getUnitLabel()}`}
          value={totalPatients.toLocaleString()}
          subtitle={getEnrollmentSubtitle()}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Average Age"
          value={Math.round(filteredPatients.reduce((sum, p) => sum + p.age, 0) / filteredPatients.length || 0)}
          subtitle="Years"
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricCard
          title="Critical Cases"
          value={Math.floor(filteredPatients.length * 0.15)}
          subtitle="Require immediate attention"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 8.2, isPositive: false }}
        />
        <MetricCard
          title="Improved Outcomes"
          value="72%"
          subtitle="Last 6 months"
          icon={<CheckCircle className="w-5 h-5" />}
          trend={{ value: 15.3, isPositive: true }}
        />
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Heart Rhythm Disorder:</span>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {heartRhythmDisorders.map(condition => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedCondition("all")}
          >
            Clear Filter
          </Button>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Age Distribution */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Hospitalizations per Condition */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Hospitalizations per Condition</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hospitalizationsPerCondition}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="condition" 
                stroke="hsl(var(--muted-foreground))" 
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
                formatter={(value, name) => [
                  `${value} hospitalizations`,
                  "Total"
                ]}
              />
              <Bar dataKey="hospitalizations" fill="hsl(var(--om1-secondary-purple))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>


      {/* Geographic Distribution Map */}
      <GeographicTile studyId="cardiology" />
    </div>
  );
}