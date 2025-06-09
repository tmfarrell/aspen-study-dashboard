
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface GeographicDistributionProps {
  detailed?: boolean;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ detailed = false }) => {
  const stateData = [
    { state: "Texas", patients: 1250, percentage: 12.5 },
    { state: "California", patients: 980, percentage: 9.8 },
    { state: "Florida", patients: 850, percentage: 8.5 },
    { state: "New York", patients: 720, percentage: 7.2 },
    { state: "Pennsylvania", patients: 650, percentage: 6.5 },
    { state: "Illinois", patients: 580, percentage: 5.8 },
    { state: "Ohio", patients: 520, percentage: 5.2 },
    { state: "Georgia", patients: 480, percentage: 4.8 },
    { state: "North Carolina", patients: 450, percentage: 4.5 },
    { state: "Michigan", patients: 420, percentage: 4.2 }
  ];

  const remainingStates = 4000 - stateData.reduce((sum, state) => sum + state.patients, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Top 10 states by patient count (uneven distribution across US)
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stateData.map((item) => (
                  <TableRow key={item.state}>
                    <TableCell className="font-medium">{item.state}</TableCell>
                    <TableCell>{item.patients.toLocaleString()}</TableCell>
                    <TableCell>{item.percentage}%</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-medium text-muted-foreground">
                    Other 40 States
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {remainingStates.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">40.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Regional Distribution</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">South</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-3/5 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">3,800</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">West</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-1/2 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">2,500</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Midwest</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-2/5 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">2,200</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Northeast</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full">
                    <div className="w-1/3 h-full bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">1,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicDistribution;
