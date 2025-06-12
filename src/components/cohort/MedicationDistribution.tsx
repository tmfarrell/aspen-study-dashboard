import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MedicationDistribution = ({ detailed = false }: { detailed?: boolean }) => {
  const [selectedDrug, setSelectedDrug] = useState<string>('all');
  const [selectedAdverseReaction, setSelectedAdverseReaction] = useState<string>('all');

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
      discontinued: 200,
      loadingDose: '0.25 mg weekly',
      maintenanceDose: '1.0-2.4 mg weekly'
    },
    { 
      name: 'Liraglutide', 
      patients: 2200, 
      percentage: 22, 
      category: 'GLP-1 Agonist',
      avgDuration: 12.2,
      startDateRange: '2021-06 to 2024-05',
      endDateRange: '2022-12 to 2024-11',
      discontinued: 180,
      loadingDose: '0.6 mg daily',
      maintenanceDose: '1.2-3.0 mg daily'
    },
    { 
      name: 'Orlistat', 
      patients: 1800, 
      percentage: 18, 
      category: 'Lipase Inhibitor',
      avgDuration: 6.8,
      startDateRange: '2022-03 to 2024-04',
      endDateRange: '2023-01 to 2024-10',
      discontinued: 320,
      loadingDose: '60 mg TID',
      maintenanceDose: '120 mg TID'
    },
    { 
      name: 'Naltrexone-Bupropion', 
      patients: 1500, 
      percentage: 15, 
      category: 'Combination',
      avgDuration: 9.1,
      startDateRange: '2021-12 to 2024-03',
      endDateRange: '2023-06 to 2024-09',
      discontinued: 240,
      loadingDose: '8/90 mg daily',
      maintenanceDose: '32/360 mg daily'
    },
    { 
      name: 'Phentermine', 
      patients: 1200, 
      percentage: 12, 
      category: 'Appetite Suppressant',
      avgDuration: 4.2,
      startDateRange: '2022-08 to 2024-02',
      endDateRange: '2023-02 to 2024-08',
      discontinued: 380,
      loadingDose: '15 mg daily',
      maintenanceDose: '15-37.5 mg daily'
    },
    { 
      name: 'Other/None', 
      patients: 500, 
      percentage: 5, 
      category: 'Other',
      avgDuration: 3.5,
      startDateRange: '2023-01 to 2024-01',
      endDateRange: '2023-08 to 2024-07',
      discontinued: 150,
      loadingDose: 'Variable',
      maintenanceDose: 'Variable'
    }
  ];

  // Adverse drug reactions data
  const adverseReactionsData: Record<string, Array<{reaction: string, count: number, severity: string}>> = {
    'Semaglutide': [
      { reaction: 'Nausea', count: 420, severity: 'Mild' },
      { reaction: 'Vomiting', count: 280, severity: 'Moderate' },
      { reaction: 'Diarrhea', count: 350, severity: 'Mild' },
      { reaction: 'Injection site reaction', count: 140, severity: 'Mild' },
      { reaction: 'Hypoglycemia', count: 95, severity: 'Moderate' }
    ],
    'Liraglutide': [
      { reaction: 'Nausea', count: 380, severity: 'Mild' },
      { reaction: 'Headache', count: 220, severity: 'Mild' },
      { reaction: 'Diarrhea', count: 310, severity: 'Mild' },
      { reaction: 'Fatigue', count: 180, severity: 'Mild' },
      { reaction: 'Pancreatitis', count: 15, severity: 'Severe' }
    ],
    'Orlistat': [
      { reaction: 'Oily spotting', count: 540, severity: 'Mild' },
      { reaction: 'Flatulence', count: 480, severity: 'Mild' },
      { reaction: 'Fecal urgency', count: 360, severity: 'Moderate' },
      { reaction: 'Abdominal pain', count: 270, severity: 'Mild' },
      { reaction: 'Vitamin deficiency', count: 120, severity: 'Moderate' }
    ],
    'Naltrexone-Bupropion': [
      { reaction: 'Nausea', count: 225, severity: 'Mild' },
      { reaction: 'Constipation', count: 180, severity: 'Mild' },
      { reaction: 'Headache', count: 165, severity: 'Mild' },
      { reaction: 'Dizziness', count: 135, severity: 'Mild' },
      { reaction: 'Dry mouth', count: 120, severity: 'Mild' }
    ],
    'Phentermine': [
      { reaction: 'Insomnia', count: 240, severity: 'Moderate' },
      { reaction: 'Dry mouth', count: 216, severity: 'Mild' },
      { reaction: 'Constipation', count: 180, severity: 'Mild' },
      { reaction: 'Increased heart rate', count: 144, severity: 'Moderate' },
      { reaction: 'Nervousness', count: 108, severity: 'Mild' }
    ]
  };

  // Updated Sankey chart data to show treatment switching patterns
  const treatmentSwitchingData = [
    { from: 'No Treatment', to: 'Semaglutide', patients: 1800 },
    { from: 'No Treatment', to: 'Liraglutide', patients: 1500 },
    { from: 'No Treatment', to: 'Orlistat', patients: 1200 },
    { from: 'No Treatment', to: 'Naltrexone-Bupropion', patients: 800 },
    { from: 'No Treatment', to: 'Phentermine', patients: 600 },
    { from: 'Semaglutide', to: 'Liraglutide', patients: 200 },
    { from: 'Semaglutide', to: 'Orlistat', patients: 150 },
    { from: 'Liraglutide', to: 'Semaglutide', patients: 180 },
    { from: 'Orlistat', to: 'Semaglutide', patients: 300 },
    { from: 'Orlistat', to: 'Liraglutide', patients: 220 },
    { from: 'Phentermine', to: 'Semaglutide', patients: 250 },
    { from: 'Naltrexone-Bupropion', to: 'Semaglutide', patients: 180 },
    { from: 'Semaglutide', to: 'Discontinued', patients: 200 },
    { from: 'Liraglutide', to: 'Discontinued', patients: 180 },
    { from: 'Orlistat', to: 'Discontinued', patients: 320 },
    { from: 'Phentermine', to: 'Discontinued', patients: 380 },
    { from: 'Naltrexone-Bupropion', to: 'Discontinued', patients: 240 }
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

  const getFilteredAdverseReactions = () => {
    if (selectedDrug === 'all') {
      // Combine all adverse reactions
      const combined: {reaction: string, count: number, severity: string}[] = [];
      Object.values(adverseReactionsData).forEach(drugReactions => {
        drugReactions.forEach(reaction => {
          const existing = combined.find(r => r.reaction === reaction.reaction);
          if (existing) {
            existing.count += reaction.count;
          } else {
            combined.push({ ...reaction });
          }
        });
      });
      
      if (selectedAdverseReaction === 'all') {
        return combined.sort((a, b) => b.count - a.count);
      } else {
        return combined.filter(r => r.reaction.toLowerCase().includes(selectedAdverseReaction.toLowerCase()));
      }
    } else {
      const drugReactions = adverseReactionsData[selectedDrug] || [];
      if (selectedAdverseReaction === 'all') {
        return drugReactions;
      } else {
        return drugReactions.filter(r => r.reaction.toLowerCase().includes(selectedAdverseReaction.toLowerCase()));
      }
    }
  };

  // Updated treatment switching data for flow visualization
  const treatmentFlowData = [
    { from: 'No Treatment', to: 'Semaglutide', patients: 1800, color: '#8884d8' },
    { from: 'No Treatment', to: 'Liraglutide', patients: 1500, color: '#82ca9d' },
    { from: 'No Treatment', to: 'Orlistat', patients: 1200, color: '#ffc658' },
    { from: 'No Treatment', to: 'Naltrexone-Bupropion', patients: 800, color: '#ff7300' },
    { from: 'No Treatment', to: 'Phentermine', patients: 600, color: '#d084d0' },
    { from: 'Semaglutide', to: 'Liraglutide', patients: 200, color: '#82ca9d' },
    { from: 'Semaglutide', to: 'Orlistat', patients: 150, color: '#ffc658' },
    { from: 'Liraglutide', to: 'Semaglutide', patients: 180, color: '#8884d8' },
    { from: 'Orlistat', to: 'Semaglutide', patients: 300, color: '#8884d8' },
    { from: 'Orlistat', to: 'Liraglutide', patients: 220, color: '#82ca9d' },
    { from: 'Phentermine', to: 'Semaglutide', patients: 250, color: '#8884d8' },
    { from: 'Naltrexone-Bupropion', to: 'Semaglutide', patients: 180, color: '#8884d8' }
  ];

  // Group by destination for better visualization
  const treatmentDestinations = treatmentFlowData.reduce((acc, item) => {
    if (!acc[item.to]) {
      acc[item.to] = { medication: item.to, totalPatients: 0, flows: [] };
    }
    acc[item.to].totalPatients += item.patients;
    acc[item.to].flows.push(item);
    return acc;
  }, {} as Record<string, { medication: string; totalPatients: number; flows: any[] }>);

  if (!detailed) {
    return (
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
    );
  }

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

      <div className="space-y-6">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="dosing">Dosing</TabsTrigger>
            <TabsTrigger value="duration">Treatment Duration</TabsTrigger>
            <TabsTrigger value="timeline">Treatment Switching</TabsTrigger>
            <TabsTrigger value="discontinuation">Discontinuation</TabsTrigger>
            <TabsTrigger value="adverse">Adverse Reactions</TabsTrigger>
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

          <TabsContent value="dosing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {medicationData.map((med, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{med.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{med.category}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Loading Dose</h4>
                        <div className="p-3 bg-blue-50 rounded border">
                          <span className="font-medium text-blue-800">{med.loadingDose}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Maintenance Dose</h4>
                        <div className="p-3 bg-green-50 rounded border">
                          <span className="font-medium text-green-800">{med.maintenanceDose}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          {med.patients.toLocaleString()} patients on this medication
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Switching Flow</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Patient flow between different treatment options
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Treatment Flow Visualization */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Treatment Destinations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.values(treatmentDestinations)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="medication" 
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                fontSize={10}
                              />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="totalPatients" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    {/* Treatment Flow Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Major Treatment Flows</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {treatmentFlowData
                            .sort((a, b) => b.patients - a.patients)
                            .slice(0, 10)
                            .map((flow, index) => (
                              <div key={index} className="flex justify-between items-center p-3 border rounded">
                                <div className="flex items-center space-x-2">
                                  <div 
                                    className="w-3 h-3 rounded" 
                                    style={{ backgroundColor: flow.color }}
                                  ></div>
                                  <span className="text-sm font-medium">
                                    {flow.from} → {flow.to}
                                  </span>
                                </div>
                                <span className="font-semibold">{flow.patients}</span>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Flow Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Treatment Switching Flow Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={treatmentFlowData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis 
                              type="category" 
                              dataKey="from" 
                              width={120}
                              fontSize={10}
                            />
                            <ChartTooltip 
                              content={<ChartTooltipContent />}
                              formatter={(value, name, props) => [
                                value,
                                `Patients switching to ${props.payload.to}`
                              ]}
                            />
                            <Bar dataKey="patients" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
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

          <TabsContent value="adverse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Adverse Drug Reactions</CardTitle>
                <div className="flex gap-4">
                  <Select value={selectedDrug} onValueChange={setSelectedDrug}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select drug" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drugs</SelectItem>
                      {medicationData.slice(0, -1).map((med) => (
                        <SelectItem key={med.name} value={med.name}>
                          {med.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedAdverseReaction} onValueChange={setSelectedAdverseReaction}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter reactions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reactions</SelectItem>
                      <SelectItem value="nausea">Nausea</SelectItem>
                      <SelectItem value="headache">Headache</SelectItem>
                      <SelectItem value="diarrhea">Diarrhea</SelectItem>
                      <SelectItem value="constipation">Constipation</SelectItem>
                      <SelectItem value="fatigue">Fatigue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Adverse Reactions Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Adverse Reactions Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getFilteredAdverseReactions()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="reaction" 
                              angle={-45}
                              textAnchor="end"
                              height={100}
                              fontSize={11}
                            />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#ff7300" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Adverse Reactions Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Adverse Reactions Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {getFilteredAdverseReactions().map((reaction, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <div className="font-medium">{reaction.reaction}</div>
                              <div className="text-sm text-muted-foreground">
                                Severity: <span className={`font-medium ${
                                  reaction.severity === 'Severe' ? 'text-red-600' :
                                  reaction.severity === 'Moderate' ? 'text-orange-600' :
                                  'text-green-600'
                                }`}>
                                  {reaction.severity}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{reaction.count}</div>
                              <div className="text-sm text-muted-foreground">cases</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicationDistribution;
