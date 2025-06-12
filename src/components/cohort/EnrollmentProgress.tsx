
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EnrollmentProgress = ({ detailed = false }: { detailed?: boolean }) => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Mock data for enrollment progress over 12 months
  const enrollmentData = {
    global: {
      total: 10000,
      target: 12000,
      recent: 850,
      enrollmentRate: 28,
      countries: [
        { name: 'USA', enrolled: 4200, target: 5000 },
        { name: 'Canada', enrolled: 800, target: 1000 },
        { name: 'France', enrolled: 1650, target: 2000 },
        { name: 'Germany', enrolled: 1920, target: 2200 },
        { name: 'Italy', enrolled: 840, target: 1000 },
        { name: 'Switzerland', enrolled: 290, target: 300 },
        { name: 'UK', enrolled: 300, target: 500 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 450 },
        { month: 'Jul 2024', enrolled: 520 },
        { month: 'Aug 2024', enrolled: 680 },
        { month: 'Sep 2024', enrolled: 720 },
        { month: 'Oct 2024', enrolled: 790 },
        { month: 'Nov 2024', enrolled: 850 },
        { month: 'Dec 2024', enrolled: 920 },
        { month: 'Jan 2025', enrolled: 980 },
        { month: 'Feb 2025', enrolled: 1020 },
        { month: 'Mar 2025', enrolled: 1100 },
        { month: 'Apr 2025', enrolled: 1180 },
        { month: 'May 2025', enrolled: 1250 }
      ]
    },
    europe: {
      total: 5000,
      target: 6000,
      recent: 420,
      enrollmentRate: 15,
      countries: [
        { name: 'France', enrolled: 1650, target: 2000 },
        { name: 'Germany', enrolled: 1920, target: 2200 },
        { name: 'Italy', enrolled: 840, target: 1000 },
        { name: 'Switzerland', enrolled: 290, target: 300 },
        { name: 'UK', enrolled: 300, target: 500 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 220 },
        { month: 'Jul 2024', enrolled: 280 },
        { month: 'Aug 2024', enrolled: 340 },
        { month: 'Sep 2024', enrolled: 380 },
        { month: 'Oct 2024', enrolled: 420 },
        { month: 'Nov 2024', enrolled: 460 },
        { month: 'Dec 2024', enrolled: 500 },
        { month: 'Jan 2025', enrolled: 540 },
        { month: 'Feb 2025', enrolled: 580 },
        { month: 'Mar 2025', enrolled: 620 },
        { month: 'Apr 2025', enrolled: 660 },
        { month: 'May 2025', enrolled: 700 }
      ]
    },
    americas: {
      total: 5000,
      target: 6000,
      recent: 430,
      enrollmentRate: 13,
      countries: [
        { name: 'USA', enrolled: 4200, target: 5000 },
        { name: 'Canada', enrolled: 800, target: 1000 }
      ],
      monthlyData: [
        { month: 'Jun 2024', enrolled: 230 },
        { month: 'Jul 2024', enrolled: 240 },
        { month: 'Aug 2024', enrolled: 340 },
        { month: 'Sep 2024', enrolled: 340 },
        { month: 'Oct 2024', enrolled: 370 },
        { month: 'Nov 2024', enrolled: 390 },
        { month: 'Dec 2024', enrolled: 420 },
        { month: 'Jan 2025', enrolled: 440 },
        { month: 'Feb 2025', enrolled: 440 },
        { month: 'Mar 2025', enrolled: 480 },
        { month: 'Apr 2025', enrolled: 520 },
        { month: 'May 2025', enrolled: 550 }
      ]
    }
  };

  const currentData = enrollmentData[selectedRegion as keyof typeof enrollmentData];
  const progressPercentage = (currentData.total / currentData.target) * 100;

  const chartConfig = {
    enrolled: {
      label: "Enrolled",
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
            <div className="text-3xl font-bold text-primary mb-1">
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
                      <div className="text-2xl font-bold text-primary">
                        {currentData.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Patients</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {currentData.recent}
                      </div>
                      <div className="text-sm text-muted-foreground">Recent Enrollment</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentData.enrollmentRate}
                      </div>
                      <div className="text-sm text-muted-foreground">Patients/Day</div>
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
                    <Bar dataKey="enrolled" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="enrolled" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8' }}
                    />
                  </LineChart>
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
                        <div className="text-3xl font-bold text-primary mb-1">
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
                        <span className="font-semibold">{currentData.enrollmentRate} patients/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Weekly Rate:</span>
                        <span className="font-semibold">{(currentData.enrollmentRate * 7).toFixed(0)} patients/week</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Rate:</span>
                        <span className="font-semibold">{(currentData.enrollmentRate * 30).toFixed(0)} patients/month</span>
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
