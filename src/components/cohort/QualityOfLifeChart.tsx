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

  // SF-36 Physical Component Summary (0-100, higher is better)
  const sf36Data = [
    { range: "0-10", patients: 600, score: "Very Poor" },
    { range: "11-20", patients: 1100, score: "Poor" },
    { range: "21-30", patients: 1500, score: "Poor" },
    { range: "31-40", patients: 1800, score: "Fair" },
    { range: "41-50", patients: 1700, score: "Fair" },
    { range: "51-60", patients: 1400, score: "Moderate" },
    { range: "61-70", patients: 1200, score: "Good" },
    { range: "71-80", patients: 900, score: "Good" },
    { range: "81-90", patients: 500, score: "Very Good" },
    { range: "91-100", patients: 200, score: "Excellent" }
  ];

  const chartConfig = {
    patients: {
      label: "Patients",
      color: "hsl(var(--primary))",
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
      assessment: "SF-36 PCS",
      meanScore: 38.9,
      medianScore: 40,
      range: "0-100",
      interpretation: "Physical Component Summary score"
    }
  ];

  if (detailed) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaryStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{stat.assessment}</CardTitle>
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
              <CardTitle>IWQOL Distribution</CardTitle>
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
                      fill="var(--color-patients)"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IWQOL-lite Distribution</CardTitle>
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
                      fill="var(--color-patients)"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SF-36 PCS Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">
                Physical Component Summary
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sf36Data}>
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
                      labelFormatter={(label) => `SF-36 PCS Score: ${label}`}
                    />
                    <Bar 
                      dataKey="patients" 
                      fill="var(--color-patients)"
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
          <CardTitle className="text-lg">IWQOL Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary mb-2">42.3</div>
          <p className="text-sm text-muted-foreground">Mean score (0-100 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Lower scores indicate worse quality of life impact
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">IWQOL-lite Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary mb-2">48.7</div>
          <p className="text-sm text-muted-foreground">Mean score (0-100 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Simplified assessment with similar interpretation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SF-36 PCS Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary mb-2">38.9</div>
          <p className="text-sm text-muted-foreground">Mean PCS score (0-100 scale)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Physical Component Summary from SF-36
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityOfLifeChart;
