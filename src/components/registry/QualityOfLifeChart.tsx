
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

interface QualityOfLifeChartProps {
  detailed?: boolean;
}

const QualityOfLifeChart: React.FC<QualityOfLifeChartProps> = ({ detailed = false }) => {
  // IWQOL scores (0-100, higher is better quality of life)
  const iwqolData = [
    { range: "0-10", patients: 450, score: "Very Poor" },
    { range: "11-20", patients: 850, score: "Poor" },
    { range: "21-30", patients: 1200, score: "Poor" },
    { range: "31-40", patients: 1600, score: "Fair" },
    { range: "41-50", patients: 1800, score: "Fair" },
    { range: "51-60", patients: 1700, score: "Moderate" },
    { range: "61-70", patients: 1400, score: "Good" },
    { range: "71-80", patients: 700, score: "Good" },
    { range: "81-90", patients: 300, score: "Very Good" },
    { range: "91-100", patients: 100, score: "Excellent" }
  ];

  // IWQOL-lite scores (0-100, higher is better)
  const iwqolLiteData = [
    { range: "0-10", patients: 380, score: "Very Poor" },
    { range: "11-20", patients: 720, score: "Poor" },
    { range: "21-30", patients: 980, score: "Poor" },
    { range: "31-40", patients: 1350, score: "Fair" },
    { range: "41-50", patients: 1650, score: "Fair" },
    { range: "51-60", patients: 1800, score: "Moderate" },
    { range: "61-70", patients: 1520, score: "Good" },
    { range: "71-80", patients: 1200, score: "Good" },
    { range: "81-90", patients: 600, score: "Very Good" },
    { range: "91-100", patients: 300, score: "Excellent" }
  ];

  // EQ-5D-5L Index scores (0-1, higher is better)
  const eq5d5lData = [
    { range: "0-0.1", patients: 520, score: "Very Poor" },
    { range: "0.11-0.2", patients: 890, score: "Poor" },
    { range: "0.21-0.3", patients: 1200, score: "Poor" },
    { range: "0.31-0.4", patients: 1450, score: "Fair" },
    { range: "0.41-0.5", patients: 1650, score: "Fair" },
    { range: "0.51-0.6", patients: 1500, score: "Moderate" },
    { range: "0.61-0.7", patients: 1200, score: "Good" },
    { range: "0.71-0.8", patients: 980, score: "Good" },
    { range: "0.81-0.9", patients: 650, score: "Very Good" },
    { range: "0.91-1.0", patients: 450, score: "Excellent" }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
      color: "#003f7f",
    },
  };

  const summaryStats = [
    {
      assessment: "IWQOL",
      meanScore: 42.3,
      medianScore: 45,
      range: "0-100",
      interpretation: "Lower scores indicate worse quality of life"
    },
    {
      assessment: "IWQOL-lite",
      meanScore: 48.7,
      medianScore: 52,
      range: "0-100", 
      interpretation: "Simplified version of IWQOL"
    },
    {
      assessment: "EQ-5D-5L",
      meanScore: 0.62,
      medianScore: 0.65,
      range: "0-1",
      interpretation: "Index score representing health utility"
    }
  ];

  if (detailed) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg" style={{ color: '#003f7f' }}>{stat.assessment}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Mean Score:</span>
                    <span className="font-semibold">{stat.meanScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Median Score:</span>
                    <span className="font-semibold">{stat.medianScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Range:</span>
                    <span className="font-semibold">{stat.range}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{stat.interpretation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#003f7f' }}>IWQOL Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Impact of Weight on Quality of Life
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={iwqolData}>
                    <XAxis 
                      dataKey="range" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis fontSize={10} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Patients"]}
                      labelFormatter={(label) => `IWQOL Score: ${label}`}
                    />
                    <Bar 
                      dataKey="patients" 
                      fill="#003f7f"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#003f7f' }}>IWQOL-lite Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Simplified Quality of Life Assessment
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={iwqolLiteData}>
                    <XAxis 
                      dataKey="range" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis fontSize={10} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Patients"]}
                      labelFormatter={(label) => `IWQOL-lite Score: ${label}`}
                    />
                    <Bar 
                      dataKey="patients" 
                      fill="#003f7f"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#003f7f' }}>EQ-5D-5L Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                European Quality of Life 5-Dimension 5-Level
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eq5d5lData}>
                    <XAxis 
                      dataKey="range" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis fontSize={10} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, "Patients"]}
                      labelFormatter={(label) => `EQ-5D-5L Index: ${label}`}
                    />
                    <Bar 
                      dataKey="patients" 
                      fill="#003f7f"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: '#003f7f' }}>IWQOL Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2" style={{ color: '#003f7f' }}>42.3</div>
          <p className="text-sm text-muted-foreground">Mean score (0-100 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Lower scores indicate worse quality of life impact
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: '#003f7f' }}>IWQOL-lite Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2" style={{ color: '#003f7f' }}>48.7</div>
          <p className="text-sm text-muted-foreground">Mean score (0-100 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Simplified assessment with similar interpretation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: '#003f7f' }}>EQ-5D-5L Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2" style={{ color: '#003f7f' }}>0.62</div>
          <p className="text-sm text-muted-foreground">Mean Index score (0-1 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Health utility index for quality of life
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityOfLifeChart;
