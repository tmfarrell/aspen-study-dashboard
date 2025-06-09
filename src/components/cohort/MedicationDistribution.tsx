
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MedicationDistribution = ({ detailed = false }: { detailed?: boolean }) => {
  // Mock data for medication distribution
  const medicationData = [
    { name: 'Semaglutide', patients: 2800, percentage: 28, category: 'GLP-1 Agonist' },
    { name: 'Liraglutide', patients: 2200, percentage: 22, category: 'GLP-1 Agonist' },
    { name: 'Orlistat', patients: 1800, percentage: 18, category: 'Lipase Inhibitor' },
    { name: 'Naltrexone-Bupropion', patients: 1500, percentage: 15, category: 'Combination' },
    { name: 'Phentermine', patients: 1200, percentage: 12, category: 'Appetite Suppressant' },
    { name: 'Other/None', patients: 500, percentage: 5, category: 'Other' }
  ];

  const categoryData = [
    { category: 'GLP-1 Agonist', patients: 5000, percentage: 50, color: '#8884d8' },
    { category: 'Lipase Inhibitor', patients: 1800, percentage: 18, color: '#82ca9d' },
    { category: 'Combination', patients: 1500, percentage: 15, color: '#ffc658' },
    { category: 'Appetite Suppressant', patients: 1200, percentage: 12, color: '#ff7300' },
    { category: 'Other', patients: 500, percentage: 5, color: '#d084d0' }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medication Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={medicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="patients" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {detailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Medication Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="patients"
                      label={({ category, percentage }) => `${category}: ${percentage}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicationData.map((med, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-muted-foreground">{med.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{med.patients.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{med.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MedicationDistribution;
