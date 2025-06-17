
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

const Explorer = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#003f7f]">Cohort Explorer</h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Build Custom Cohorts</h2>
          <p className="text-muted-foreground">
            Create and explore custom patient cohorts based on your study data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filter Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>
                Define criteria for your custom cohort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Filter options will be implemented here:
                </div>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Age range</li>
                  <li>• BMI categories</li>
                  <li>• Geographic location</li>
                  <li>• Comorbidities</li>
                  <li>• Medications</li>
                  <li>• Assessment scores</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Cohort Results
              </CardTitle>
              <CardDescription>
                Preview your custom cohort based on selected filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Explore</h3>
                <p className="text-muted-foreground mb-4">
                  Apply filters to start building your custom cohort
                </p>
                <div className="space-x-2">
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                The Cohort Explorer is currently under development. This page will allow you to:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Filter Capabilities:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Advanced demographic filtering</li>
                    <li>• Clinical criteria selection</li>
                    <li>• Medication history filtering</li>
                    <li>• Geographic restrictions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analysis Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Real-time cohort statistics</li>
                    <li>• Data visualization tools</li>
                    <li>• Export capabilities</li>
                    <li>• Cohort comparison tools</li>
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

export default Explorer;
