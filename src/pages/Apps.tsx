
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Search } from 'lucide-react';
import { Header } from '@/components/Header';

const Apps = () => {
  const applications = [
    {
      title: 'Study Dashboard',
      description: 'View comprehensive analytics and insights for your study cohort',
      icon: BarChart3,
      href: '/cohort',
      color: 'bg-blue-500',
    },
    {
      title: 'Cohort Explorer',
      description: 'Build and explore custom cohorts based on your study data',
      icon: Search,
      href: '/explorer',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Header useRegistryTitle={true} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Page Description */}
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-bold text-[#003f7f]">Applications</h2>
            <p className="text-muted-foreground">
              Available applications and tools for your research
            </p>
          </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Available Applications</h2>
          <p className="text-muted-foreground">
            Select an application to get started with your data analysis and cohort management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Link key={app.title} to={app.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center mb-4`}>
                    <app.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Click to open application →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
