
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EnrollmentProgress = ({ detailed = false }: { detailed?: boolean }) => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Mock data for enrollment progress over 12 months - updated with target 10,000
  const enrollmentData = {
    global: {
      total: 8000,
      target: 10000,
      recent: 680,
      enrollmentRate: 22,
      countries: [
        { name: 'USA', enrolled: 3360, target: 4200 },
        { name: 'Canada', enrolled: 640, target: 800 },
        { name: 'France', enrolled: 1320, target: 1700 },
        { name: 'Germany', enrolled: 1536, target: 1800 },
        { name: 'Italy', enrolled: 672, target: 800 },
        { name: 'Switzerland', enrolled: 232, target: 300 },
        { name: 'UK', enrolled: 240, target: 400 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 360, cumulative: 360 },
        { month: 'Jul 2024', enrolled: 416, cumulative: 776 },
        { month: 'Aug 2024', enrolled: 544, cumulative: 1320 },
        { month: 'Sep 2024', enrolled: 576, cumulative: 1896 },
        { month: 'Oct 2024', enrolled: 632, cumulative: 2528 },
        { month: 'Nov 2024', enrolled: 680, cumulative: 3208 },
        { month: 'Dec 2024', enrolled: 736, cumulative: 3944 },
        { month: 'Jan 2025', enrolled: 784, cumulative: 4728 },
        { month: 'Feb 2025', enrolled: 816, cumulative: 5544 },
        { month: 'Mar 2025', enrolled: 880, cumulative: 6424 },
        { month: 'Apr 2025', enrolled: 944, cumulative: 7368 },
        { month: 'May 2025', enrolled: 1000, cumulative: 8368 }
      ]
    },
    europe: {
      total: 4000,
      target: 5000,
      recent: 336,
      enrollmentRate: 12,
      countries: [
        { name: 'France', enrolled: 1320, target: 1700 },
        { name: 'Germany', enrolled: 1536, target: 1800 },
        { name: 'Italy', enrolled: 672, target: 800 },
        { name: 'Switzerland', enrolled: 232, target: 300 },
        { name: 'UK', enrolled: 240, target: 400 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 176, cumulative: 176 },
        { month: 'Jul 2024', enrolled: 224, cumulative: 400 },
        { month: 'Aug 2024', enrolled: 272, cumulative: 672 },
        { month: 'Sep 2024', enrolled: 304, cumulative: 976 },
        { month: 'Oct 2024', enrolled: 336, cumulative: 1312 },
        { month: 'Nov 2024', enrolled: 368, cumulative: 1680 },
        { month: 'Dec 2024', enrolled: 400, cumulative: 2080 },
        { month: 'Jan 2025', enrolled: 432, cumulative: 2512 },
        { month: 'Feb 2025', enrolled: 464, cumulative: 2976 },
        { month: 'Mar 2025', enrolled: 496, cumulative: 3472 },
        { month: 'Apr 2025', enrolled: 528, cumulative: 4000 },
        { month: 'May 2025', enrolled: 560, cumulative: 4560 }
      ]
    },
    americas: {
      total: 4000,
      target: 5000,
      recent: 344,
      enrollmentRate: 10,
      countries: [
        { name: 'USA', enrolled: 3360, target: 4200 },
        { name: 'Canada', enrolled: 640, target: 800 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 184, cumulative: 184 },
        { month: 'Jul 2024', enrolled: 192, cumulative: 376 },
        { month: 'Aug 2024', enrolled: 272, cumulative: 648 },
        { month: 'Sep 2024', enrolled: 272, cumulative: 920 },
        { month: 'Oct 2024', enrolled: 296, cumulative: 1216 },
        { month: 'Nov 2024', enrolled: 312, cumulative: 1528 },
        { month: 'Dec 2024', enrolled: 336, cumulative: 1864 },
        { month: 'Jan 2025', enrolled: 352, cumulative: 2216 },
        { month: 'Feb 2025', enrolled: 352, cumulative: 2568 },
        { month: 'Mar 2025', enrolled: 384, cumulative: 2952 },
        { month: 'Apr 2025', enrolled: 416, cumulative: 3368 },
        { month: 'May 2025', enrolled: 440, cumulative: 3808 }
      ]
    }
  };

  const currentData = enrollmentData[selectedRegion as keyof typeof enrollmentData];
  const progressPercentage = (currentData.total / currentData.target) * 100;

  const chartConfig = {
    enrolled: {
      label: "Enrolled",
    },
    cumulative: {
      label: "Cumulative Enrolled",
    }
  };

  if (!detailed) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Enrollment Progress (12 Months)</CardTitle>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0066CC] mb-1">
              {currentData.total.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              of {currentData.target.toLocaleString()} target patients enrolled
            </div>
            <Progress value={progressPercentage} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {progressPercentage.toFixed(1)}% complete
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">By Country:</h4>
            {currentData.countries.map((country, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{country.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {country.enrolled.toLocaleString()}/{country.target.toLocaleString()}
                  </span>
                  <div className="w-16">
                    <Progress 
                      value={(country.enrolled / country.target) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Enrollment Progress Dashboard</CardTitle>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Enrollment Trends</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0066CC]">
                        {currentData.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Patients</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00B4A6]">
                        {currentData.recent}
                      </div>
                      <div className="text-sm text-muted-foreground">Recent Enrollment (last month)</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#7B68EE]">
                        {currentData.enrollmentRate}
                      </div>
                      <div className="text-sm text-muted-foreground">Patients Enrolled/Day</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData.countries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="enrolled" fill="#0066CC" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Cumulative Enrollment Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive area chart showing cumulative patient enrollment over time by region
                </p>
              </div>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#0066CC" 
                      fill="#0066CC"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress to Target</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#0066CC] mb-1">
                          {currentData.total.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          of {currentData.target.toLocaleString()} target patients
                        </div>
                        <Progress value={progressPercentage} className="mt-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {progressPercentage.toFixed(1)}% complete
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Rate Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Daily Rate:</span>
                        <span className="font-semibold">{currentData.enrollmentRate} patients enrolled/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Weekly Rate:</span>
                        <span className="font-semibold">{(currentData.enrollmentRate * 7).toFixed(0)} patients enrolled/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Rate:</span>
                        <span className="font-semibold">{(currentData.enrollmentRate * 30).toFixed(0)} patients enrolled/month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentProgress;
