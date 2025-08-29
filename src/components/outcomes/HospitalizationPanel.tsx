import React from 'react';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Clock, TrendingUp } from 'lucide-react';
import { useHospitalizationOutcomes } from '@/state/outcomes/queries';
import { StudyType } from '@/api/types';

interface HospitalizationPanelProps {
  studyId: StudyType;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export const HospitalizationPanel = ({ studyId }: HospitalizationPanelProps) => {
  const { data: hospitalizations, isLoading } = useHospitalizationOutcomes(studyId);

  if (isLoading) {
    return <div className="h-96 bg-muted animate-pulse rounded-lg" />;
  }

  if (!hospitalizations || hospitalizations.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Hospitalization Outcomes</h3>
        <p className="text-muted-foreground">No hospitalization data available for this study.</p>
      </Card>
    );
  }

  // Calculate metrics
  const totalHospitalizations = hospitalizations.length;
  const readmissions = hospitalizations.filter(h => h.readmission_30_days).length;
  const readmissionRate = totalHospitalizations > 0 ? (readmissions / totalHospitalizations * 100) : 0;
  const avgLengthOfStay = hospitalizations.reduce((sum, h) => sum + (h.length_of_stay_days || 0), 0) / (totalHospitalizations || 1);

  // Admission type distribution
  const admissionTypeData = hospitalizations.reduce((acc, h) => {
    const type = h.admission_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const admissionChartData = Object.entries(admissionTypeData).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: ((count / (totalHospitalizations || 1)) * 100).toFixed(1)
  }));

  // Primary diagnosis distribution
  const diagnosisData = hospitalizations.reduce((acc, h) => {
    const diagnosis = h.primary_diagnosis;
    acc[diagnosis] = (acc[diagnosis] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDiagnoses = Object.entries(diagnosisData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([diagnosis, count]) => ({
      diagnosis: diagnosis.length > 30 ? diagnosis.substring(0, 30) + '...' : diagnosis,
      count,
      percentage: ((count / (totalHospitalizations || 1)) * 100).toFixed(1)
    }));

  // Length of stay distribution
  const lengthOfStayData = hospitalizations.reduce((acc, h) => {
    const days = h.length_of_stay_days || 0;
    let range;
    if (days <= 1) range = '≤1 day';
    else if (days <= 3) range = '2-3 days';
    else if (days <= 7) range = '4-7 days';
    else if (days <= 14) range = '8-14 days';
    else range = '>14 days';
    
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lengthOfStayChartData = Object.entries(lengthOfStayData).map(([range, count]) => ({
    range,
    count,
    percentage: ((count / (totalHospitalizations || 1)) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Hospitalization Outcomes</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Hospitalizations"
          value={totalHospitalizations}
          icon={<Activity className="w-4 h-4" />}
        />
        <MetricCard
          title="30-Day Readmission Rate"
          value={`${readmissionRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={{ value: readmissionRate, isPositive: false }}
        />
        <MetricCard
          title="Average Length of Stay"
          value={`${avgLengthOfStay.toFixed(1)} days`}
          icon={<Clock className="w-4 h-4" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admission Type Distribution */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Admission Type Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={admissionChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percentage }) => `${type}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {admissionChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Length of Stay Distribution */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Length of Stay Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lengthOfStayChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`${value} hospitalizations`, 'Count']}
                labelFormatter={(label) => `Length of Stay: ${label}`}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Primary Diagnoses */}
        <Card className="p-6 lg:col-span-2">
          <h4 className="text-lg font-semibold mb-4">Top Primary Diagnoses</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topDiagnoses} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="diagnosis" type="category" width={150} />
              <Tooltip 
                formatter={(value, name) => [`${value} cases`, 'Count']}
                labelFormatter={(label) => `Diagnosis: ${label}`}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};