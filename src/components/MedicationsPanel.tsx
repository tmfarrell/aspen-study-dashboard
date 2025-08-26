import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Pill, TrendingDown, AlertTriangle, Clock, Filter } from "lucide-react";
import { mockPatients } from "@/data/patientData";

// Anti-arrhythmic medications with market usage weights
const antiArrhythmicMeds = [
  { name: "Metoprolol", weight: 0.28, class: "Beta-blocker" },
  { name: "Amiodarone", weight: 0.18, class: "Class III" },
  { name: "Diltiazem", weight: 0.12, class: "Calcium Channel Blocker" },
  { name: "Flecainide", weight: 0.10, class: "Class IC" },
  { name: "Sotalol", weight: 0.08, class: "Class III" },
  { name: "Propafenone", weight: 0.07, class: "Class IC" },
  { name: "Verapamil", weight: 0.06, class: "Calcium Channel Blocker" },
  { name: "Dronedarone", weight: 0.05, class: "Class III" },
  { name: "Digoxin", weight: 0.04, class: "Cardiac Glycoside" },
  { name: "Other", weight: 0.02, class: "Various" }
];

const discontinuationReasons = [
  "Adverse reactions/side effects",
  "Cost/insurance issues", 
  "Lack of efficacy",
  "Patient preference",
  "Drug interactions",
  "Contraindications developed",
  "Treatment completed"
];

// Generate medication data for patients
function generateMedicationData() {
  const medicationData = [];
  
  antiArrhythmicMeds.forEach(med => {
    const totalPatients = Math.round(mockPatients.length * med.weight);
    const activePatients = Math.round(totalPatients * (Math.random() * 0.3 + 0.6)); // 60-90% still active
    const discontinuedPatients = totalPatients - activePatients;
    
    // Generate discontinuation breakdown
    const discontinuationBreakdown = discontinuationReasons.map(reason => {
      let weight = Math.random();
      // Make adverse reactions more common for certain drugs
      if (reason === "Adverse reactions/side effects" && ["Amiodarone", "Digoxin"].includes(med.name)) {
        weight *= 2;
      }
      // Make cost more common for newer/expensive drugs
      if (reason === "Cost/insurance issues" && ["Dronedarone", "Flecainide"].includes(med.name)) {
        weight *= 1.5;
      }
      return { reason, weight };
    });
    
    const totalWeight = discontinuationBreakdown.reduce((sum, item) => sum + item.weight, 0);
    let remaining = discontinuedPatients;
    
    const reasonCounts = discontinuationBreakdown.map((item, index) => {
      if (index === discontinuationBreakdown.length - 1) {
        return { reason: item.reason, count: remaining };
      }
      const count = Math.round((item.weight / totalWeight) * discontinuedPatients);
      remaining -= count;
      return { reason: item.reason, count };
    });
    
    // Average treatment duration (months) - varies by drug
    const avgDuration = med.name === "Metoprolol" ? 36 : 
                       med.name === "Amiodarone" ? 24 :
                       med.name === "Digoxin" ? 48 : 
                       Math.round(Math.random() * 24 + 12);
    
    medicationData.push({
      medication: med.name,
      class: med.class,
      totalPatients,
      activePatients,
      discontinuedPatients,
      avgDuration,
      discontinuationReasons: reasonCounts
    });
  });
  
  return medicationData;
}

