import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DrillDownData {
  category: string;
  count: number;
  percentage: number;
  pharmaClassId?: string;
  medicationId?: string;
}

interface DrillDownPieChartProps {
  title: string;
  initialData: DrillDownData[];
  onDrillDown: (item: DrillDownData) => DrillDownData[] | null;
  formatTooltip?: (value: any, name: any) => [string, string];
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--primary))'
];

export function DrillDownPieChart({ 
  title, 
  initialData, 
  onDrillDown, 
  formatTooltip 
}: DrillDownPieChartProps) {
  const [currentData, setCurrentData] = useState(initialData);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([title]);
  const [dataStack, setDataStack] = useState<DrillDownData[][]>([initialData]);

  const handlePieClick = (data: any, index: number) => {
    const item = currentData[index];
    const drillDownData = onDrillDown(item);
    
    if (drillDownData) {
      setDataStack(prev => [...prev, drillDownData]);
      setCurrentData(drillDownData);
      setBreadcrumb(prev => [...prev, item.category]);
    }
  };

  const handleBackClick = () => {
    if (dataStack.length > 1) {
      const newStack = dataStack.slice(0, -1);
      setDataStack(newStack);
      setCurrentData(newStack[newStack.length - 1]);
      setBreadcrumb(prev => prev.slice(0, -1));
    }
  };

  const chartConfig = currentData.reduce((config, item, index) => {
    config[item.category.toLowerCase().replace(/\s+/g, '_')] = {
      label: item.category,
      color: COLORS[index % COLORS.length],
    };
    return config;
  }, {} as any);

  if (!currentData.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{breadcrumb[breadcrumb.length - 1]}</CardTitle>
            {breadcrumb.length > 1 && (
              <div className="text-sm text-muted-foreground mt-1">
                {breadcrumb.slice(0, -1).join(' > ')}
              </div>
            )}
          </div>
          {breadcrumb.length > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackClick}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={30}
                paddingAngle={2}
                dataKey="count"
                onClick={handlePieClick}
                className="cursor-pointer"
              >
                {currentData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={formatTooltip || ((value, name) => [
                    `${value} patients`,
                    name
                  ])}
                />} 
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="mt-4 space-y-2">
          {currentData.map((item, index) => (
            <div key={item.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.category}</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{item.count.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}