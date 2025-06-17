
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InteractiveWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Global country data with patient counts
  const globalData = [
    { country: "United States", patients: 4200, percentage: 42.0, color: "#003f7f", regions: true },
    { country: "Germany", patients: 1920, percentage: 19.2, color: "#2563eb", regions: true },
    { country: "France", patients: 1650, percentage: 16.5, color: "#3b82f6", regions: true },
    { country: "Italy", patients: 840, percentage: 8.4, color: "#60a5fa", regions: true },
    { country: "Canada", patients: 800, percentage: 8.0, color: "#93c5fd", regions: true },
    { country: "United Kingdom", patients: 300, percentage: 3.0, color: "#bfdbfe", regions: true },
    { country: "Switzerland", patients: 290, percentage: 2.9, color: "#dbeafe", regions: true }
  ];

  const regionalData = {
    "United States": [
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
    ],
    "Germany": [
      { region: "Bavaria", patients: 384, percentage: 20.0 },
      { region: "North Rhine-Westphalia", patients: 345, percentage: 18.0 },
      { region: "Baden-Württemberg", patients: 288, percentage: 15.0 },
      { region: "Lower Saxony", patients: 230, percentage: 12.0 },
      { region: "Hesse", patients: 192, percentage: 10.0 },
      { region: "Other States", patients: 481, percentage: 25.0 }
    ],
    "France": [
      { region: "Île-de-France", patients: 380, percentage: 23.0 },
      { region: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0 },
      { region: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0 },
      { region: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0 },
      { region: "Occitanie", patients: 165, percentage: 10.0 },
      { region: "Other Regions", patients: 412, percentage: 25.0 }
    ],
    "Italy": [
      { region: "Lombardy", patients: 218, percentage: 26.0 },
      { region: "Lazio", patients: 168, percentage: 20.0 },
      { region: "Campania", patients: 126, percentage: 15.0 },
      { region: "Veneto", patients: 92, percentage: 11.0 },
      { region: "Other Regions", patients: 236, percentage: 28.0 }
    ],
    "Canada": [
      { region: "Ontario", patients: 320, percentage: 40.0 },
      { region: "Quebec", patients: 200, percentage: 25.0 },
      { region: "British Columbia", patients: 128, percentage: 16.0 },
      { region: "Alberta", patients: 88, percentage: 11.0 },
      { region: "Other Provinces", patients: 64, percentage: 8.0 }
    ],
    "United Kingdom": [
      { region: "England", patients: 225, percentage: 75.0 },
      { region: "Scotland", patients: 45, percentage: 15.0 },
      { region: "Wales", patients: 21, percentage: 7.0 },
      { region: "Northern Ireland", patients: 9, percentage: 3.0 }
    ],
    "Switzerland": [
      { region: "Zurich", patients: 87, percentage: 30.0 },
      { region: "Bern", patients: 58, percentage: 20.0 },
      { region: "Vaud", patients: 43, percentage: 15.0 },
      { region: "Other Cantons", patients: 102, percentage: 35.0 }
    ]
  };

  const getRegionalData = () => {
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
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
          <CardTitle style={{ color: '#003f7f' }}>Interactive Global Patient Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on countries to drill down into regional data
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* World Map Visualization */}
            <div className="space-y-4">
              <div className="relative rounded-lg p-6 h-[400px] flex flex-col items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold" style={{ color: '#003f7f' }}>Global Patient Distribution Map</div>
                  <div className="text-sm text-muted-foreground max-w-md">
                    Interactive world map showing patient enrollment by country. 
                    Click on countries to view regional breakdown.
                  </div>
                  
                  {/* Country buttons representing map regions */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {globalData.map((country) => (
                      <Button
                        key={country.country}
                        variant={selectedCountry === country.country ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-auto py-2 px-3"
                        style={{ 
                          backgroundColor: selectedCountry === country.country ? '#003f7f' : country.color,
                          color: selectedCountry === country.country ? 'white' : 'white',
                          borderColor: country.color
                        }}
                        onClick={() => handleCountryClick(country.country)}
                        disabled={!country.regions}
                      >
                        <div className="text-center">
                          <div className="font-medium">{country.country}</div>
                          <div className="text-xs">({country.patients.toLocaleString()})</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-4 p-4 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                  <span className="text-sm font-medium">Patient Density:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dbeafe' }}></div>
                    <span className="text-xs">Low</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#003f7f' }}></div>
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
                    <CardTitle className="flex items-center justify-between" style={{ color: '#003f7f' }}>
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
                          <TableHead>Region</TableHead>
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
                    <CardTitle style={{ color: '#003f7f' }}>Global Distribution Summary</CardTitle>
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
