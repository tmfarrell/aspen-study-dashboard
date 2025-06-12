
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      <Card>
        <CardHeader>
          <CardTitle>Interactive Geographic Heat Map</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on countries to drill down into regional distribution
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Heat Map</TabsTrigger>
              <TabsTrigger value="table">Distribution Table</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="space-y-6">
              {/* Interactive Heat Map Placeholder */}
              <div className="relative bg-muted rounded-lg p-8 h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold">Interactive Global Heat Map</div>
                  <div className="text-sm text-muted-foreground max-w-md">
                    This would display an interactive world map with heat zones representing patient density. 
                    Click regions to drill down into country-specific distributions.
                  </div>
                  <div className="space-x-4">
                    <Button 
                      variant={selectedCountry === 'usa' ? 'default' : 'outline'}
                      onClick={() => setSelectedCountry(selectedCountry === 'usa' ? null : 'usa')}
                    >
                      Drill Down: USA
                    </Button>
                    <Button 
                      variant={selectedCountry === 'france' ? 'default' : 'outline'}
                      onClick={() => setSelectedCountry(selectedCountry === 'france' ? null : 'france')}
                    >
                      Drill Down: France
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => setSelectedCountry(null)}
                    >
                      Reset to Global
                    </Button>
                  </div>
                </div>
              </div>

              {/* Heat Map Legend */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Patient Density:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-xs">High</span>
                  </div>
                </div>
              </div>
            </TabsContent>

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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeographicDistribution;
