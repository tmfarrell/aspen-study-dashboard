
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, CartesianGrid, LineChart, Line } from 'recharts';

interface BMIDistributionChartProps {
  detailed?: boolean;
}

const BMIDistributionChart: React.FC<BMIDistributionChartProps> = ({ detailed = false }) => {
  const bmiData = [
    { range: "30-31", patients: 1200, category: "Class I" },
    { range: "31-32", patients: 1100, category: "Class I" },
    { range: "32-33", patients: 950, category: "Class I" },
    { range: "33-34", patients: 800, category: "Class I" },
    { range: "34-35", patients: 150, category: "Class I" },
    { range: "35-36", patients: 900, category: "Class II" },
    { range: "36-37", patients: 850, category: "Class II" },
    { range: "37-38", patients: 750, category: "Class II" },
    { range: "38-39", patients: 650, category: "Class II" },
    { range: "39-40", patients: 350, category: "Class II" },
    { range: "40-42", patients: 800, category: "Class III" },
    { range: "42-44", patients: 650, category: "Class III" },
    { range: "44-46", patients: 450, category: "Class III" },
    { range: "46-48", patients: 250, category: "Class III" },
    { range: "48+", patients: 150, category: "Class III" }
  ];

  // Weight reduction distribution data (patients by weight loss ranges)
  const weightReductionData = [
    { weightLossRange: '0-0.5 kg', patients: 850 },
    { weightLossRange: '0.5-1.0 kg', patients: 920 },
    { weightLossRange: '1.0-1.5 kg', patients: 980 },
    { weightLossRange: '1.5-2.0 kg', patients: 1050 },
    { weightLossRange: '2.0-2.5 kg', patients: 1120 },
    { weightLossRange: '2.5-3.0 kg', patients: 1180 },
    { weightLossRange: '3.0-3.5 kg', patients: 1220 },
    { weightLossRange: '3.5-4.0 kg', patients: 1100 },
    { weightLossRange: '4.0-4.5 kg', patients: 980 },
    { weightLossRange: '4.5-5.0 kg', patients: 850 },
    { weightLossRange: '5.0-5.5 kg', patients: 720 },
    { weightLossRange: '5.5-6.0 kg', patients: 650 },
    { weightLossRange: '6.0-6.5 kg', patients: 580 },
    { weightLossRange: '6.5-7.0 kg', patients: 520 },
    { weightLossRange: '7.0-7.5 kg', patients: 450 },
    { weightLossRange: '7.5-8.0 kg', patients: 380 },
    { weightLossRange: '8.0+ kg', patients: 320 }
  ];

  // Updated Sankey chart simulation data for BMI category movement including Overweight
  const sankeyData = {
    nodes: [
      { id: 'baseline_overweight', name: 'Overweight (Baseline)', x: 0 },
      { id: 'baseline_classI', name: 'Class I Obesity (Baseline)', x: 0 },
      { id: 'baseline_classII', name: 'Class II Obesity (Baseline)', x: 0 },
      { id: 'baseline_classIII', name: 'Class III Obesity (Baseline)', x: 0 },
      { id: 'followup_overweight', name: 'Overweight (12 Months)', x: 1 },
      { id: 'followup_classI', name: 'Class I Obesity (12 Months)', x: 1 },
      { id: 'followup_classII', name: 'Class II Obesity (12 Months)', x: 1 },
      { id: 'followup_classIII', name: 'Class III Obesity (12 Months)', x: 1 }
    ],
    links: [
      { source: 'baseline_overweight', target: 'followup_overweight', value: 1800 },
      { source: 'baseline_overweight', target: 'followup_classI', value: 150 },
      { source: 'baseline_classI', target: 'followup_overweight', value: 320 },
      { source: 'baseline_classI', target: 'followup_classI', value: 3600 },
      { source: 'baseline_classI', target: 'followup_classII', value: 280 },
      { source: 'baseline_classII', target: 'followup_classI', value: 380 },
      { source: 'baseline_classII', target: 'followup_classII', value: 2920 },
      { source: 'baseline_classII', target: 'followup_classIII', value: 200 },
      { source: 'baseline_classIII', target: 'followup_classII', value: 300 },
      { source: 'baseline_classIII', target: 'followup_classIII', value: 2000 }
    ]
  };

  const chartConfig = {
    patients: {
      label: "Patients",
      color: "#0066CC",
    },
    overweight: {
      label: "Overweight",
      color: "#FFA726"
    },
    classI: {
      label: "Class I Obesity",
      color: "#0066CC"
    },
    classII: {
      label: "Class II Obesity", 
      color: "#00B4A6"
    },
    classIII: {
      label: "Class III Obesity",
      color: "#7B68EE"
    }
  };

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>BMI Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Uneven distribution across obesity classifications
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bmiData}>
                <XAxis 
                  dataKey="range" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [value, "Patients"]}
                  labelFormatter={(label) => `BMI Range: ${label}`}
                />
                <Bar 
                  dataKey="patients" 
                  fill="#0066CC"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* BMI Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>BMI Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Current distribution across obesity classes
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bmiData}>
                <XAxis 
                  dataKey="range" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [value, "Patients"]}
                  labelFormatter={(label) => `BMI Range: ${label}`}
                />
                <Bar 
                  dataKey="patients" 
                  fill="#0066CC"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weight Reduction Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Reduction Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Number of patients with weight reduction by 0.5 kg intervals over 12 months
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightReductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="weightLossRange" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={10}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [value, "Patients"]}
                />
                <Bar 
                  dataKey="patients" 
                  fill="#00B4A6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* BMI Categories Movement - Updated Sankey Chart Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>BMI Categories (Pre/Post Treatment)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Patient transitions between BMI categories from baseline to 12 months
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Visual Sankey representation */}
            <div className="grid grid-cols-2 gap-8 p-6">
              {/* Left side - Baseline */}
              <div className="space-y-4">
                <h4 className="font-semibold text-center">Baseline</h4>
                <div className="space-y-3">
                  <div className="bg-[#FFA726] text-white p-4 rounded text-center">
                    <div className="font-semibold">Overweight</div>
                    <div className="text-xs mb-1">BMI 25.0 to &lt;30.0 kg/m²</div>
                    <div className="text-sm">1,950 patients</div>
                  </div>
                  <div className="bg-[#0066CC] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class I Obesity</div>
                    <div className="text-xs mb-1">BMI 30.0 to &lt;35.0 kg/m²</div>
                    <div className="text-sm">4,200 patients</div>
                  </div>
                  <div className="bg-[#00B4A6] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class II Obesity</div>
                    <div className="text-xs mb-1">BMI 35 to &lt;40.0 kg/m²</div>
                    <div className="text-sm">3,500 patients</div>
                  </div>
                  <div className="bg-[#7B68EE] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class III Obesity (Severe Obesity)</div>
                    <div className="text-xs mb-1">BMI 40.0+ kg/m²</div>
                    <div className="text-sm">2,300 patients</div>
                  </div>
                </div>
              </div>

              {/* Right side - 12 Months */}
              <div className="space-y-4">
                <h4 className="font-semibold text-center">12 Months Follow-up</h4>
                <div className="space-y-3">
                  <div className="bg-[#FFA726] text-white p-4 rounded text-center">
                    <div className="font-semibold">Overweight</div>
                    <div className="text-xs mb-1">BMI 25.0 to &lt;30.0 kg/m²</div>
                    <div className="text-sm">2,120 patients</div>
                  </div>
                  <div className="bg-[#0066CC] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class I Obesity</div>
                    <div className="text-xs mb-1">BMI 30.0 to &lt;35.0 kg/m²</div>
                    <div className="text-sm">4,130 patients</div>
                  </div>
                  <div className="bg-[#00B4A6] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class II Obesity</div>
                    <div className="text-xs mb-1">BMI 35 to &lt;40.0 kg/m²</div>
                    <div className="text-sm">3,420 patients</div>
                  </div>
                  <div className="bg-[#7B68EE] text-white p-4 rounded text-center">
                    <div className="font-semibold">Class III Obesity (Severe Obesity)</div>
                    <div className="text-xs mb-1">BMI 40.0+ kg/m²</div>
                    <div className="text-sm">2,000 patients</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow details table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patient Flow Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">From</th>
                        <th className="border border-gray-300 p-3 text-left">To</th>
                        <th className="border border-gray-300 p-3 text-right">Patients</th>
                        <th className="border border-gray-300 p-3 text-right">Flow %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sankeyData.links.map((link, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">
                            {sankeyData.nodes.find(n => n.id === link.source)?.name}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {sankeyData.nodes.find(n => n.id === link.target)?.name}
                          </td>
                          <td className="border border-gray-300 p-3 text-right font-semibold">
                            {link.value.toLocaleString()}
                          </td>
                          <td className="border border-gray-300 p-3 text-right">
                            {((link.value / 11950) * 100).toFixed(1)}%
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
    </div>
  );
};

export default BMIDistributionChart;
