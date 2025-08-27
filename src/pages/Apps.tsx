
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Search } from 'lucide-react';
import UserDropdown from '@/components/UserDropdown';

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
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#003f7f]">Applications</h1>
            </div>
            <UserDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
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
  );
};

export default Apps;
