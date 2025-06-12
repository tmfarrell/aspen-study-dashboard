
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CountryDistribution = () => {
  const countryData = [
    { country: "United States", patients: 4200, percentage: 42.0 },
    { country: "Germany", patients: 1920, percentage: 19.2 },
    { country: "France", patients: 1650, percentage: 16.5 },
    { country: "Italy", patients: 840, percentage: 8.4 },
    { country: "Canada", patients: 800, percentage: 8.0 },
    { country: "United Kingdom", patients: 300, percentage: 3.0 },
    { country: "Switzerland", patients: 290, percentage: 2.9 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Country Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Patient distribution across participating countries
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countryData.map((item) => (
              <TableRow key={item.country}>
                <TableCell className="font-medium">{item.country}</TableCell>
                <TableCell>{item.patients.toLocaleString()}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CountryDistribution;
