import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, Activity, TrendingUp, Heart, Stethoscope } from 'lucide-react';
import { Header } from '@/components/Header';
import { StudySelector } from '@/components/StudySelector';

const Reports = () => {

  const reportTypes = [
    {
      title: 'Population Insights Report',
      description: 'Detailed insights into pre-defined populations of interest',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Real-World Effectiveness Report',
      description: 'Comprehensive summaries of real-world clinical outcomes and effectiveness in treated cohorts of interest',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Treatment Journey Insights Report',
      description: 'Analysis of patient treatment pathways and care progression',
      icon: Activity,
      color: 'bg-purple-500',
    },
    {
      title: 'Provider Insights Report',
      description: 'Comprehensive analysis of provider prescribing patterns and behaviors',
      icon: Stethoscope,
      color: 'bg-blue-500',
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <Header title="Insights Library" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Page Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Insights Library</h2>
            <p className="text-muted-foreground">
              Create comprehensive reports and insights from your study data
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
        </div>
      </div>
    </div>
  );
};

export default Reports;
