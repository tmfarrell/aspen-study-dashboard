
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
    { region: "United States", patients: 4200, percentage: 42.0, hasRegions: true },
    { region: "Germany", patients: 1920, percentage: 19.2, hasRegions: true },
    { region: "France", patients: 1650, percentage: 16.5, hasRegions: true },
    { region: "Italy", patients: 840, percentage: 8.4, hasRegions: true },
    { region: "Canada", patients: 800, percentage: 8.0, hasRegions: true },
    { region: "United Kingdom", patients: 300, percentage: 3.0, hasRegions: true },
    { region: "Switzerland", patients: 290, percentage: 2.9, hasRegions: true }
  ];

  const regionalData = {
    "United States": [
      { state: "California", patients: 520, percentage: 12.4 },
      { state: "Texas", patients: 462, percentage: 11.0 },
      { state: "Florida", patients: 378, percentage: 9.0 },
      { state: "New York", patients: 336, percentage: 8.0 },
      { state: "Pennsylvania", patients: 294, percentage: 7.0 },
      { state: "Illinois", patients: 252, percentage: 6.0 },
      { state: "Ohio", patients: 210, percentage: 5.0 },
      { state: "Georgia", patients: 168, percentage: 4.0 },
      { state: "North Carolina", patients: 147, percentage: 3.5 },
      { state: "Michigan", patients: 126, percentage: 3.0 }
    ],
    "Germany": [
      { state: "Bavaria", patients: 384, percentage: 20.0 },
      { state: "North Rhine-Westphalia", patients: 345, percentage: 18.0 },
      { state: "Baden-Württemberg", patients: 288, percentage: 15.0 },
      { state: "Lower Saxony", patients: 230, percentage: 12.0 },
      { state: "Hesse", patients: 192, percentage: 10.0 },
      { state: "Saxony", patients: 154, percentage: 8.0 },
      { state: "Berlin", patients: 115, percentage: 6.0 },
      { state: "Rhineland-Palatinate", patients: 96, percentage: 5.0 },
      { state: "Schleswig-Holstein", patients: 77, percentage: 4.0 },
      { state: "Brandenburg", patients: 39, percentage: 2.0 }
    ],
    "France": [
      { state: "Île-de-France", patients: 380, percentage: 23.0 },
      { state: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0 },
      { state: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0 },
      { state: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0 },
      { state: "Occitanie", patients: 165, percentage: 10.0 },
      { state: "Hauts-de-France", patients: 132, percentage: 8.0 },
      { state: "Grand Est", patients: 115, percentage: 7.0 },
      { state: "Pays de la Loire", patients: 82, percentage: 5.0 },
      { state: "Bretagne", patients: 49, percentage: 3.0 },
      { state: "Normandie", patients: 34, percentage: 2.0 }
    ],
    "Italy": [
      { state: "Lombardy", patients: 218, percentage: 26.0 },
      { state: "Lazio", patients: 168, percentage: 20.0 },
      { state: "Campania", patients: 126, percentage: 15.0 },
      { state: "Veneto", patients: 92, percentage: 11.0 },
      { state: "Sicily", patients: 76, percentage: 9.0 },
      { state: "Piedmont", patients: 59, percentage: 7.0 },
      { state: "Emilia-Romagna", patients: 42, percentage: 5.0 },
      { state: "Tuscany", patients: 34, percentage: 4.0 },
      { state: "Puglia", patients: 17, percentage: 2.0 },
      { state: "Calabria", patients: 8, percentage: 1.0 }
    ],
    "Canada": [
      { state: "Ontario", patients: 320, percentage: 40.0 },
      { state: "Quebec", patients: 200, percentage: 25.0 },
      { state: "British Columbia", patients: 128, percentage: 16.0 },
      { state: "Alberta", patients: 88, percentage: 11.0 },
      { state: "Manitoba", patients: 32, percentage: 4.0 },
      { state: "Saskatchewan", patients: 16, percentage: 2.0 },
      { state: "Nova Scotia", patients: 8, percentage: 1.0 },
      { state: "New Brunswick", patients: 8, percentage: 1.0 }
    ],
    "United Kingdom": [
      { state: "England", patients: 225, percentage: 75.0 },
      { state: "Scotland", patients: 45, percentage: 15.0 },
      { state: "Wales", patients: 21, percentage: 7.0 },
      { state: "Northern Ireland", patients: 9, percentage: 3.0 }
    ],
    "Switzerland": [
      { state: "Zurich", patients: 87, percentage: 30.0 },
      { state: "Bern", patients: 58, percentage: 20.0 },
      { state: "Vaud", patients: 43, percentage: 15.0 },
      { state: "Aargau", patients: 29, percentage: 10.0 },
      { state: "St. Gallen", patients: 23, percentage: 8.0 },
      { state: "Geneva", patients: 20, percentage: 7.0 },
      { state: "Lucerne", patients: 17, percentage: 6.0 },
      { state: "Ticino", patients: 13, percentage: 4.0 }
    ]
  };

  const getDisplayData = () => {
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
    return globalData;
  };

  const getTableTitle = () => {
    if (selectedCountry) return `${selectedCountry} Regional Distribution`;
    return 'Global Distribution';
  };

  if (!detailed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle style={{ color: '#003f7f' }}>Geographic Distribution</CardTitle>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {globalData.slice(0, 5).map((item) => (
                <TableRow key={item.region}>
                  <TableCell className="font-medium">{item.region}</TableCell>
                  <TableCell>{item.patients.toLocaleString()}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    {item.hasRegions && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedCountry(item.region)}
                      >
                        Detailed Geography
                      </Button>
                    )}
                  </TableCell>
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
          <CardTitle style={{ color: '#003f7f' }}>Geographic Distribution Details</CardTitle>
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
                  <CardTitle style={{ color: '#003f7f' }}>{getTableTitle()}</CardTitle>
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
                        {!selectedCountry && <TableHead>Actions</TableHead>}
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
                          {!selectedCountry && 'hasRegions' in item && (
                            <TableCell>
                              {item.hasRegions && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedCountry(item.region)}
                                >
                                  Detailed Geography
                                </Button>
                              )}
                            </TableCell>
                          )}
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
