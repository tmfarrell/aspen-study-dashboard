import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Heart, Activity, AlertTriangle, TrendingDown, Filter } from "lucide-react";
import { usePatients } from "@/state/patients";

export function AFibPanel() {
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("12months");
  const { data: patientsData, isLoading } = usePatients({ studyId: 'cardiology' });

  if (isLoading) {
    return <div className="p-6"><div className="h-96 bg-muted animate-pulse rounded-lg" /></div>;
  }

  const mockPatients = patientsData?.data || [];
  
  // Filter AFib patients (mock filtering since we don't have diagnosis field)
  const afibPatients = mockPatients.filter(() => Math.random() > 0.65); // Simulate AFib subset
  
  // Mock predictive events data based on age and BMI
  const generatePredictiveEvents = (patients: typeof afibPatients) => {
    return patients.map(patient => {
      // Calculate mock risk score based on age and BMI
      const riskScore = Math.min(100, (patient.age - 30) * 1.5 + (patient.bmi - 20) * 2);
      const baseStrokeRisk = riskScore > 70 ? 0.15 : riskScore > 50 ? 0.08 : 0.03;
      const baseMIRisk = riskScore > 75 ? 0.12 : riskScore > 55 ? 0.06 : 0.02;
      const baseMortalityRisk = riskScore > 80 ? 0.10 : riskScore > 60 ? 0.04 : 0.01;
      
      // Age factor
      const ageFactor = patient.age > 75 ? 1.5 : patient.age > 65 ? 1.2 : 1.0;
      
      return {
        ...patient,
        riskScore: Math.round(riskScore),
        severity: riskScore > 70 ? 'Critical' : riskScore > 50 ? 'High' : 'Moderate',
        strokeRisk: Math.min(0.95, baseStrokeRisk * ageFactor),
        miRisk: Math.min(0.95, baseMIRisk * ageFactor),
        mortalityRisk: Math.min(0.95, baseMortalityRisk * ageFactor),
        hasStroke: Math.random() < baseStrokeRisk * ageFactor,
        hasMI: Math.random() < baseMIRisk * ageFactor,
        hasMortality: Math.random() < baseMortalityRisk * ageFactor
      };
    });
  };

  const afibPatientsWithEvents = generatePredictiveEvents(afibPatients);

  // Calculate event statistics
  const strokePatients = afibPatientsWithEvents.filter(p => p.hasStroke).length;
  const miPatients = afibPatientsWithEvents.filter(p => p.hasMI).length;
  const mortalityPatients = afibPatientsWithEvents.filter(p => p.hasMortality).length;

  // Filter patients based on selected event
  const filteredPatients = selectedEvent === "all" ? afibPatientsWithEvents :
    selectedEvent === "stroke" ? afibPatientsWithEvents.filter(p => p.hasStroke) :
    selectedEvent === "mi" ? afibPatientsWithEvents.filter(p => p.hasMI) :
    afibPatientsWithEvents.filter(p => p.hasMortality);

  // Risk distribution data
  const riskDistribution = [
    { 
      range: "Low Risk (0-30)", 
      count: afibPatientsWithEvents.filter(p => p.riskScore <= 30).length,
      stroke: afibPatientsWithEvents.filter(p => p.riskScore <= 30 && p.hasStroke).length,
      mi: afibPatientsWithEvents.filter(p => p.riskScore <= 30 && p.hasMI).length
    },
    { 
      range: "Moderate Risk (31-60)", 
      count: afibPatientsWithEvents.filter(p => p.riskScore > 30 && p.riskScore <= 60).length,
      stroke: afibPatientsWithEvents.filter(p => p.riskScore > 30 && p.riskScore <= 60 && p.hasStroke).length,
      mi: afibPatientsWithEvents.filter(p => p.riskScore > 30 && p.riskScore <= 60 && p.hasMI).length
    },
    { 
      range: "High Risk (61-80)", 
      count: afibPatientsWithEvents.filter(p => p.riskScore > 60 && p.riskScore <= 80).length,
      stroke: afibPatientsWithEvents.filter(p => p.riskScore > 60 && p.riskScore <= 80 && p.hasStroke).length,
      mi: afibPatientsWithEvents.filter(p => p.riskScore > 60 && p.riskScore <= 80 && p.hasMI).length
    },
    { 
      range: "Critical Risk (81-100)", 
      count: afibPatientsWithEvents.filter(p => p.riskScore > 80).length,
      stroke: afibPatientsWithEvents.filter(p => p.riskScore > 80 && p.hasStroke).length,
      mi: afibPatientsWithEvents.filter(p => p.riskScore > 80 && p.hasMI).length
    }
  ];

  // Event distribution pie chart
  const eventDistribution = [
    { name: "Stroke", value: strokePatients, fill: "hsl(var(--destructive))" },
    { name: "MI", value: miPatients, fill: "hsl(var(--warning))" },
    { name: "Mortality", value: mortalityPatients, fill: "hsl(var(--secondary))" },
    { name: "No Events", value: afibPatients.length - strokePatients - miPatients - mortalityPatients, fill: "hsl(var(--success))" }
  ];

  // Monthly trend data (mock)
  const monthlyTrend = [
    { month: "Jan", stroke: 12, mi: 8, mortality: 5 },
    { month: "Feb", stroke: 15, mi: 10, mortality: 7 },
    { month: "Mar", stroke: 18, mi: 12, mortality: 6 },
    { month: "Apr", stroke: 14, mi: 9, mortality: 4 },
    { month: "May", stroke: 16, mi: 11, mortality: 8 },
    { month: "Jun", stroke: 13, mi: 7, mortality: 3 }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* AFib Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total AFib Patients"
          value={afibPatients.length.toLocaleString()}
          subtitle="In registry"
          icon={<Heart className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <MetricCard
          title="Stroke Events"
          value={strokePatients}
          subtitle="Predicted/Observed"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 12.1, isPositive: false }}
        />
        <MetricCard
          title="MI Events"
          value={miPatients}
          subtitle="Myocardial Infarction"
          icon={<Activity className="w-5 h-5" />}
          trend={{ value: 5.7, isPositive: false }}
        />
        <MetricCard
          title="Mortality Events"
          value={mortalityPatients}
          subtitle="Predicted risk"
          icon={<TrendingDown className="w-5 h-5" />}
          trend={{ value: 3.2, isPositive: false }}
        />
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Event:</span>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="stroke">Stroke Events</SelectItem>
                <SelectItem value="mi">MI Events</SelectItem>
                <SelectItem value="mortality">Mortality Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
                <SelectItem value="24months">24 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedEvent("all");
              setSelectedTimeframe("12months");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution & Events</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="range" 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="stroke" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="mi" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Event Distribution */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">AFib Event Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value, percent }) => 
                  `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                }
                labelLine={false}
              >
                {eventDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Event Trends */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Monthly Event Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
              />
              <Line type="monotone" dataKey="stroke" stroke="hsl(var(--destructive))" strokeWidth={2} />
              <Line type="monotone" dataKey="mi" stroke="hsl(var(--warning))" strokeWidth={2} />
              <Line type="monotone" dataKey="mortality" stroke="hsl(var(--secondary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* High-Risk AFib Patients */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">High-Risk AFib Patients</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {filteredPatients
              .filter(p => p.riskScore > 70)
              .slice(0, 8)
              .map((patient) => (
                <div key={patient.id} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Patient {patient.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Age {patient.age}, {patient.severity} Risk
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 mb-1">
                      {patient.hasStroke && <Badge variant="destructive" className="text-xs">Stroke</Badge>}
                      {patient.hasMI && <Badge variant="outline" className="text-xs">MI</Badge>}
                      {patient.hasMortality && <Badge variant="secondary" className="text-xs">Mortality</Badge>}
                    </div>
                    <span className="text-sm font-bold text-destructive">{patient.riskScore}%</span>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}