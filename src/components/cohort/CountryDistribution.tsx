import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const CountryDistribution = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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
      { region: "California", patients: 520, percentage: 12.4, hasSites: true },
      { region: "Texas", patients: 462, percentage: 11.0, hasSites: true },
      { region: "Florida", patients: 378, percentage: 9.0, hasSites: true },
      { region: "New York", patients: 336, percentage: 8.0, hasSites: true },
      { region: "Pennsylvania", patients: 294, percentage: 7.0, hasSites: true },
      { region: "Other States", patients: 2210, percentage: 52.6, hasSites: true }
    ],
    "Germany": [
      { region: "Bavaria", patients: 384, percentage: 20.0, hasSites: true },
      { region: "North Rhine-Westphalia", patients: 345, percentage: 18.0, hasSites: true },
      { region: "Baden-Württemberg", patients: 288, percentage: 15.0, hasSites: true },
      { region: "Lower Saxony", patients: 230, percentage: 12.0, hasSites: true },
      { region: "Other States", patients: 673, percentage: 35.0, hasSites: true }
    ],
    "France": [
      { region: "Île-de-France", patients: 380, percentage: 23.0, hasSites: true },
      { region: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0, hasSites: true },
      { region: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0, hasSites: true },
      { region: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0, hasSites: true },
      { region: "Other Regions", patients: 577, percentage: 35.0, hasSites: true }
    ],
    "Italy": [
      { region: "Lombardy", patients: 218, percentage: 26.0, hasSites: true },
      { region: "Lazio", patients: 168, percentage: 20.0, hasSites: true },
      { region: "Campania", patients: 126, percentage: 15.0, hasSites: true },
      { region: "Veneto", patients: 92, percentage: 11.0, hasSites: true },
      { region: "Other Regions", patients: 236, percentage: 28.0, hasSites: true }
    ],
    "Canada": [
      { region: "Ontario", patients: 320, percentage: 40.0, hasSites: true },
      { region: "Quebec", patients: 200, percentage: 25.0, hasSites: true },
      { region: "British Columbia", patients: 128, percentage: 16.0, hasSites: true },
      { region: "Alberta", patients: 88, percentage: 11.0, hasSites: true },
      { region: "Other Provinces", patients: 64, percentage: 8.0, hasSites: true }
    ],
    "United Kingdom": [
      { region: "England", patients: 225, percentage: 75.0, hasSites: true },
      { region: "Scotland", patients: 45, percentage: 15.0, hasSites: true },
      { region: "Wales", patients: 21, percentage: 7.0, hasSites: true },
      { region: "Northern Ireland", patients: 9, percentage: 3.0, hasSites: true }
    ],
    "Switzerland": [
      { region: "Zurich", patients: 87, percentage: 30.0, hasSites: true },
      { region: "Bern", patients: 58, percentage: 20.0, hasSites: true },
      { region: "Vaud", patients: 43, percentage: 15.0, hasSites: true },
      { region: "Other Cantons", patients: 102, percentage: 35.0, hasSites: true }
    ]
  };

  const siteData: Record<string, any[]> = {
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
    "Other Regions": [
      { site: "Site A", patients: 216, percentage: 37.4, location: "Various" },
      { site: "Site B", patients: 173, percentage: 30.0, location: "Various" },
      { site: "Site C", patients: 115, percentage: 20.0, location: "Various" },
      { site: "Site D", patients: 73, percentage: 12.6, location: "Various" }
    ],
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
    ]
  };

  const getDisplayData = () => {
    if (selectedRegion && siteData[selectedRegion]) {
      return siteData[selectedRegion];
    }
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
    return countryData;
  };

  const getTableTitle = () => {
    if (selectedRegion) return `${selectedRegion} Site Distribution`;
    if (selectedCountry) return `${selectedCountry} Regional Distribution`;
    return 'Country Distribution';
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
      setSelectedRegion(item.region);
    } else if (!selectedCountry && 'hasRegions' in item && item.hasRegions) {
      setSelectedCountry(item.country);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: '#003f7f' }}>{getTableTitle()}</CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedRegion ? `Site breakdown for ${selectedRegion}` : 
             selectedCountry ? `Regional breakdown for ${selectedCountry}` : 
             'Patient distribution across participating countries'}
          </p>
          {(selectedCountry || selectedRegion) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleBackNavigation}
            >
              ← {selectedRegion ? `Back to ${selectedCountry}` : 'Back to Countries'}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {selectedRegion ? 'Site' : selectedCountry ? 'Region' : 'Country'}
              </TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Percentage</TableHead>
              {selectedRegion && <TableHead>Location</TableHead>}
              {!selectedRegion && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {getDisplayData().map((item) => (
              <TableRow key={item.country || item.region || item.site}>
                <TableCell className="font-medium">
                  {item.country || item.region || item.site}
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
                        {selectedCountry ? 'View Sites' : 'View Regions'}
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
