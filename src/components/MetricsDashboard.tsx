import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStudyMetrics } from '@/state/metrics';
import { StudyType } from '@/api/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Activity, TrendingUp, Heart } from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';

interface MetricsDashboardProps {
  studyId: StudyType;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

export function MetricsDashboard({ studyId }: MetricsDashboardProps) {
  const { data: metricsData, isLoading, error } = useStudyMetrics(studyId);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (error || !metricsData) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Failed to load metrics data</p>
        </Card>
      </div>
    );
  }

  const { metrics, totalPatients } = metricsData;

  // Get specific metrics
  const ageMetric = metrics.find(m => m.id === 'age');
  const genderMetric = metrics.find(m => m.id === 'gender');
  const bmiMetric = metrics.find(m => m.id === 'bmi');
  const statusMetric = metrics.find(m => m.id === 'status');
  const comorbidityCountMetric = metrics.find(m => m.id === 'comorbidity_count');

  // Calculate summary stats
  const averageAge = ageMetric?.type === 'numerical' ? ageMetric.average : 0;
  const activePatients = statusMetric?.type === 'categorical' 
    ? statusMetric.data.find(d => d.category === 'active')?.count || 0 
    : 0;
  const averageBMI = bmiMetric?.type === 'numerical' ? bmiMetric.average : 0;
  const averageComorbidities = comorbidityCountMetric?.type === 'numerical' 
    ? comorbidityCountMetric.average 
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Patients"
          value={totalPatients.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Active Patients"
          value={activePatients.toLocaleString()}
          subtitle={`${((activePatients / totalPatients) * 100).toFixed(1)}% of total`}
          icon={<Activity className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <MetricCard
          title="Average Age"
          value={`${averageAge.toFixed(1)} years`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Average BMI"
          value={averageBMI.toFixed(1)}
          subtitle={`${averageComorbidities.toFixed(1)} avg comorbidities`}
          icon={<Heart className="w-5 h-5" />}
        />
      </div>

      {/* Metrics Tabs */}
      <Tabs defaultValue="demographics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="clinical">Clinical</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            {ageMetric?.type === 'numerical' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageMetric.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bucket" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Patients']}
                        labelFormatter={(label) => `Age: ${label}`}
                      />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Gender Distribution */}
            {genderMetric?.type === 'categorical' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderMetric.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {genderMetric.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [value, 'Patients']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* BMI Distribution */}
            {bmiMetric?.type === 'numerical' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">BMI Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bmiMetric.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bucket" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Patients']}
                        labelFormatter={(label) => `BMI: ${label}`}
                      />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Comorbidity Count */}
            {comorbidityCountMetric?.type === 'numerical' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Comorbidity Count</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comorbidityCountMetric.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bucket" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Patients']}
                        labelFormatter={(label) => `Comorbidities: ${label}`}
                      />
                      <Bar dataKey="count" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          {/* Patient Status */}
          {statusMetric?.type === 'categorical' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Patient Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusMetric.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {statusMetric.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Patients']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}