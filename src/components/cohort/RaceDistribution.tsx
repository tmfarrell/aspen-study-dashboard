
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const RaceDistribution = () => {
  const raceData = [
    { race: 'White', count: 6500, percentage: 65, color: '#8884d8' },
    { race: 'Black/African American', count: 1800, percentage: 18, color: '#82ca9d' },
    { race: 'Hispanic/Latino', count: 1200, percentage: 12, color: '#ffc658' },
    { race: 'Asian', count: 350, percentage: 3.5, color: '#ff7300' },
    { race: 'Other/Mixed', count: 150, percentage: 1.5, color: '#d084d0' }
  ];

  const chartConfig = {
    count: {
      label: "Count",
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Race/Ethnicity Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={raceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ race, percentage }) => `${percentage}%`}
                  >
                    {raceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-3">
            {raceData.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium">{item.race}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{item.count.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RaceDistribution;
