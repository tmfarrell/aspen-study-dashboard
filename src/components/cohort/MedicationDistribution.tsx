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
    { category: 'GLP-1 Agonist', patients: 5000, percentage: 50, color: '#0066CC' },
    { category: 'Lipase Inhibitor', patients: 1800, percentage: 18, color: '#00B4A6' },
    { category: 'Combination', patients: 1500, percentage: 15, color: '#7B68EE' },
    { category: 'Appetite Suppressant', patients: 1200, percentage: 12, color: '#FF6B6B' },
    { category: 'Other', patients: 500, percentage: 5, color: '#4ECDC4' }
  ];

  // Fixed treatment switching data for better visualization
  const treatmentSwitchingData = [
    { fromTreatment: 'No Treatment', toTreatment: 'Semaglutide', patients: 1800 },
    { fromTreatment: 'No Treatment', toTreatment: 'Liraglutide', patients: 1500 },
    { fromTreatment: 'No Treatment', toTreatment: 'Orlistat', patients: 1200 },
    { fromTreatment: 'No Treatment', toTreatment: 'Naltrexone-Bupropion', patients: 800 },
    { fromTreatment: 'No Treatment', toTreatment: 'Phentermine', patients: 600 },
    { fromTreatment: 'Semaglutide', toTreatment: 'Liraglutide', patients: 200 },
    { fromTreatment: 'Semaglutide', toTreatment: 'Orlistat', patients: 150 },
    { fromTreatment: 'Liraglutide', toTreatment: 'Semaglutide', patients: 180 },
    { fromTreatment: 'Orlistat', toTreatment: 'Semaglutide', patients: 300 },
    { fromTreatment: 'Orlistat', toTreatment: 'Liraglutide', patients: 220 },
    { fromTreatment: 'Phentermine', toTreatment: 'Semaglutide', patients: 250 },
    { fromTreatment: 'Naltrexone-Bupropion', toTreatment: 'Semaglutide', patients: 180 },
    { fromTreatment: 'Semaglutide', toTreatment: 'Discontinued', patients: 200 },
    { fromTreatment: 'Liraglutide', toTreatment: 'Discontinued', patients: 180 },
    { fromTreatment: 'Orlistat', toTreatment: 'Discontinued', patients: 320 },
    { fromTreatment: 'Phentermine', toTreatment: 'Discontinued', patients: 380 },
    { fromTreatment: 'Naltrexone-Bupropion', toTreatment: 'Discontinued', patients: 240 }
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
                <Bar dataKey="patients" fill="#0066CC" />
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
                <Bar dataKey="patients" fill="#0066CC" />
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
                <CardTitle>Treatment Switching Flow (Sankey Chart)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Patient flow between different treatment options showing transitions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Sankey Chart Simulation */}
                  <div className="grid grid-cols-2 gap-8 p-6">
                    {/* Left side - From Treatments */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-center">From Treatment</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-200 text-gray-800 p-3 rounded text-center">
                          <div className="font-semibold">No Treatment</div>
                          <div className="text-sm">5,900 patients</div>
                        </div>
                        <div className="bg-[#0066CC] text-white p-3 rounded text-center">
                          <div className="font-semibold">Semaglutide</div>
                          <div className="text-sm">550 patients switching</div>
                        </div>
                        <div className="bg-[#00B4A6] text-white p-3 rounded text-center">
                          <div className="font-semibold">Liraglutide</div>
                          <div className="text-sm">360 patients switching</div>
                        </div>
                        <div className="bg-[#7B68EE] text-white p-3 rounded text-center">
                          <div className="font-semibold">Orlistat</div>
                          <div className="text-sm">840 patients switching</div>
                        </div>
                        <div className="bg-[#FF6B6B] text-white p-3 rounded text-center">
                          <div className="font-semibold">Naltrexone-Bupropion</div>
                          <div className="text-sm">420 patients switching</div>
                        </div>
                        <div className="bg-[#4ECDC4] text-white p-3 rounded text-center">
                          <div className="font-semibold">Phentermine</div>
                          <div className="text-sm">630 patients switching</div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - To Treatments */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-center">To Treatment</h4>
                      <div className="space-y-3">
                        <div className="bg-[#0066CC] text-white p-3 rounded text-center">
                          <div className="font-semibold">Semaglutide</div>
                          <div className="text-sm">2,710 patients total</div>
                        </div>
                        <div className="bg-[#00B4A6] text-white p-3 rounded text-center">
                          <div className="font-semibold">Liraglutide</div>
                          <div className="text-sm">1,920 patients total</div>
                        </div>
                        <div className="bg-[#7B68EE] text-white p-3 rounded text-center">
                          <div className="font-semibold">Orlistat</div>
                          <div className="text-sm">1,350 patients total</div>
                        </div>
                        <div className="bg-[#FF6B6B] text-white p-3 rounded text-center">
                          <div className="font-semibold">Naltrexone-Bupropion</div>
                          <div className="text-sm">800 patients total</div>
                        </div>
                        <div className="bg-[#4ECDC4] text-white p-3 rounded text-center">
                          <div className="font-semibold">Phentermine</div>
                          <div className="text-sm">600 patients total</div>
                        </div>
                        <div className="bg-red-600 text-white p-3 rounded text-center">
                          <div className="font-semibold">Discontinued</div>
                          <div className="text-sm">1,320 patients total</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flow details table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Treatment Flow Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-3 text-left">From Treatment</th>
                              <th className="border border-gray-300 p-3 text-left">To Treatment</th>
                              <th className="border border-gray-300 p-3 text-right">Patients</th>
                              <th className="border border-gray-300 p-3 text-right">Flow %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {treatmentSwitchingData
                              .sort((a, b) => b.patients - a.patients)
                              .map((flow, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-3">{flow.fromTreatment}</td>
                                  <td className="border border-gray-300 p-3">{flow.toTreatment}</td>
                                  <td className="border border-gray-300 p-3 text-right font-semibold">{flow.patients.toLocaleString()}</td>
                                  <td className="border border-gray-300 p-3 text-right">
                                    {((flow.patients / 10000) * 100).toFixed(1)}%
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
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
                <div className="space-y-6">
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
                            <Bar dataKey="count" fill="#FF6B6B" />
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
