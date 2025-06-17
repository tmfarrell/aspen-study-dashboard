
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const CountryDistribution = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countryData = [
    { country: "United States", patients: 4200, percentage: 42.0, hasRegions: true },
    { country: "Germany", patients: 1920, percentage: 19.2, hasRegions: true },
    { country: "France", patients: 1650, percentage: 16.5, hasRegions: true },
    { country: "Italy", patients: 840, percentage: 8.4, hasRegions: true },
    { country: "Canada", patients: 800, percentage: 8.0, hasRegions: true },
    { country: "United Kingdom", patients: 300, percentage: 3.0, hasRegions: true },
    { country: "Switzerland", patients: 290, percentage: 2.9, hasRegions: true }
  ];

  const regionalData = {
    "United States": [
      { region: "California", patients: 520, percentage: 12.4 },
      { region: "Texas", patients: 462, percentage: 11.0 },
      { region: "Florida", patients: 378, percentage: 9.0 },
      { region: "New York", patients: 336, percentage: 8.0 },
      { region: "Pennsylvania", patients: 294, percentage: 7.0 },
      { region: "Other States", patients: 2210, percentage: 52.6 }
    ],
    "Germany": [
      { region: "Bavaria", patients: 384, percentage: 20.0 },
      { region: "North Rhine-Westphalia", patients: 345, percentage: 18.0 },
      { region: "Baden-Württemberg", patients: 288, percentage: 15.0 },
      { region: "Lower Saxony", patients: 230, percentage: 12.0 },
      { region: "Other States", patients: 673, percentage: 35.0 }
    ],
    "France": [
      { region: "Île-de-France", patients: 380, percentage: 23.0 },
      { region: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0 },
      { region: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0 },
      { region: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0 },
      { region: "Other Regions", patients: 577, percentage: 35.0 }
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

  const getDisplayData = () => {
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
    return countryData;
  };

  const getTableTitle = () => {
    if (selectedCountry) return `${selectedCountry} Regional Distribution`;
    return 'Country Distribution';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: '#003f7f' }}>{getTableTitle()}</CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedCountry ? `Regional breakdown for ${selectedCountry}` : 'Patient distribution across participating countries'}
          </p>
          {selectedCountry && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedCountry(null)}
            >
              ← Back to Countries
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{selectedCountry ? 'Region' : 'Country'}</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Percentage</TableHead>
              {!selectedCountry && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {getDisplayData().map((item) => (
              <TableRow key={item.country || item.region}>
                <TableCell className="font-medium">
                  {item.country || item.region}
                </TableCell>
                <TableCell>{item.patients.toLocaleString()}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
                {!selectedCountry && 'hasRegions' in item && (
                  <TableCell>
                    {item.hasRegions && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedCountry(item.country)}
                      >
                        View Regions
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
  );
};

export default CountryDistribution;
