
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingUp, Activity, ArrowRight, Bell } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

const Home = () => {
  const quickStats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Studies',
      value: '15',
      change: '+3',
      icon: Activity,
      color: 'text-green-600',
    },
    {
      title: 'Data Points',
      value: '1.2M',
      change: '+8.5%',
      icon: BarChart3,
      color: 'text-purple-600',
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentActivities = [
    'New patient cohort created: "Diabetes Study Q4"',
    'Data export completed for Study #12',
    'System maintenance scheduled for tonight',
    'Monthly report generated successfully',
  ];

  const quickActions = [
    {
      title: 'View Study Dashboard',
      description: 'Access comprehensive analytics and insights',
      href: '/cohort',
      icon: BarChart3,
    },
    {
      title: 'Explore Cohorts',
      description: 'Build and analyze custom patient cohorts',
      href: '/explorer',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#003f7f]">Welcome back!</h1>
              <p className="text-gray-600">Here's what's happening with your studies today.</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump to your most used features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.href}>
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <action.icon className="h-5 w-5 text-[#003f7f]" />
                        <h3 className="font-semibold">{action.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {action.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Open <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              New to Aspen? Here are some helpful resources to get you started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <BarChart3 className="h-8 w-8 text-[#003f7f] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Study Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  View comprehensive analytics for your patient cohorts
                </p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-[#003f7f] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Cohort Explorer</h3>
                <p className="text-sm text-muted-foreground">
                  Build custom cohorts based on your study criteria
                </p>
              </div>
              <div className="text-center p-4">
                <Activity className="h-8 w-8 text-[#003f7f] mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your studies with live data updates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
