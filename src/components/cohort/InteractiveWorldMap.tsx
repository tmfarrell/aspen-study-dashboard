
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InteractiveWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Global country data with patient counts
  const globalData = [
    { country: "United States", patients: 4200, percentage: 42.0, color: "#ff4444", regions: true },
    { country: "Germany", patients: 1920, percentage: 19.2, color: "#ff6666", regions: false },
    { country: "France", patients: 1650, percentage: 16.5, color: "#ff8888", regions: true },
    { country: "Italy", patients: 840, percentage: 8.4, color: "#ffaaaa", regions: false },
    { country: "Canada", patients: 800, percentage: 8.0, color: "#ffaaaa", regions: false },
    { country: "United Kingdom", patients: 300, percentage: 3.0, color: "#ffcccc", regions: false },
    { country: "Switzerland", patients: 290, percentage: 2.9, color: "#ffcccc", regions: false }
  ];

  const usStateData = [
    { region: "California", patients: 520, percentage: 12.4 },
    { region: "Texas", patients: 462, percentage: 11.0 },
    { region: "Florida", patients: 378, percentage: 9.0 },
    { region: "New York", patients: 336, percentage: 8.0 },
    { region: "Pennsylvania", patients: 294, percentage: 7.0 },
    { region: "Illinois", patients: 252, percentage: 6.0 },
    { region: "Ohio", patients: 210, percentage: 5.0 },
    { region: "Georgia", patients: 168, percentage: 4.0 },
    { region: "North Carolina", patients: 147, percentage: 3.5 },
    { region: "Michigan", patients: 126, percentage: 3.0 },
    { region: "Other States", patients: 1307, percentage: 31.1 }
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

  const getRegionalData = () => {
    if (selectedCountry === 'United States') return usStateData;
    if (selectedCountry === 'France') return franceRegionData;
    return [];
  };

  const handleCountryClick = (country: string) => {
    const countryData = globalData.find(c => c.country === country);
    if (countryData?.regions) {
      setSelectedCountry(country);
      setSelectedRegion(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Interactive Global Patient Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on countries with regional data available (US, France) to drill down
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* World Map Visualization */}
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg p-6 h-[400px] flex flex-col items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold">Global Patient Distribution Map</div>
                  <div className="text-sm text-muted-foreground max-w-md">
                    Interactive world map showing patient enrollment by country. 
                    Darker colors indicate higher patient counts.
                  </div>
                  
                  {/* Country buttons representing map regions */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {globalData.map((country) => (
                      <Button
                        key={country.country}
                        variant={selectedCountry === country.country ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-8"
                        style={{ 
                          backgroundColor: selectedCountry === country.country ? '#3b82f6' : country.color,
                          color: selectedCountry === country.country ? 'white' : '#1f2937',
                          borderColor: country.color
                        }}
                        onClick={() => handleCountryClick(country.country)}
                        disabled={!country.regions}
                      >
                        {country.country}
                        <br />
                        ({country.patients.toLocaleString()})
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Patient Density:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-xs">High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Country/Regional Details */}
            <div className="space-y-4">
              {selectedCountry ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedCountry} Regional Distribution
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCountry(null)}
                      >
                        ← Back to Global
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{selectedCountry === 'United States' ? 'State' : 'Region'}</TableHead>
                          <TableHead>Patients</TableHead>
                          <TableHead>%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getRegionalData().map((region) => (
                          <TableRow key={region.region}>
                            <TableCell className="font-medium">{region.region}</TableCell>
                            <TableCell>{region.patients.toLocaleString()}</TableCell>
                            <TableCell>{region.percentage}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Global Distribution Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Patients</TableHead>
                          <TableHead>%</TableHead>
                          <TableHead>Drill Down</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {globalData.map((country) => (
                          <TableRow key={country.country}>
                            <TableCell className="font-medium">{country.country}</TableCell>
                            <TableCell>{country.patients.toLocaleString()}</TableCell>
                            <TableCell>{country.percentage}%</TableCell>
                            <TableCell>
                              {country.regions ? (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCountryClick(country.country)}
                                >
                                  View Regions
                                </Button>
                              ) : (
                                <span className="text-muted-foreground text-sm">N/A</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveWorldMap;
