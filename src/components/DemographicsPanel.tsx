import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, MapPin, Heart, Users, PieChart } from "lucide-react";
import { mockPatients, stateStatistics, heartRhythmDisorders, Patient } from "@/data/patientData";
import { PatientChartModal } from "./PatientChartModal";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function DemographicsPanel() {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  
  // Separate filters for charts
  const [genderChartCondition, setGenderChartCondition] = useState<string>("all");
  const [ethnicityChartCondition, setEthnicityChartCondition] = useState<string>("all");

  // Filter patients based on selections
  const filteredPatients = mockPatients.filter(patient => {
    const matchesState = selectedState === "all" || patient.state === selectedState;
    const matchesCondition = selectedCondition === "all" || patient.diagnosis === selectedCondition;
    const matchesSearch = searchTerm === "" || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesState && matchesCondition && matchesSearch;
  });

  const severityColors = {
    Low: "#10b981",
    Moderate: "#f59e0b", 
    High: "#ef4444",
    Critical: "#7c2d12"
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };

  // Chart data calculations
  const genderChartData = useMemo(() => {
    const patients = genderChartCondition === "all" 
      ? mockPatients 
      : mockPatients.filter(p => p.diagnosis === genderChartCondition);
    
    const genderCounts = patients.reduce((acc, patient) => {
      acc[patient.gender] = (acc[patient.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(genderCounts).map(([gender, count]) => ({
      name: gender,
      value: count,
      percentage: ((count / patients.length) * 100).toFixed(1)
    }));
  }, [genderChartCondition]);

  const ethnicityChartData = useMemo(() => {
    const patients = ethnicityChartCondition === "all" 
      ? mockPatients 
      : mockPatients.filter(p => p.diagnosis === ethnicityChartCondition);
    
    const ethnicityCounts = patients.reduce((acc, patient) => {
      acc[patient.ethnicity] = (acc[patient.ethnicity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(ethnicityCounts)
      .map(([ethnicity, count]) => ({
        name: ethnicity,
        count,
        percentage: ((count / patients.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }, [ethnicityChartCondition]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Demographics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution Chart */}
        <Card className="p-6 bg-card border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Gender Distribution</h3>
            </div>
            <Select value={genderChartCondition} onValueChange={setGenderChartCondition}>
              <SelectTrigger className="w-48">
                <Heart className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by disorder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Disorders</SelectItem>
                {heartRhythmDisorders.map(condition => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={genderChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Patients']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Race/Ethnicity Distribution Chart */}
        <Card className="p-6 bg-card border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Race/Ethnicity Distribution</h3>
            </div>
            <Select value={ethnicityChartCondition} onValueChange={setEthnicityChartCondition}>
              <SelectTrigger className="w-48">
                <Heart className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by disorder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Disorders</SelectItem>
                {heartRhythmDisorders.map(condition => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ethnicityChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Patients']}
                  labelFormatter={(label) => `Ethnicity: ${label}`}
                />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      {/* Filters */}
      <Card className="p-4 bg-card border">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {stateStatistics.slice(0, 15).map(stat => (
                  <SelectItem key={stat.state} value={stat.state}>
                    {stat.state} ({stat.patientCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-60">
                <Heart className="w-4 h-4 mr-2" />
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

            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedState("all");
              setSelectedCondition("all");
              setSearchTerm("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Patient Demographics Table */}
      <Card className="p-6 bg-card border">
        <h3 className="text-lg font-semibold mb-4">
          Anonymized Patient Registry ({filteredPatients.length.toLocaleString()} patients)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-muted-foreground">Patient ID</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Age</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Gender</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Condition</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Severity</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Risk Score</th>
                <th className="text-left p-3 font-medium text-muted-foreground">State</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Last Visit</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.slice(0, 50).map((patient) => (
                <tr 
                  key={patient.id} 
                  className="border-b border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handlePatientClick(patient)}
                >
                  <td className="p-3 font-mono text-xs">{patient.id}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3 text-xs">{patient.diagnosis}</td>
                  <td className="p-3">
                    <Badge 
                      variant="outline" 
                      style={{ 
                        borderColor: severityColors[patient.severity],
                        color: severityColors[patient.severity]
                      }}
                    >
                      {patient.severity}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <span className={`font-semibold ${
                      patient.riskScore > 80 ? 'text-destructive' :
                      patient.riskScore > 60 ? 'text-warning' :
                      'text-success'
                    }`}>
                      {patient.riskScore}
                    </span>
                  </td>
                  <td className="p-3">{patient.state}</td>
                  <td className="p-3 text-xs">{patient.lastVisit}</td>
                  <td className="p-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePatientClick(patient);
                      }}
                    >
                      View Chart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length > 50 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Showing first 50 patients. Use filters to narrow results.
              </p>
            </div>
          )}
        </div>
      </Card>

      <PatientChartModal
        patient={selectedPatient}
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
      />
    </div>
  );
}