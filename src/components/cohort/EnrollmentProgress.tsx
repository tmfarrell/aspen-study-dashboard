import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudyType } from '@/data/studyData';

interface EnrollmentProgressProps {
  detailed?: boolean;
  selectedStudy?: StudyType;
}

const EnrollmentProgress = ({ detailed = false, selectedStudy = 'obesity' }: EnrollmentProgressProps) => {
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Study-specific enrollment data
  const getEnrollmentDataByStudy = (study: StudyType) => {
    const baseData = {
      obesity: {
        target: 10000,
        enrolled: 8000,
        multiplier: 1
      },
      diabetes: {
        target: 15000,
        enrolled: 12500,
        multiplier: 1.5
      },
      hypertension: {
        target: 8500,
        enrolled: 6800,
        multiplier: 0.85
      }
    };

    const studyConfig = baseData[study];
    
    return {
      global: {
        total: studyConfig.enrolled,
        target: studyConfig.target,
        recent: Math.round(680 * studyConfig.multiplier),
        enrollmentRate: Math.round(22 * studyConfig.multiplier),
        countries: [
          { name: 'USA', enrolled: Math.round(3360 * studyConfig.multiplier), target: Math.round(4200 * studyConfig.multiplier) },
          { name: 'Canada', enrolled: Math.round(640 * studyConfig.multiplier), target: Math.round(800 * studyConfig.multiplier) },
          { name: 'France', enrolled: Math.round(1320 * studyConfig.multiplier), target: Math.round(1700 * studyConfig.multiplier) },
          { name: 'Germany', enrolled: Math.round(1536 * studyConfig.multiplier), target: Math.round(1800 * studyConfig.multiplier) },
          { name: 'Italy', enrolled: Math.round(672 * studyConfig.multiplier), target: Math.round(800 * studyConfig.multiplier) },
          { name: 'Switzerland', enrolled: Math.round(232 * studyConfig.multiplier), target: Math.round(300 * studyConfig.multiplier) },
          { name: 'UK', enrolled: Math.round(240 * studyConfig.multiplier), target: Math.round(400 * studyConfig.multiplier) }
        ],
        monthlyData: [
          { month: 'Jun 2024', enrolled: Math.round(360 * studyConfig.multiplier), cumulative: Math.round(360 * studyConfig.multiplier) },
          { month: 'Jul 2024', enrolled: Math.round(416 * studyConfig.multiplier), cumulative: Math.round(776 * studyConfig.multiplier) },
          { month: 'Aug 2024', enrolled: Math.round(544 * studyConfig.multiplier), cumulative: Math.round(1320 * studyConfig.multiplier) },
          { month: 'Sep 2024', enrolled: Math.round(576 * studyConfig.multiplier), cumulative: Math.round(1896 * studyConfig.multiplier) },
          { month: 'Oct 2024', enrolled: Math.round(632 * studyConfig.multiplier), cumulative: Math.round(2528 * studyConfig.multiplier) },
          { month: 'Nov 2024', enrolled: Math.round(680 * studyConfig.multiplier), cumulative: Math.round(3208 * studyConfig.multiplier) },
          { month: 'Dec 2024', enrolled: Math.round(736 * studyConfig.multiplier), cumulative: Math.round(3944 * studyConfig.multiplier) },
          { month: 'Jan 2025', enrolled: Math.round(784 * studyConfig.multiplier), cumulative: Math.round(4728 * studyConfig.multiplier) },
          { month: 'Feb 2025', enrolled: Math.round(816 * studyConfig.multiplier), cumulative: Math.round(5544 * studyConfig.multiplier) },
          { month: 'Mar 2025', enrolled: Math.round(880 * studyConfig.multiplier), cumulative: Math.round(6424 * studyConfig.multiplier) },
          { month: 'Apr 2025', enrolled: Math.round(944 * studyConfig.multiplier), cumulative: Math.round(7368 * studyConfig.multiplier) },
          { month: 'May 2025', enrolled: Math.round(1000 * studyConfig.multiplier), cumulative: Math.round(8368 * studyConfig.multiplier) }
        ]
      },
      europe: {
        total: Math.round(4000 * studyConfig.multiplier),
        target: Math.round(5000 * studyConfig.multiplier),
        recent: Math.round(336 * studyConfig.multiplier),
        enrollmentRate: Math.round(12 * studyConfig.multiplier),
        countries: [
          { name: 'France', enrolled: Math.round(1320 * studyConfig.multiplier), target: Math.round(1700 * studyConfig.multiplier) },
          { name: 'Germany', enrolled: Math.round(1536 * studyConfig.multiplier), target: Math.round(1800 * studyConfig.multiplier) },
          { name: 'Italy', enrolled: Math.round(672 * studyConfig.multiplier), target: Math.round(800 * studyConfig.multiplier) },
          { name: 'Switzerland', enrolled: Math.round(232 * studyConfig.multiplier), target: Math.round(300 * studyConfig.multiplier) },
          { name: 'UK', enrolled: Math.round(240 * studyConfig.multiplier), target: Math.round(400 * studyConfig.multiplier) }
        ],
        monthlyData: [
          { month: 'Jun 2024', enrolled: Math.round(176 * studyConfig.multiplier), cumulative: Math.round(176 * studyConfig.multiplier) },
          { month: 'Jul 2024', enrolled: Math.round(224 * studyConfig.multiplier), cumulative: Math.round(400 * studyConfig.multiplier) },
          { month: 'Aug 2024', enrolled: Math.round(272 * studyConfig.multiplier), cumulative: Math.round(672 * studyConfig.multiplier) },
          { month: 'Sep 2024', enrolled: Math.round(304 * studyConfig.multiplier), cumulative: Math.round(976 * studyConfig.multiplier) },
          { month: 'Oct 2024', enrolled: Math.round(336 * studyConfig.multiplier), cumulative: Math.round(1312 * studyConfig.multiplier) },
          { month: 'Nov 2024', enrolled: Math.round(368 * studyConfig.multiplier), cumulative: Math.round(1680 * studyConfig.multiplier) },
          { month: 'Dec 2024', enrolled: Math.round(400 * studyConfig.multiplier), cumulative: Math.round(2080 * studyConfig.multiplier) },
          { month: 'Jan 2025', enrolled: Math.round(432 * studyConfig.multiplier), cumulative: Math.round(2512 * studyConfig.multiplier) },
          { month: 'Feb 2025', enrolled: Math.round(464 * studyConfig.multiplier), cumulative: Math.round(2976 * studyConfig.multiplier) },
          { month: 'Mar 2025', enrolled: Math.round(496 * studyConfig.multiplier), cumulative: Math.round(3472 * studyConfig.multiplier) },
          { month: 'Apr 2025', enrolled: Math.round(528 * studyConfig.multiplier), cumulative: Math.round(4000 * studyConfig.multiplier) },
          { month: 'May 2025', enrolled: Math.round(560 * studyConfig.multiplier), cumulative: Math.round(4560 * studyConfig.multiplier) }
        ]
      },
      americas: {
        total: Math.round(4000 * studyConfig.multiplier),
        target: Math.round(5000 * studyConfig.multiplier),
        recent: Math.round(344 * studyConfig.multiplier),
        enrollmentRate: Math.round(10 * studyConfig.multiplier),
        countries: [
          { name: 'USA', enrolled: Math.round(3360 * studyConfig.multiplier), target: Math.round(4200 * studyConfig.multiplier) },
          { name: 'Canada', enrolled: Math.round(640 * studyConfig.multiplier), target: Math.round(800 * studyConfig.multiplier) }
        ],
        monthlyData: [
          { month: 'Jun 2024', enrolled: Math.round(184 * studyConfig.multiplier), cumulative: Math.round(184 * studyConfig.multiplier) },
          { month: 'Jul 2024', enrolled: Math.round(192 * studyConfig.multiplier), cumulative: Math.round(376 * studyConfig.multiplier) },
          { month: 'Aug 2024', enrolled: Math.round(272 * studyConfig.multiplier), cumulative: Math.round(648 * studyConfig.multiplier) },
          { month: 'Sep 2024', enrolled: Math.round(272 * studyConfig.multiplier), cumulative: Math.round(920 * studyConfig.multiplier) },
          { month: 'Oct 2024', enrolled: Math.round(296 * studyConfig.multiplier), cumulative: Math.round(1216 * studyConfig.multiplier) },
          { month: 'Nov 2024', enrolled: Math.round(312 * studyConfig.multiplier), cumulative: Math.round(1528 * studyConfig.multiplier) },
          { month: 'Dec 2024', enrolled: Math.round(336 * studyConfig.multiplier), cumulative: Math.round(1864 * studyConfig.multiplier) },
          { month: 'Jan 2025', enrolled: Math.round(352 * studyConfig.multiplier), cumulative: Math.round(2216 * studyConfig.multiplier) },
          { month: 'Feb 2025', enrolled: Math.round(352 * studyConfig.multiplier), cumulative: Math.round(2568 * studyConfig.multiplier) },
          { month: 'Mar 2025', enrolled: Math.round(384 * studyConfig.multiplier), cumulative: Math.round(2952 * studyConfig.multiplier) },
          { month: 'Apr 2025', enrolled: Math.round(416 * studyConfig.multiplier), cumulative: Math.round(3368 * studyConfig.multiplier) },
          { month: 'May 2025', enrolled: Math.round(440 * studyConfig.multiplier), cumulative: Math.round(3808 * studyConfig.multiplier) }
        ]
      }
    };
  };

  const enrollmentData = getEnrollmentDataByStudy(selectedStudy);
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
              <TabsTrigger value="trends">Cumulative Enrollment</TabsTrigger>
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
                <h3 className="text-lg font-semibold mb-2">Cumulative Enrollment</h3>
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
