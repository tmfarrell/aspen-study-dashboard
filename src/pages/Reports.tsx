import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Users, Activity, TrendingUp, Heart, Stethoscope } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import { StudyType, getStudyOptions } from '@/data/studyData';

const Reports = () => {
  const [selectedStudy, setSelectedStudy] = useState<StudyType>('obesity');

  const reportTypes = [
    {
      title: 'Provider Insights Report',
      description: 'Comprehensive analysis of provider prescribing patterns and behaviors',
      icon: Stethoscope,
      color: 'bg-blue-500',
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
      title: 'Population Insights Report',
      description: 'Detailed insights into pre-defined populations of interest',
      icon: Users,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-[#003f7f]">Insights Library</h1>
              <p className="text-muted-foreground">
                Create comprehensive reports and insights from your study data
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2"></h2>
            
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-muted-foreground">Select Study:</label>
            <Select value={selectedStudy} onValueChange={setSelectedStudy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a study" />
              </SelectTrigger>
              <SelectContent>
                {getStudyOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
  );
};

export default Reports;
