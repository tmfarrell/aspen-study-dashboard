
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
      { region: "Illinois", patients: 252, percentage: 6.0, hasSites: true },
      { region: "Ohio", patients: 210, percentage: 5.0, hasSites: true },
      { region: "Georgia", patients: 168, percentage: 4.0, hasSites: true },
      { region: "North Carolina", patients: 147, percentage: 3.5, hasSites: true },
      { region: "Michigan", patients: 126, percentage: 3.0, hasSites: true },
      { region: "Other States", patients: 1607, percentage: 38.3, hasSites: true }
    ],
    "Germany": [
      { region: "Bavaria", patients: 384, percentage: 20.0, hasSites: true },
      { region: "North Rhine-Westphalia", patients: 345, percentage: 18.0, hasSites: true },
      { region: "Baden-Württemberg", patients: 288, percentage: 15.0, hasSites: true },
      { region: "Lower Saxony", patients: 230, percentage: 12.0, hasSites: true },
      { region: "Hesse", patients: 192, percentage: 10.0, hasSites: true },
      { region: "Saxony", patients: 154, percentage: 8.0, hasSites: true },
      { region: "Berlin", patients: 115, percentage: 6.0, hasSites: true },
      { region: "Rhineland-Palatinate", patients: 96, percentage: 5.0, hasSites: true },
      { region: "Schleswig-Holstein", patients: 77, percentage: 4.0, hasSites: true },
      { region: "Brandenburg", patients: 39, percentage: 2.0, hasSites: true }
    ],
    "France": [
      { region: "Île-de-France", patients: 380, percentage: 23.0, hasSites: true },
      { region: "Auvergne-Rhône-Alpes", patients: 264, percentage: 16.0, hasSites: true },
      { region: "Provence-Alpes-Côte d'Azur", patients: 231, percentage: 14.0, hasSites: true },
      { region: "Nouvelle-Aquitaine", patients: 198, percentage: 12.0, hasSites: true },
      { region: "Occitanie", patients: 165, percentage: 10.0, hasSites: true },
      { region: "Hauts-de-France", patients: 132, percentage: 8.0, hasSites: true },
      { region: "Grand Est", patients: 115, percentage: 7.0, hasSites: true },
      { region: "Pays de la Loire", patients: 82, percentage: 5.0, hasSites: true },
      { region: "Bretagne", patients: 49, percentage: 3.0, hasSites: true },
      { region: "Normandie", patients: 34, percentage: 2.0, hasSites: true }
    ],
    "Italy": [
      { region: "Lombardy", patients: 218, percentage: 26.0, hasSites: true },
      { region: "Lazio", patients: 168, percentage: 20.0, hasSites: true },
      { region: "Campania", patients: 126, percentage: 15.0, hasSites: true },
      { region: "Veneto", patients: 92, percentage: 11.0, hasSites: true },
      { region: "Sicily", patients: 76, percentage: 9.0, hasSites: true },
      { region: "Piedmont", patients: 59, percentage: 7.0, hasSites: true },
      { region: "Emilia-Romagna", patients: 42, percentage: 5.0, hasSites: true },
      { region: "Tuscany", patients: 34, percentage: 4.0, hasSites: true },
      { region: "Puglia", patients: 17, percentage: 2.0, hasSites: true },
      { region: "Calabria", patients: 8, percentage: 1.0, hasSites: true }
    ],
    "Canada": [
      { region: "Ontario", patients: 320, percentage: 40.0, hasSites: true },
      { region: "Quebec", patients: 200, percentage: 25.0, hasSites: true },
      { region: "British Columbia", patients: 128, percentage: 16.0, hasSites: true },
      { region: "Alberta", patients: 88, percentage: 11.0, hasSites: true },
      { region: "Manitoba", patients: 32, percentage: 4.0, hasSites: true },
      { region: "Saskatchewan", patients: 16, percentage: 2.0, hasSites: true },
      { region: "Nova Scotia", patients: 8, percentage: 1.0, hasSites: true },
      { region: "New Brunswick", patients: 8, percentage: 1.0, hasSites: true }
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
      { region: "Aargau", patients: 29, percentage: 10.0, hasSites: true },
      { region: "St. Gallen", patients: 23, percentage: 8.0, hasSites: true },
      { region: "Geneva", patients: 20, percentage: 7.0, hasSites: true },
      { region: "Lucerne", patients: 17, percentage: 6.0, hasSites: true },
      { region: "Ticino", patients: 13, percentage: 4.0, hasSites: true }
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
