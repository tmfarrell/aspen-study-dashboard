
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveWorldMap from './InteractiveWorldMap';

interface GeographicDistributionProps {
  detailed?: boolean;
}

const GeographicDistribution: React.FC<GeographicDistributionProps> = ({ detailed = false }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const globalData = [
    { region: "United States", patients: 4200, percentage: 42.0 },
    { region: "Germany", patients: 1920, percentage: 19.2 },
    { region: "France", patients: 1650, percentage: 16.5 },
    { region: "Italy", patients: 840, percentage: 8.4 },
    { region: "Canada", patients: 800, percentage: 8.0 },
    { region: "United Kingdom", patients: 300, percentage: 3.0 },
    { region: "Switzerland", patients: 290, percentage: 2.9 }
  ];

  const usStateData = [
    { state: "Texas", patients: 520, percentage: 12.4 },
    { state: "California", patients: 462, percentage: 11.0 },
    { state: "Florida", patients: 378, percentage: 9.0 },
    { state: "New York", patients: 336, percentage: 8.0 },
    { state: "Pennsylvania", patients: 294, percentage: 7.0 },
    { state: "Illinois", patients: 252, percentage: 6.0 },
    { state: "Ohio", patients: 210, percentage: 5.0 },
    { state: "Georgia", patients: 168, percentage: 4.0 },
    { state: "North Carolina", patients: 147, percentage: 3.5 },
    { state: "Michigan", patients: 126, percentage: 3.0 }
  ];

  const franceRegionData = [
    { region: "Île-de-France", patients: 380, percentage: 23.0 },
    { region: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0 },
    { region: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0 },
    { region: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0 },
    { region: "Occitanie", patients: 165, percentage: 10.0 },
    { region: "Hauts-de-France", patients: 132, percentage: 8.0 },
    { region: "Grand Est", patients: 115, percentage: 7.0 },
    { region: "Pays de la Loire", patients: 82, percentage: 5.0 },
    { region: "Bretagne", patients: 49, percentage: 3.0 },
    { region: "Normandie", patients: 34, percentage: 2.0 }
  ];

  const getDisplayData = () => {
    if (selectedCountry === 'usa') return usStateData;
    if (selectedCountry === 'france') return franceRegionData;
    return globalData;
  };

  const getTableTitle = () => {
    if (selectedCountry === 'usa') return 'US State Distribution';
    if (selectedCountry === 'france') return 'France Regional Distribution';
    return 'Global Distribution';
  };

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Global patient distribution
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country/Region</TableHead>
                <TableHead>Patients</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {globalData.slice(0, 5).map((item) => (
                <TableRow key={item.region}>
                  <TableCell className="font-medium">{item.region}</TableCell>
                  <TableCell>{item.patients.toLocaleString()}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <InteractiveWorldMap />
      
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of patient enrollment by region
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Distribution Table</TabsTrigger>
              <TabsTrigger value="summary">Regional Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{getTableTitle()}</CardTitle>
                  {selectedCountry && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCountry(null)}
                    >
                      ← Back to Global View
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {selectedCountry ? 'State/Region' : 'Country'}
                        </TableHead>
                        <TableHead>Patients</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDisplayData().map((item) => (
                        <TableRow key={item.region || item.state}>
                          <TableCell className="font-medium">
                            {item.region || item.state}
                          </TableCell>
                          <TableCell>{item.patients.toLocaleString()}</TableCell>
                          <TableCell>{item.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">North America</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">United States</span>
                        <span className="font-semibold">4,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Canada</span>
                        <span className="font-semibold">800</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Total</span>
                        <span className="font-bold">5,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Europe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Germany</span>
                        <span className="font-semibold">1,920</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">France</span>
                        <span className="font-semibold">1,650</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Italy</span>
                        <span className="font-semibold">840</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">UK</span>
                        <span className="font-semibold">300</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Switzerland</span>
                        <span className="font-semibold">290</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Total</span>
                        <span className="font-bold">5,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Distribution Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Countries</span>
                        <span className="font-semibold">7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Regions</span>
                        <span className="font-semibold">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Sites</span>
                        <span className="font-semibold">150+</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm font-medium">Total Patients</span>
                        <span className="font-bold">10,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeographicDistribution;
