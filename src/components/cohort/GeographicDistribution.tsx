
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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
      { state: "California", patients: 520, percentage: 12.4, hasSites: true },
      { state: "Texas", patients: 462, percentage: 11.0, hasSites: true },
      { state: "Florida", patients: 378, percentage: 9.0, hasSites: true },
      { state: "New York", patients: 336, percentage: 8.0, hasSites: true },
      { state: "Pennsylvania", patients: 294, percentage: 7.0, hasSites: true },
      { state: "Illinois", patients: 252, percentage: 6.0, hasSites: true },
      { state: "Ohio", patients: 210, percentage: 5.0, hasSites: true },
      { state: "Georgia", patients: 168, percentage: 4.0, hasSites: true },
      { state: "North Carolina", patients: 147, percentage: 3.5, hasSites: true },
      { state: "Michigan", patients: 126, percentage: 3.0, hasSites: true }
    ],
    "Germany": [
      { state: "Bavaria", patients: 384, percentage: 20.0, hasSites: true },
      { state: "North Rhine-Westphalia", patients: 345, percentage: 18.0, hasSites: true },
      { state: "Baden-Württemberg", patients: 288, percentage: 15.0, hasSites: true },
      { state: "Lower Saxony", patients: 230, percentage: 12.0, hasSites: true },
      { state: "Hesse", patients: 192, percentage: 10.0, hasSites: true },
      { state: "Saxony", patients: 154, percentage: 8.0, hasSites: true },
      { state: "Berlin", patients: 115, percentage: 6.0, hasSites: true },
      { state: "Rhineland-Palatinate", patients: 96, percentage: 5.0, hasSites: true },
      { state: "Schleswig-Holstein", patients: 77, percentage: 4.0, hasSites: true },
      { state: "Brandenburg", patients: 39, percentage: 2.0, hasSites: true }
    ],
    "France": [
      { state: "Île-de-France", patients: 380, percentage: 23.0, hasSites: true },
      { state: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0, hasSites: true },
      { state: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0, hasSites: true },
      { state: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0, hasSites: true },
      { state: "Occitanie", patients: 165, percentage: 10.0, hasSites: true },
      { state: "Hauts-de-France", patients: 132, percentage: 8.0, hasSites: true },
      { state: "Grand Est", patients: 115, percentage: 7.0, hasSites: true },
      { state: "Pays de la Loire", patients: 82, percentage: 5.0, hasSites: true },
      { state: "Bretagne", patients: 49, percentage: 3.0, hasSites: true },
      { state: "Normandie", patients: 34, percentage: 2.0, hasSites: true }
    ],
    "Italy": [
      { state: "Lombardy", patients: 218, percentage: 26.0, hasSites: true },
      { state: "Lazio", patients: 168, percentage: 20.0, hasSites: true },
      { state: "Campania", patients: 126, percentage: 15.0, hasSites: true },
      { state: "Veneto", patients: 92, percentage: 11.0, hasSites: true },
      { state: "Sicily", patients: 76, percentage: 9.0, hasSites: true },
      { state: "Piedmont", patients: 59, percentage: 7.0, hasSites: true },
      { state: "Emilia-Romagna", patients: 42, percentage: 5.0, hasSites: true },
      { state: "Tuscany", patients: 34, percentage: 4.0, hasSites: true },
      { state: "Puglia", patients: 17, percentage: 2.0, hasSites: true },
      { state: "Calabria", patients: 8, percentage: 1.0, hasSites: true }
    ],
    "Canada": [
      { state: "Ontario", patients: 320, percentage: 40.0, hasSites: true },
      { state: "Quebec", patients: 200, percentage: 25.0, hasSites: true },
      { state: "British Columbia", patients: 128, percentage: 16.0, hasSites: true },
      { state: "Alberta", patients: 88, percentage: 11.0, hasSites: true },
      { state: "Manitoba", patients: 32, percentage: 4.0, hasSites: true },
      { state: "Saskatchewan", patients: 16, percentage: 2.0, hasSites: true },
      { state: "Nova Scotia", patients: 8, percentage: 1.0, hasSites: true },
      { state: "New Brunswick", patients: 8, percentage: 1.0, hasSites: true }
    ],
    "United Kingdom": [
      { state: "England", patients: 225, percentage: 75.0, hasSites: true },
      { state: "Scotland", patients: 45, percentage: 15.0, hasSites: true },
      { state: "Wales", patients: 21, percentage: 7.0, hasSites: true },
      { state: "Northern Ireland", patients: 9, percentage: 3.0, hasSites: true }
    ],
    "Switzerland": [
      { state: "Zurich", patients: 87, percentage: 30.0, hasSites: true },
      { state: "Bern", patients: 58, percentage: 20.0, hasSites: true },
      { state: "Vaud", patients: 43, percentage: 15.0, hasSites: true },
      { state: "Aargau", patients: 29, percentage: 10.0, hasSites: true },
      { state: "St. Gallen", patients: 23, percentage: 8.0, hasSites: true },
      { state: "Geneva", patients: 20, percentage: 7.0, hasSites: true },
      { state: "Lucerne", patients: 17, percentage: 6.0, hasSites: true },
      { state: "Ticino", patients: 13, percentage: 4.0, hasSites: true }
    ]
  };

  const siteData: Record<string, any[]> = {
    // United States Sites
    "California": [
      { site: "Site A", patients: 182, percentage: 35.0, location: "Los Angeles" },
      { site: "Site B", patients: 156, percentage: 30.0, location: "San Francisco" },
      { site: "Site C", patients: 104, percentage: 20.0, location: "San Diego" },
      { site: "Site D", patients: 78, percentage: 15.0, location: "Sacramento" }
    ],
    "Texas": [
      { site: "Site A", patients: 162, percentage: 35.1, location: "Houston" },
      { site: "Site B", patients: 139, percentage: 30.1, location: "Dallas" },
      { site: "Site C", patients: 92, percentage: 19.9, location: "Austin" },
      { site: "Site D", patients: 69, percentage: 14.9, location: "San Antonio" }
    ],
    "Florida": [
      { site: "Site A", patients: 132, percentage: 34.9, location: "Miami" },
      { site: "Site B", patients: 113, percentage: 29.9, location: "Tampa" },
      { site: "Site C", patients: 76, percentage: 20.1, location: "Orlando" },
      { site: "Site D", patients: 57, percentage: 15.1, location: "Jacksonville" }
    ],
    "New York": [
      { site: "Site A", patients: 118, percentage: 35.1, location: "New York City" },
      { site: "Site B", patients: 101, percentage: 30.1, location: "Buffalo" },
      { site: "Site C", patients: 67, percentage: 19.9, location: "Rochester" },
      { site: "Site D", patients: 50, percentage: 14.9, location: "Syracuse" }
    ],
    "Pennsylvania": [
      { site: "Site A", patients: 103, percentage: 35.0, location: "Philadelphia" },
      { site: "Site B", patients: 88, percentage: 29.9, location: "Pittsburgh" },
      { site: "Site C", patients: 59, percentage: 20.1, location: "Allentown" },
      { site: "Site D", patients: 44, percentage: 15.0, location: "Erie" }
    ],
    
    // France Sites
    "Île-de-France": [
      { site: "Site A", patients: 142, percentage: 37.4, location: "Paris" },
      { site: "Site B", patients: 95, percentage: 25.0, location: "Versailles" },
      { site: "Site C", patients: 76, percentage: 20.0, location: "Créteil" },
      { site: "Site D", patients: 67, percentage: 17.6, location: "Bobigny" }
    ],
    "Auvergne-Rhône-Alpes": [
      { site: "Site A", patients: 92, percentage: 34.8, location: "Lyon" },
      { site: "Site B", patients: 79, percentage: 29.9, location: "Grenoble" },
      { site: "Site C", patients: 58, percentage: 22.0, location: "Saint-Étienne" },
      { site: "Site D", patients: 35, percentage: 13.3, location: "Clermont-Ferrand" }
    ],
    "Provence-Alpes-Côte d'Azur": [
      { site: "Site A", patients: 85, percentage: 36.8, location: "Marseille" },
      { site: "Site B", patients: 69, percentage: 29.9, location: "Nice" },
      { site: "Site C", patients: 46, percentage: 19.9, location: "Toulon" },
      { site: "Site D", patients: 31, percentage: 13.4, location: "Avignon" }
    ],
    "Nouvelle-Aquitaine": [
      { site: "Site A", patients: 71, percentage: 35.9, location: "Bordeaux" },
      { site: "Site B", patients: 59, percentage: 29.8, location: "Toulouse" },
      { site: "Site C", patients: 40, percentage: 20.2, location: "Poitiers" },
      { site: "Site D", patients: 28, percentage: 14.1, location: "Limoges" }
    ],
    "Occitanie": [
      { site: "Site A", patients: 58, percentage: 35.2, location: "Montpellier" },
      { site: "Site B", patients: 50, percentage: 30.3, location: "Toulouse" },
      { site: "Site C", patients: 33, percentage: 20.0, location: "Nîmes" },
      { site: "Site D", patients: 24, percentage: 14.5, location: "Perpignan" }
    ],
    "Hauts-de-France": [
      { site: "Site A", patients: 46, percentage: 34.8, location: "Lille" },
      { site: "Site B", patients: 40, percentage: 30.3, location: "Amiens" },
      { site: "Site C", patients: 26, percentage: 19.7, location: "Reims" },
      { site: "Site D", patients: 20, percentage: 15.2, location: "Calais" }
    ],
    
    // Germany Sites
    "Bavaria": [
      { site: "Site A", patients: 134, percentage: 34.9, location: "Munich" },
      { site: "Site B", patients: 115, percentage: 29.9, location: "Nuremberg" },
      { site: "Site C", patients: 77, percentage: 20.1, location: "Würzburg" },
      { site: "Site D", patients: 58, percentage: 15.1, location: "Regensburg" }
    ],
    "North Rhine-Westphalia": [
      { site: "Site A", patients: 121, percentage: 35.1, location: "Cologne" },
      { site: "Site B", patients: 104, percentage: 30.1, location: "Düsseldorf" },
      { site: "Site C", patients: 69, percentage: 20.0, location: "Dortmund" },
      { site: "Site D", patients: 51, percentage: 14.8, location: "Essen" }
    ],
    "Baden-Württemberg": [
      { site: "Site A", patients: 101, percentage: 35.1, location: "Stuttgart" },
      { site: "Site B", patients: 86, percentage: 29.9, location: "Mannheim" },
      { site: "Site C", patients: 58, percentage: 20.1, location: "Karlsruhe" },
      { site: "Site D", patients: 43, percentage: 14.9, location: "Ulm" }
    ],
    "Lower Saxony": [
      { site: "Site A", patients: 81, percentage: 35.2, location: "Hanover" },
      { site: "Site B", patients: 69, percentage: 30.0, location: "Braunschweig" },
      { site: "Site C", patients: 46, percentage: 20.0, location: "Osnabrück" },
      { site: "Site D", patients: 34, percentage: 14.8, location: "Göttingen" }
    ],
    
    // Italy Sites
    "Lombardy": [
      { site: "Site A", patients: 76, percentage: 34.9, location: "Milan" },
      { site: "Site B", patients: 65, percentage: 29.8, location: "Bergamo" },
      { site: "Site C", patients: 44, percentage: 20.2, location: "Brescia" },
      { site: "Site D", patients: 33, percentage: 15.1, location: "Pavia" }
    ],
    "Lazio": [
      { site: "Site A", patients: 59, percentage: 35.1, location: "Rome" },
      { site: "Site B", patients: 50, percentage: 29.8, location: "Latina" },
      { site: "Site C", patients: 34, percentage: 20.2, location: "Viterbo" },
      { site: "Site D", patients: 25, percentage: 14.9, location: "Frosinone" }
    ],
    "Campania": [
      { site: "Site A", patients: 44, percentage: 34.9, location: "Naples" },
      { site: "Site B", patients: 38, percentage: 30.2, location: "Salerno" },
      { site: "Site C", patients: 25, percentage: 19.8, location: "Caserta" },
      { site: "Site D", patients: 19, percentage: 15.1, location: "Avellino" }
    ],
    
    // Canada Sites
    "Ontario": [
      { site: "Site A", patients: 112, percentage: 35.0, location: "Toronto" },
      { site: "Site B", patients: 96, percentage: 30.0, location: "Ottawa" },
      { site: "Site C", patients: 64, percentage: 20.0, location: "Hamilton" },
      { site: "Site D", patients: 48, percentage: 15.0, location: "London" }
    ],
    "Quebec": [
      { site: "Site A", patients: 70, percentage: 35.0, location: "Montreal" },
      { site: "Site B", patients: 60, percentage: 30.0, location: "Quebec City" },
      { site: "Site C", patients: 40, percentage: 20.0, location: "Sherbrooke" },
      { site: "Site D", patients: 30, percentage: 15.0, location: "Trois-Rivières" }
    ],
    "British Columbia": [
      { site: "Site A", patients: 45, percentage: 35.2, location: "Vancouver" },
      { site: "Site B", patients: 38, percentage: 29.7, location: "Victoria" },
      { site: "Site C", patients: 26, percentage: 20.3, location: "Burnaby" },
      { site: "Site D", patients: 19, percentage: 14.8, location: "Richmond" }
    ],
    
    // UK Sites
    "England": [
      { site: "Site A", patients: 79, percentage: 35.1, location: "London" },
      { site: "Site B", patients: 68, percentage: 30.2, location: "Manchester" },
      { site: "Site C", patients: 45, percentage: 20.0, location: "Birmingham" },
      { site: "Site D", patients: 33, percentage: 14.7, location: "Leeds" }
    ],
    "Scotland": [
      { site: "Site A", patients: 16, percentage: 35.6, location: "Edinburgh" },
      { site: "Site B", patients: 14, percentage: 31.1, location: "Glasgow" },
      { site: "Site C", patients: 9, percentage: 20.0, location: "Aberdeen" },
      { site: "Site D", patients: 6, percentage: 13.3, location: "Dundee" }
    ],
    "Wales": [
      { site: "Site A", patients: 7, percentage: 33.3, location: "Cardiff" },
      { site: "Site B", patients: 6, percentage: 28.6, location: "Swansea" },
      { site: "Site C", patients: 4, percentage: 19.0, location: "Newport" },
      { site: "Site D", patients: 4, percentage: 19.0, location: "Wrexham" }
    ],
    
    // Switzerland Sites
    "Zurich": [
      { site: "Site A", patients: 30, percentage: 34.5, location: "Zurich" },
      { site: "Site B", patients: 26, percentage: 29.9, location: "Winterthur" },
      { site: "Site C", patients: 17, percentage: 19.5, location: "Uster" },
      { site: "Site D", patients: 14, percentage: 16.1, location: "Rapperswil" }
    ],
    "Bern": [
      { site: "Site A", patients: 20, percentage: 34.5, location: "Bern" },
      { site: "Site B", patients: 17, percentage: 29.3, location: "Thun" },
      { site: "Site C", patients: 12, percentage: 20.7, location: "Biel" },
      { site: "Site D", patients: 9, percentage: 15.5, location: "Burgdorf" }
    ],
    "Vaud": [
      { site: "Site A", patients: 15, percentage: 34.9, location: "Lausanne" },
      { site: "Site B", patients: 13, percentage: 30.2, location: "Montreux" },
      { site: "Site C", patients: 9, percentage: 20.9, location: "Yverdon" },
      { site: "Site D", patients: 6, percentage: 14.0, location: "Nyon" }
    ]
  };

  const getDisplayData = () => {
    if (selectedRegion && siteData[selectedRegion]) {
      return siteData[selectedRegion];
    }
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
    return globalData;
  };

  const getTableTitle = () => {
    if (selectedRegion) return `${selectedRegion} Site Distribution`;
    if (selectedCountry) return `${selectedCountry} Regional Distribution`;
    return 'Global Distribution';
  };

  const handleBackNavigation = () => {
    if (selectedRegion) {
      setSelectedRegion(null);
    } else if (selectedCountry) {
      setSelectedCountry(null);
    }
  };

  const handleRowClick = (item: any) => {
    if (selectedCountry && !selectedRegion && 'hasSites' in item && item.hasSites) {
      setSelectedRegion(item.state);
    } else if (!selectedCountry && 'hasRegions' in item && item.hasRegions) {
      setSelectedCountry(item.region);
    }
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
                  {(selectedCountry || selectedRegion) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleBackNavigation}
                    >
                      ← {selectedRegion ? `Back to ${selectedCountry}` : 'Back to Global View'}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {selectedRegion ? 'Site' : selectedCountry ? 'State/Region' : 'Country'}
                        </TableHead>
                        <TableHead>Patients</TableHead>
                        <TableHead>Percentage</TableHead>
                        {selectedRegion && <TableHead>Location</TableHead>}
                        {!selectedRegion && <TableHead>Actions</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getDisplayData().map((item, index) => (
                        <TableRow key={item.region || item.state || item.site || index}>
                          <TableCell className="font-medium">
                            {item.region || item.state || item.site}
                          </TableCell>
                          <TableCell>{item.patients.toLocaleString()}</TableCell>
                          <TableCell>{item.percentage}%</TableCell>
                          {selectedRegion && (
                            <TableCell className="text-sm text-muted-foreground">
                              {item.location}
                            </TableCell>
                          )}
                          {!selectedRegion && (
                            <TableCell>
                              {((selectedCountry && 'hasSites' in item && item.hasSites) || 
                               (!selectedCountry && 'hasRegions' in item && item.hasRegions)) && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRowClick(item)}
                                >
                                  {selectedCountry ? 'View Sites' : 'Detailed Geography'}
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
