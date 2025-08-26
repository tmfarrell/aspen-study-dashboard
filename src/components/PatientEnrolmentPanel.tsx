import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, TrendingUp, Calendar, UserPlus } from "lucide-react";
import { mockPatients, heartRhythmDisorders } from "@/data/patientData";
import { useState } from "react";

export function PatientEnrolmentPanel() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("12months");

  // Calculate enrollment statistics
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const twelveMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  const patientsLastMonth = mockPatients.filter(p => {
    const visitDate = new Date(p.lastVisit);
    return visitDate >= oneMonthAgo;
  });

  const patientsLast12Months = mockPatients.filter(p => {
    const visitDate = new Date(p.lastVisit);
    return visitDate >= twelveMonthsAgo;
  });

  // Patients per heart rhythm disorder
  const patientsPerDisorder = heartRhythmDisorders.map(disorder => {
    const totalCount = mockPatients.filter(p => p.diagnosis === disorder).length;
    const lastMonthCount = patientsLastMonth.filter(p => p.diagnosis === disorder).length;
    const last12MonthsCount = patientsLast12Months.filter(p => p.diagnosis === disorder).length;
    
    return {
      disorder: disorder.length > 15 ? disorder.replace(/\s+/g, '\n') : disorder,
      count: totalCount,
      lastMonth: lastMonthCount,
      last12Months: last12MonthsCount
    };
  }).filter(item => item.count > 0); // Only show disorders with patients

  // Monthly enrollment trend over 12 months
  const monthlyEnrollment = [];
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
    
    const monthlyPatients = mockPatients.filter(p => {
      const visitDate = new Date(p.lastVisit);
      return visitDate >= monthStart && visitDate <= monthEnd;
    });

    monthlyEnrollment.push({
      month: monthName,
      enrolled: monthlyPatients.length,
      afib: monthlyPatients.filter(p => p.diagnosis === "Atrial Fibrillation").length,
      vtach: monthlyPatients.filter(p => p.diagnosis === "Ventricular Tachycardia").length
    });
  }

  // Average calculations
  const avgNewPatientsPerMonth = Math.round(patientsLast12Months.length / 12);
  const avgPerDisorderLastMonth = Math.round(patientsLastMonth.length / heartRhythmDisorders.length);
  const avgPerDisorderLast12Months = Math.round(patientsLast12Months.length / heartRhythmDisorders.length);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Key Enrollment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="New Patients (Past Month)"
          value={patientsLastMonth.length.toLocaleString()}
          subtitle="Recently enrolled"
          icon={<UserPlus className="w-5 h-5" />}
          trend={{ value: 18.5, isPositive: true }}
        />
        <MetricCard
          title="New Patients (Past 12 Months)"
          value={patientsLast12Months.length.toLocaleString()}
          subtitle="Annual enrollment"
          icon={<Calendar className="w-5 h-5" />}
          trend={{ value: 24.3, isPositive: true }}
        />
        <MetricCard
          title="Average Monthly Enrollment"
          value={avgNewPatientsPerMonth}
          subtitle="Patients per month"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Total Registry Size"
          value={mockPatients.length.toLocaleString()}
          subtitle="All enrolled patients"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Enrollment Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Enrollment Trend */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Monthly Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyEnrollment}>
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
                dataKey="enrolled" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Patients per Disorder */}
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Patients per Condition</h3>
          {patientsPerDisorder.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={patientsPerDisorder
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 6)
                } 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  type="category" 
                  dataKey="disorder" 
                  stroke="hsl(var(--muted-foreground))" 
                  width={140}
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                  formatter={(value, name) => [value, 'Patient Count']}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[0, 4, 4, 0]} 
                  stroke="#1e40af"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <p>No patient data available for chart display</p>
            </div>
          )}
        </Card>
      </div>

      {/* Detailed Enrollment Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Average New Patients per Condition</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Past Month</span>
              <span className="text-2xl font-bold text-foreground">{avgPerDisorderLastMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Past 12 Months</span>
              <span className="text-2xl font-bold text-foreground">{avgPerDisorderLast12Months}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Average enrollment per condition
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Top Enrolling Conditions</h3>
          <div className="space-y-3">
            {patientsPerDisorder
              .sort((a, b) => b.last12Months - a.last12Months)
              .slice(0, 4)
              .map((disorder, index) => (
                <div key={disorder.disorder} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{disorder.disorder.replace('\n', ' ')}</p>
                    <p className="text-xs text-muted-foreground">Past 12 months</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{disorder.last12Months}</span>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Recent Enrollment Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-lg font-bold text-success">{Math.round(patientsLastMonth.length / 4)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-lg font-bold text-primary">{patientsLastMonth.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Daily Average</span>
              <span className="text-lg font-bold text-success">{Math.round(patientsLastMonth.length / 30)}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Enrollment velocity indicators
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}