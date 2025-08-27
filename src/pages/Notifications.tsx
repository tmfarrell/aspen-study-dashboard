import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertCircle, Info, CheckCircle } from 'lucide-react';
import UserDropdown from '@/components/UserDropdown';
import { StudySelector } from '@/components/StudySelector';

const Notifications = () => {
  const recentActivities = [
    {
      message: 'Recruitment Update: 2 patients recruited in Site B',
      type: 'info',
      timestamp: '2 hours ago',
    },
    {
      message: 'Data Management Update: Site B data checks completed and ingested into Aspen',
      type: 'success',
      timestamp: '4 hours ago',
    },
    {
      message: 'Warning: system maintenance is scheduled for today at 23:59 CET',
      type: 'warning',
      timestamp: '6 hours ago',
    },
    {
      message: 'Dashboard Update: monthly Aspen updates have been received',
      type: 'info',
      timestamp: '1 day ago',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-orange-500';
      case 'success':
        return 'border-l-green-500';
      case 'info':
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-[#003f7f]">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with the latest activities and alerts across all Aspen studies
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StudySelector />
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Updates
            </CardTitle>
            <CardDescription>
              Latest notifications and system updates from your Aspen studies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 border-l-4 bg-card rounded-r-lg ${getBorderColor(activity.type)}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional notification categories could go here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <CardDescription>Critical system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">All systems operational</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Updates</CardTitle>
              <CardDescription>Recent study-related notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">2 new enrollments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Data validation complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Maintenance</CardTitle>
              <CardDescription>Scheduled maintenance windows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Tonight at 23:59 CET</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
