import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, FileText } from 'lucide-react';

const PatientManagement = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Patient Management" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Page Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">Patient Management</h2>
            <p className="text-muted-foreground">
              Comprehensive patient data management and workflow tools
            </p>
          </div>

          {/* Coming Soon Banner */}
          <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Coming Soon</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Patient Management will provide comprehensive tools for managing patient records, 
                  scheduling appointments, and tracking patient interactions across your studies.
                </p>
              </div>

              <Badge variant="outline" className="px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                In Development
              </Badge>
            </CardContent>
          </Card>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <div className="p-3 bg-primary/10 rounded-lg w-fit">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Patient Records</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">
                  Centralized patient record management with comprehensive medical histories and data.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <div className="p-3 bg-secondary/10 rounded-lg w-fit">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Appointment Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">
                  Advanced scheduling system with automated reminders and follow-up coordination.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 pb-4">
                <div className="p-3 bg-accent/10 rounded-lg w-fit">
                  <FileText className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Clinical Workflows</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground">
                  Streamlined clinical workflows and automated documentation processes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;