export function MedicationsPanel() {
  const [selectedMedication, setSelectedMedication] = useState<string>("all");
  
  const medicationData = generateMedicationData();
  
  // Filter data based on selection
  const filteredData = selectedMedication === "all" ? 
    medicationData : 
    medicationData.filter(med => med.medication === selectedMedication);
  
  // Calculate totals
  const totalPatients = medicationData.reduce((sum, med) => sum + med.totalPatients, 0);
  const totalActive = medicationData.reduce((sum, med) => sum + med.activePatients, 0);
  const totalDiscontinued = medicationData.reduce((sum, med) => sum + med.discontinuedPatients, 0);
  
  // Top medications chart data
  const topMedicationsData = medicationData
    .sort((a, b) => b.totalPatients - a.totalPatients)
    .slice(0, 8);
  
  // Discontinuation reasons aggregated
  const aggregatedReasons = discontinuationReasons.map(reason => ({
    reason: reason.length > 20 ? reason.substring(0, 17) + "..." : reason,
    count: medicationData.reduce((sum, med) => {
      const reasonData = med.discontinuationReasons.find(r => r.reason === reason);
      return sum + (reasonData?.count || 0);
    }, 0)
  })).filter(item => item.count > 0);
  
  // Treatment duration distribution
  const durationRanges = [
    { range: "0-6 months", count: 0 },
    { range: "7-12 months", count: 0 },
    { range: "13-24 months", count: 0 },
    { range: "25-36 months", count: 0 },
    { range: "37+ months", count: 0 }
  ];
  
  medicationData.forEach(med => {
    const duration = med.avgDuration;
    if (duration <= 6) durationRanges[0].count += med.totalPatients;
    else if (duration <= 12) durationRanges[1].count += med.totalPatients;
    else if (duration <= 24) durationRanges[2].count += med.totalPatients;
    else if (duration <= 36) durationRanges[3].count += med.totalPatients;
    else durationRanges[4].count += med.totalPatients;
  });
  
  // Monthly prescription trends (mock data)
  const monthlyTrends = [
    { month: "Jan", prescribed: 245, discontinued: 58 },
    { month: "Feb", prescribed: 267, discontinued: 62 },
    { month: "Mar", prescribed: 289, discontinued: 71 },
    { month: "Apr", prescribed: 252, discontinued: 55 },
    { month: "May", prescribed: 274, discontinued: 63 },
    { month: "Jun", prescribed: 298, discontinued: 69 }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Key Medication Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Patients on Medications"
          value={totalPatients.toLocaleString()}
          subtitle="Anti-arrhythmic therapy"
          icon={<Pill className="w-5 h-5" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <MetricCard
          title="Currently Active"
          value={totalActive.toLocaleString()}
          subtitle="On ongoing treatment"
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricCard
          title="Discontinued"
          value={totalDiscontinued.toLocaleString()}
          subtitle="Treatment stopped"
          icon={<TrendingDown className="w-5 h-5" />}
          trend={{ value: 12.8, isPositive: false }}
        />
        <MetricCard
          title="Average Duration"
          value={`${Math.round(medicationData.reduce((sum, med) => sum + med.avgDuration, 0) / medicationData.length)} mo`}
          subtitle="Treatment length"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Medication:</span>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            <Select value={selectedMedication} onValueChange={setSelectedMedication}>
              <SelectTrigger className="w-60">
                <Pill className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Medication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Medications</SelectItem>
                {antiArrhythmicMeds.map(med => (
                  <SelectItem key={med.name} value={med.name}>
                    {med.name} ({med.class})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedMedication("all")}
          >
            Clear Filter
          </Button>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Medications */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Most Prescribed Anti-Arrhythmic Medications</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMedicationsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                type="category" 
                dataKey="medication" 
                stroke="hsl(var(--muted-foreground))" 
                width={100}
                tick={{ fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
                formatter={(value, name) => [
                  `${value} patients`,
                  "Total Prescribed"
                ]}
              />
              <Bar dataKey="totalPatients" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Discontinuation Reasons */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Reasons for Discontinuation</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={aggregatedReasons}
                dataKey="count"
                nameKey="reason"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={20}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {aggregatedReasons.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(${index * 45 + 200}, 70%, 60%)`} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem"
                }}
                formatter={(value, name) => [
                  `${value} patients`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend below chart */}
          <div className="mt-4 grid grid-cols-1 gap-2">
            {aggregatedReasons.map((entry, index) => (
              <div key={entry.reason} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `hsl(${index * 45 + 200}, 70%, 60%)` }}
                />
                <span className="text-muted-foreground">{entry.reason}: {entry.count} patients</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Treatment Duration Distribution */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Treatment Duration Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={durationRanges}>
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
              <Bar dataKey="count" fill="hsl(var(--om1-secondary-orange-dark))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Trends */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Monthly Prescription vs Discontinuation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
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
              <Line 
                type="monotone" 
                dataKey="prescribed" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="New Prescriptions"
              />
              <Line 
                type="monotone" 
                dataKey="discontinued" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                name="Discontinuations"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Medication Table */}
      <Card className="p-6 bg-card border">
        <h3 className="text-lg font-semibold mb-4">Detailed Medication Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-muted-foreground">Medication</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Class</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Total Patients</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Currently Active</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Discontinued</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Avg Duration</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Top Discontinuation Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((med) => {
                const topReason = med.discontinuationReasons.reduce((max, reason) => 
                  reason.count > max.count ? reason : max, { reason: "N/A", count: 0 });
                
                return (
                  <tr key={med.medication} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="p-3 font-medium">{med.medication}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {med.class}
                      </Badge>
                    </td>
                    <td className="p-3 font-semibold">{med.totalPatients.toLocaleString()}</td>
                    <td className="p-3 text-success">{med.activePatients.toLocaleString()}</td>
                    <td className="p-3 text-destructive">{med.discontinuedPatients.toLocaleString()}</td>
                    <td className="p-3">{med.avgDuration} months</td>
                    <td className="p-3 text-xs">
                      {topReason.reason} ({topReason.count})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}