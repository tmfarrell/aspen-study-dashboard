
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ComorbidityDistribution = () => {
  const comorbidityData = [
    { condition: 'Type 2 Diabetes', patients: 4800, percentage: 48, avgDiagnosisAge: 45 },
    { condition: 'Hypertension', patients: 6200, percentage: 62, avgDiagnosisAge: 42 },
    { condition: 'Sleep Apnea', patients: 3500, percentage: 35, avgDiagnosisAge: 47 },
    { condition: 'Dyslipidemia', patients: 5400, percentage: 54, avgDiagnosisAge: 43 },
    { condition: 'NAFLD', patients: 2800, percentage: 28, avgDiagnosisAge: 49 },
    { condition: 'Depression', patients: 2200, percentage: 22, avgDiagnosisAge: 38 },
    { condition: 'Osteoarthritis', patients: 3100, percentage: 31, avgDiagnosisAge: 52 },
    { condition: 'GERD', patients: 1800, percentage: 18, avgDiagnosisAge: 44 }
  ];

  // Mock time distribution data (years since first diagnosis)
  const timeDistributionData = [
    { years: '0-1', count: 1200 },
    { years: '2-3', count: 1800 },
    { years: '4-5', count: 2200 },
    { years: '6-7', count: 1900 },
    { years: '8-10', count: 1600 },
    { years: '11-15', count: 1000 },
    { years: '16+', count: 300 }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
    },
    count: {
      label: "Count",
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comorbidity Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Common comorbidities among obesity patients
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="distribution" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="diagnosis-age">Diagnosis Age</TabsTrigger>
              <TabsTrigger value="time-distribution">Time Distribution</TabsTrigger>
            </TabsList>

            <TabsContent value="distribution" className="space-y-6">
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comorbidityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="condition" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="patients" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comorbidityData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {item.percentage}%
                        </div>
                        <div className="text-sm font-medium">{item.condition}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.patients.toLocaleString()} patients
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="diagnosis-age" className="space-y-6">
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comorbidityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="condition" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Avg Diagnosis Age"]}
                    />
                    <Bar dataKey="avgDiagnosisAge" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="space-y-4">
                <h4 className="font-semibold">Average Age at First Diagnosis</h4>
                {comorbidityData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{item.condition}</span>
                    <span className="text-lg font-bold text-primary">{item.avgDiagnosisAge} years</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="time-distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Time Since First Comorbidity Diagnosis</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Distribution of patients by years since first comorbidity diagnosis
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="years" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeDistributionData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">
                          {item.count.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.years} years</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComorbidityDistribution;
