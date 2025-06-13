
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ComorbidityDistribution = () => {
  const [selectedComorbidity, setSelectedComorbidity] = useState('all');

  const comorbidityData = [
    { condition: 'Type 2 Diabetes', patients: 4800, percentage: 48, avgDiagnosisAge: 45, q1: 38, q3: 52, min: 22, max: 72 },
    { condition: 'Hypertension', patients: 6200, percentage: 62, avgDiagnosisAge: 42, q1: 35, q3: 49, min: 18, max: 75 },
    { condition: 'Sleep Apnea', patients: 3500, percentage: 35, avgDiagnosisAge: 47, q1: 40, q3: 54, min: 25, max: 68 },
    { condition: 'Dyslipidemia', patients: 5400, percentage: 54, avgDiagnosisAge: 43, q1: 36, q3: 50, min: 20, max: 70 },
    { condition: 'NAFLD', patients: 2800, percentage: 28, avgDiagnosisAge: 49, q1: 42, q3: 56, min: 28, max: 73 },
    { condition: 'Depression', patients: 2200, percentage: 22, avgDiagnosisAge: 38, q1: 30, q3: 46, min: 16, max: 65 },
    { condition: 'Osteoarthritis', patients: 3100, percentage: 31, avgDiagnosisAge: 52, q1: 45, q3: 59, min: 30, max: 78 },
    { condition: 'GERD', patients: 1800, percentage: 18, avgDiagnosisAge: 44, q1: 37, q3: 51, min: 24, max: 69 }
  ];

  // Time distribution data by comorbidity
  const timeDistributionData = {
    all: [
      { years: '0-1', count: 1200 },
      { years: '2-3', count: 1800 },
      { years: '4-5', count: 2200 },
      { years: '6-7', count: 1900 },
      { years: '8-10', count: 1600 },
      { years: '11-15', count: 1000 },
      { years: '16+', count: 300 }
    ],
    'Type 2 Diabetes': [
      { years: '0-1', count: 580 },
      { years: '2-3', count: 860 },
      { years: '4-5', count: 1050 },
      { years: '6-7', count: 920 },
      { years: '8-10', count: 770 },
      { years: '11-15', count: 480 },
      { years: '16+', count: 140 }
    ],
    'Hypertension': [
      { years: '0-1', count: 740 },
      { years: '2-3', count: 1115 },
      { years: '4-5', count: 1364 },
      { years: '6-7', count: 1178 },
      { years: '8-10', count: 992 },
      { years: '11-15', count: 620 },
      { years: '16+', count: 186 }
    ],
    'Sleep Apnea': [
      { years: '0-1', count: 420 },
      { years: '2-3', count: 630 },
      { years: '4-5', count: 770 },
      { years: '6-7', count: 665 },
      { years: '8-10', count: 560 },
      { years: '11-15', count: 350 },
      { years: '16+', count: 105 }
    ],
    'Dyslipidemia': [
      { years: '0-1', count: 648 },
      { years: '2-3', count: 972 },
      { years: '4-5', count: 1188 },
      { years: '6-7', count: 1026 },
      { years: '8-10', count: 864 },
      { years: '11-15', count: 540 },
      { years: '16+', count: 162 }
    ],
    'NAFLD': [
      { years: '0-1', count: 336 },
      { years: '2-3', count: 504 },
      { years: '4-5', count: 616 },
      { years: '6-7', count: 532 },
      { years: '8-10', count: 448 },
      { years: '11-15', count: 280 },
      { years: '16+', count: 84 }
    ],
    'Depression': [
      { years: '0-1', count: 264 },
      { years: '2-3', count: 396 },
      { years: '4-5', count: 484 },
      { years: '6-7', count: 418 },
      { years: '8-10', count: 352 },
      { years: '11-15', count: 220 },
      { years: '16+', count: 66 }
    ],
    'Osteoarthritis': [
      { years: '0-1', count: 372 },
      { years: '2-3', count: 558 },
      { years: '4-5', count: 682 },
      { years: '6-7', count: 589 },
      { years: '8-10', count: 496 },
      { years: '11-15', count: 310 },
      { years: '16+', count: 93 }
    ],
    'GERD': [
      { years: '0-1', count: 216 },
      { years: '2-3', count: 324 },
      { years: '4-5', count: 396 },
      { years: '6-7', count: 342 },
      { years: '8-10', count: 288 },
      { years: '11-15', count: 180 },
      { years: '16+', count: 54 }
    ]
  };

  const chartConfig = {
    patients: {
      label: "Patients",
    },
    count: {
      label: "Count",
    },
    avgDiagnosisAge: {
      label: "Average Diagnosis Age",
    }
  };

  const getCurrentTimeData = () => {
    return timeDistributionData[selectedComorbidity as keyof typeof timeDistributionData] || timeDistributionData.all;
  };

  // Box plot data for visualization
  const boxPlotData = comorbidityData.map(item => ({
    condition: item.condition,
    min: item.min,
    q1: item.q1,
    median: item.avgDiagnosisAge,
    q3: item.q3,
    max: item.max
  }));

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
                    <Bar dataKey="patients" fill="#0066CC" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comorbidityData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#0066CC]">
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
              {/* Box and Whiskers Plot */}
              <Card>
                <CardHeader>
                  <CardTitle>Box and Whiskers Plot - Age at First Diagnosis</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Distribution of diagnosis ages showing quartiles, median, and outliers
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {boxPlotData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="font-medium text-sm">{item.condition}</div>
                        <div className="relative h-8 bg-gray-100 rounded">
                          {/* Box plot visualization */}
                          <div 
                            className="absolute h-6 bg-[#0066CC] rounded opacity-50"
                            style={{
                              left: `${((item.q1 - 15) / 65) * 100}%`,
                              width: `${((item.q3 - item.q1) / 65) * 100}%`,
                              top: '4px'
                            }}
                          />
                          {/* Median line */}
                          <div 
                            className="absolute w-0.5 h-6 bg-[#00B4A6]"
                            style={{
                              left: `${((item.median - 15) / 65) * 100}%`,
                              top: '4px'
                            }}
                          />
                          {/* Whiskers */}
                          <div 
                            className="absolute h-1 bg-gray-600"
                            style={{
                              left: `${((item.min - 15) / 65) * 100}%`,
                              width: `${((item.q1 - item.min) / 65) * 100}%`,
                              top: '12px'
                            }}
                          />
                          <div 
                            className="absolute h-1 bg-gray-600"
                            style={{
                              left: `${((item.q3 - 15) / 65) * 100}%`,
                              width: `${((item.max - item.q3) / 65) * 100}%`,
                              top: '12px'
                            }}
                          />
                          {/* Min/Max markers */}
                          <div 
                            className="absolute w-0.5 h-2 bg-gray-600"
                            style={{
                              left: `${((item.min - 15) / 65) * 100}%`,
                              top: '10px'
                            }}
                          />
                          <div 
                            className="absolute w-0.5 h-2 bg-gray-600"
                            style={{
                              left: `${((item.max - 15) / 65) * 100}%`,
                              top: '10px'
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {item.min}</span>
                          <span>Q1: {item.q1}</span>
                          <span>Median: {item.median}</span>
                          <span>Q3: {item.q3}</span>
                          <span>Max: {item.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                    <Bar dataKey="avgDiagnosisAge" fill="#00B4A6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="space-y-4">
                <h4 className="font-semibold">Average Age at First Diagnosis</h4>
                {comorbidityData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{item.condition}</span>
                    <span className="text-lg font-bold text-[#0066CC]">{item.avgDiagnosisAge} years</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="time-distribution" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Time Since First Comorbidity Diagnosis</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Distribution of patients by years since first comorbidity diagnosis
                      </p>
                    </div>
                    <Select value={selectedComorbidity} onValueChange={setSelectedComorbidity}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Comorbidities</SelectItem>
                        {comorbidityData.map((condition) => (
                          <SelectItem key={condition.condition} value={condition.condition}>
                            {condition.condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getCurrentTimeData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="years" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="#7B68EE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getCurrentTimeData().map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#7B68EE]">
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
