
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MedicationDistribution = ({ detailed = false }: { detailed?: boolean }) => {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  // Mock data for medication distribution with treatment duration
  const medicationData = [
    { 
      name: 'Semaglutide', 
      patients: 2800, 
      percentage: 28, 
      category: 'GLP-1 Agonist',
      avgDuration: 8.5,
      startDateRange: '2022-01 to 2024-06',
      endDateRange: '2023-03 to 2024-12',
      discontinued: 200
    },
    { 
      name: 'Liraglutide', 
      patients: 2200, 
      percentage: 22, 
      category: 'GLP-1 Agonist',
      avgDuration: 12.2,
      startDateRange: '2021-06 to 2024-05',
      endDateRange: '2022-12 to 2024-11',
      discontinued: 180
    },
    { 
      name: 'Orlistat', 
      patients: 1800, 
      percentage: 18, 
      category: 'Lipase Inhibitor',
      avgDuration: 6.8,
      startDateRange: '2022-03 to 2024-04',
      endDateRange: '2023-01 to 2024-10',
      discontinued: 320
    },
    { 
      name: 'Naltrexone-Bupropion', 
      patients: 1500, 
      percentage: 15, 
      category: 'Combination',
      avgDuration: 9.1,
      startDateRange: '2021-12 to 2024-03',
      endDateRange: '2023-06 to 2024-09',
      discontinued: 240
    },
    { 
      name: 'Phentermine', 
      patients: 1200, 
      percentage: 12, 
      category: 'Appetite Suppressant',
      avgDuration: 4.2,
      startDateRange: '2022-08 to 2024-02',
      endDateRange: '2023-02 to 2024-08',
      discontinued: 380
    },
    { 
      name: 'Other/None', 
      patients: 500, 
      percentage: 5, 
      category: 'Other',
      avgDuration: 3.5,
      startDateRange: '2023-01 to 2024-01',
      endDateRange: '2023-08 to 2024-07',
      discontinued: 150
    }
  ];

  // Discontinuation reasons by drug
  const discontinuationData: Record<string, Array<{reason: string, count: number, color: string}>> = {
    'Semaglutide': [
      { reason: 'Adverse Reaction', count: 50, color: '#ff4444' },
      { reason: 'Cost', count: 25, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 100, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 25, color: '#88cc00' }
    ],
    'Liraglutide': [
      { reason: 'Adverse Reaction', count: 45, color: '#ff4444' },
      { reason: 'Cost', count: 35, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 70, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 30, color: '#88cc00' }
    ],
    'Orlistat': [
      { reason: 'Adverse Reaction', count: 80, color: '#ff4444' },
      { reason: 'Cost', count: 40, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 150, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 50, color: '#88cc00' }
    ],
    'Naltrexone-Bupropion': [
      { reason: 'Adverse Reaction', count: 60, color: '#ff4444' },
      { reason: 'Cost', count: 50, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 90, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 40, color: '#88cc00' }
    ],
    'Phentermine': [
      { reason: 'Adverse Reaction', count: 120, color: '#ff4444' },
      { reason: 'Cost', count: 60, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 140, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 60, color: '#88cc00' }
    ],
    'Other/None': [
      { reason: 'Adverse Reaction', count: 40, color: '#ff4444' },
      { reason: 'Cost', count: 30, color: '#ff8800' },
      { reason: 'Drug Ineffectiveness', count: 50, color: '#ffcc00' },
      { reason: 'Insurance Reasons', count: 30, color: '#88cc00' }
    ]
  };

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
        <div className="space-y-6">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="duration">Treatment Duration</TabsTrigger>
              <TabsTrigger value="discontinuation">Discontinuation</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="duration" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {medicationData.map((med, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{med.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{med.category}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Avg Duration:</span>
                          <span className="font-semibold">{med.avgDuration} months</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Start Date Range:</div>
                          <div className="text-sm font-medium">{med.startDateRange}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">End Date Range:</div>
                          <div className="text-sm font-medium">{med.endDateRange}</div>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Active Patients:</span>
                          <span className="font-semibold">{(med.patients - med.discontinued).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Discontinued:</span>
                          <span className="font-semibold text-red-600">{med.discontinued}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discontinuation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {medicationData.map((med, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{med.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {med.discontinued} patients discontinued
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <ChartContainer config={chartConfig} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={discontinuationData[med.name]}
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                dataKey="count"
                                label={({ reason, count }) => `${count}`}
                              >
                                {discontinuationData[med.name].map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip 
                                content={<ChartTooltipContent />}
                                formatter={(value, name) => [value, "Patients"]}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                        
                        <div className="space-y-2">
                          {discontinuationData[med.name].map((reason, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded" 
                                  style={{ backgroundColor: reason.color }}
                                ></div>
                                <span>{reason.reason}</span>
                              </div>
                              <span className="font-semibold">{reason.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default MedicationDistribution;
