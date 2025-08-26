
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingUp, Activity, ArrowRight, Bell, Search, FileText } from 'lucide-react';
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
    'Recruitment Update: 2 patients recruited in Site B',
    'Data Management Update: Site B data checks completed and ingested into Aspen',
    'Warning: system maintenance is scheduled for today at 23:59 CET',
    'Dashboard Update: monthly Aspen updates have been received',
  ];

  const quickActions = [
    {
      title: 'View Registry Tracker',
      description: 'View study progress and preliminary analysis',
      href: '/cohort',
      icon: Activity,
    },
    {
      title: 'Explore Cohorts',
      description: 'Build and analyze custom patient cohorts',
      href: '/explorer',
      icon: Search,
    },
    {
      title: 'Generate Insights',
      description: 'Generate comprehensive analytics and insights',
      href: '/reports',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-[#003f7f]">Welcome back!</h1>
              <p className="text-gray-600">Here's what's happening with your studies today</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                Jump to your most used features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Updates
              </CardTitle>
              <CardDescription>
                Latest updates across all Aspen studies
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Link to="/documentation#aspen-studies" className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <BarChart3 className="h-8 w-8 text-[#003f7f] mx-auto mb-2 hover:text-[#0056b3] transition-colors" />
                <h3 className="font-semibold mb-1">Aspen</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about non-interventional clinical studies powered by our platform
                </p>
              </Link>
              <Link to="/documentation#aspen-study-tracker" className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <Activity className="h-8 w-8 text-[#003f7f] mx-auto mb-2 hover:text-[#0056b3] transition-colors" />
                <h3 className="font-semibold mb-1">Aspen Registry Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time monitoring and analytics for Aspen studies
                </p>
              </Link>
              <Link to="/documentation#cohort-explorer" className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <Search className="h-8 w-8 text-[#003f7f] mx-auto mb-2 hover:text-[#0056b3] transition-colors" />
                <h3 className="font-semibold mb-1">Cohort Explorer</h3>
                <p className="text-sm text-muted-foreground">
                  Build and analyze custom patient cohorts
                </p>
              </Link>
              <Link to="/documentation#insights-reports" className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <FileText className="h-8 w-8 text-[#003f7f] mx-auto mb-2 hover:text-[#0056b3] transition-colors" />
                <h3 className="font-semibold mb-1">Insights Library</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analytics and reporting suite
                </p>
              </Link>
              <Link to="/faq" className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="h-8 w-8 text-[#003f7f] mx-auto mb-2 hover:text-[#0056b3] transition-colors" />
                <h3 className="font-semibold mb-1">Help & FAQ</h3>
                <p className="text-sm text-muted-foreground">
                  Find answers to frequently asked questions
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
