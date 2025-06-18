
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Users, Activity, TrendingUp, Heart } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

const Reports = () => {
  const reportTypes = [
    {
      title: 'Provider/Prescriber Insights Report',
      description: 'Comprehensive analysis of provider prescribing patterns and behaviors',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Prescribing Behaviors Insights Report',
      description: 'Detailed insights into medication prescribing trends and patterns',
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      title: 'Treatment Journey Insights Report',
      description: 'Analysis of patient treatment pathways and care progression',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Clinical Outcomes Insights Report',
      description: 'Comprehensive evaluation of treatment effectiveness and patient outcomes',
      icon: Heart,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#003f7f]">Insight Reports</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Generate Reports</h2>
          <p className="text-muted-foreground">
            Create comprehensive reports and insights from your study data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {reportTypes.map((report) => (
            <Card key={report.title} className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center mb-4`}>
                  <report.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                The Insight Reports module is currently under development. This page will allow you to:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Report Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Automated report generation</li>
                    <li>• Custom data filtering</li>
                    <li>• Multiple export formats</li>
                    <li>• Scheduled report delivery</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics Capabilities:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Advanced statistical analysis</li>
                    <li>• Interactive visualizations</li>
                    <li>• Comparative studies</li>
                    <li>• Trend analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
