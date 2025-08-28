import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft } from "lucide-react";
import { studyData } from "@/data/studyData";
import { useSites } from "@/state/sites";
import { SiteData, StudyType } from "@/api/types";

// Navigation state for drill-down
interface NavigationState {
  level: 'overview' | 'country' | 'subdivision';
  selectedCountry?: string;
  selectedSubdivision?: string;
}

interface GeographicTileProps {
  studyId: StudyType;
}

// Map URLs
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const euGeoUrl = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson";
const worldGeoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Country-specific map configurations
const countryMaps: Record<string, { geoUrl: string; projection: any; projectionConfig: any; getRegionName: (geo: any) => string }> = {
  "United States": {
    geoUrl: usGeoUrl,
    projection: "geoAlbersUsa" as const,
    projectionConfig: { scale: 600 },
    getRegionName: (geo: any) => geo.properties.name
  },
  "Germany": {
    geoUrl: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_low.geo.json",
    projection: "geoMercator" as const,
    projectionConfig: { scale: 2500, center: [10.5, 51.5] as [number, number] },
    getRegionName: (geo: any) => geo.properties.NAME_1 || geo.properties.name || geo.properties.NAME
  },
  "France": {
    geoUrl: "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson",
    projection: "geoMercator" as const,
    projectionConfig: { scale: 2800, center: [2.5, 46.5] as [number, number] },
    getRegionName: (geo: any) => geo.properties.nom || geo.properties.name || geo.properties.NAME
  },
  "United Kingdom": {
    geoUrl: "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json",
    projection: "geoMercator" as const,
    projectionConfig: { scale: 3200, center: [-2, 54.5] as [number, number] },
    getRegionName: (geo: any) => geo.properties.LAD13NM || geo.properties.name || geo.properties.NAME
  },
  "Italy": {
    geoUrl: "https://raw.githubusercontent.com/stefanocudini/leaflet-geojson-selector/master/examples/italy-regions.json",
    projection: "geoMercator" as const,
    projectionConfig: { scale: 2500, center: [12.5, 41.9] as [number, number] },
    getRegionName: (geo: any) => geo.properties.reg_name || geo.properties.name || geo.properties.NAME
  },
  "Spain": {
    geoUrl: "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/spain-communities.geojson",
    projection: "geoMercator" as const,
    projectionConfig: { scale: 2200, center: [-3.7, 40.4] as [number, number] },
    getRegionName: (geo: any) => geo.properties.name || geo.properties.NAME
  }
};

// Country name mapping for GeoJSON -> our data
const countryNameMapping: Record<string, string> = {
  "United States of America": "United States",
  "USA": "United States",
  "United Kingdom": "United Kingdom",
  "UK": "United Kingdom", 
  "Deutschland": "Germany",
  "Italia": "Italy",
  "España": "Spain",
  "Espagne": "France", // In case of French names
  "Frankreich": "Germany", // In case of German names
  // Add more mappings as needed
};

// Helper function to normalize country names
const normalizeCountryName = (name: string): string => {
  return countryNameMapping[name] || name;
};

// Process site data based on navigation state
const getGeographicData = (sites: SiteData[], regions: { us: boolean; eu: boolean }, navigation: NavigationState) => {
  if (!sites || sites.length === 0) {
    return { type: 'world', data: {}, siteData: {} };
  }

  const data: Record<string, number> = {};
  const siteData: Record<string, number> = {};

  if (navigation.level === 'overview') {
    // Overview level: show countries or states for US-only
    if (regions.us && !regions.eu) {
      // US-only: group by subdivision (state)
      sites.forEach(site => {
        if (site.region === 'us') {
          data[site.subdivision] = (data[site.subdivision] || 0) + site.enrolledPatients;
          siteData[site.subdivision] = (siteData[site.subdivision] || 0) + 1;
        }
      });
      return { type: 'us', data, siteData };
    } else if (!regions.us && regions.eu) {
      // EU-only: group by country
      sites.forEach(site => {
        if (site.region === 'eu') {
          data[site.country] = (data[site.country] || 0) + site.enrolledPatients;
          siteData[site.country] = (siteData[site.country] || 0) + 1;
        }
      });
      return { type: 'eu', data, siteData };
    } else {
      // World: group by country
      sites.forEach(site => {
        data[site.country] = (data[site.country] || 0) + site.enrolledPatients;
        siteData[site.country] = (siteData[site.country] || 0) + 1;
      });
      return { type: 'world', data, siteData };
    }
  } else if (navigation.level === 'country') {
    // Country level: show subdivisions within the selected country
    const countrySites = sites.filter(site => site.country === navigation.selectedCountry);
    countrySites.forEach(site => {
      data[site.subdivision] = (data[site.subdivision] || 0) + site.enrolledPatients;
      siteData[site.subdivision] = (siteData[site.subdivision] || 0) + 1;
    });
    return { type: 'country', data, siteData, selectedCountry: navigation.selectedCountry };
  } else {
    // Subdivision level: show individual sites
    const subdivisionSites = sites.filter(site => 
      site.country === navigation.selectedCountry && site.subdivision === navigation.selectedSubdivision
    );
    subdivisionSites.forEach(site => {
      data[site.name] = site.enrolledPatients;
      siteData[site.name] = 1;
    });
    return { type: 'subdivision', data, siteData, selectedCountry: navigation.selectedCountry, selectedSubdivision: navigation.selectedSubdivision };
  }
};

// Get breakdown data for the regional details panel
const getRegionalBreakdown = (sites: SiteData[], geographicData: any, navigation: NavigationState) => {
  if (!sites || sites.length === 0) return [];

  const breakdown: Array<{ name: string; patients: number; sites: number }> = [];
  
  if (navigation.level === 'overview') {
    // Overview level: show breakdown by countries or states
    const grouped: Record<string, { patients: number; sites: number }> = {};
    
    sites.forEach(site => {
      let key: string;
      
      if (geographicData.type === 'us') {
        key = site.subdivision; // Show states for US-only
      } else {
        key = site.country; // Show countries for world/EU
      }
      
      if (!grouped[key]) {
        grouped[key] = { patients: 0, sites: 0 };
      }
      
      grouped[key].patients += site.enrolledPatients;
      grouped[key].sites += 1;
    });
    
    Object.entries(grouped).forEach(([name, data]) => {
      breakdown.push({ name, patients: data.patients, sites: data.sites });
    });
  } else if (navigation.level === 'country') {
    // Country level: show subdivisions within the selected country
    const countrySites = sites.filter(site => site.country === navigation.selectedCountry);
    const grouped: Record<string, { patients: number; sites: number }> = {};
    
    countrySites.forEach(site => {
      if (!grouped[site.subdivision]) {
        grouped[site.subdivision] = { patients: 0, sites: 0 };
      }
      grouped[site.subdivision].patients += site.enrolledPatients;
      grouped[site.subdivision].sites += 1;
    });
    
    Object.entries(grouped).forEach(([name, data]) => {
      breakdown.push({ name, patients: data.patients, sites: data.sites });
    });
  } else {
    // Subdivision level: show individual sites
    const subdivisionSites = sites.filter(site => 
      site.country === navigation.selectedCountry && site.subdivision === navigation.selectedSubdivision
    );
    
    subdivisionSites.forEach(site => {
      breakdown.push({
        name: site.name,
        patients: site.enrolledPatients,
        sites: 1
      });
    });
  }
  
  return breakdown.sort((a, b) => b.patients - a.patients);
};

export function GeographicTile({ studyId }: GeographicTileProps) {
  const [navigation, setNavigation] = useState<NavigationState>({ level: 'overview' });
  
  const study = studyData[studyId];
  const { data: sitesResponse } = useSites(studyId);
  const sites = sitesResponse?.data || [];
  
  const geographicData = getGeographicData(sites, study.regions, navigation);
  const maxPatientCount = Math.max(...Object.values(geographicData.data).filter(count => count > 0), 1);
  
  console.log('Geographic Data:', geographicData);
  console.log('Max Patient Count:', maxPatientCount);

  const getRegionColor = (regionName: string) => {
    // Normalize the region name to match our data
    const normalizedName = normalizeCountryName(regionName);
    const patientCount = geographicData.data[normalizedName] || 0;
    
    // Debug logging to see what countries are being checked
    if (navigation.level === 'overview' && geographicData.type === 'world') {
      console.log(`GeoJSON: "${regionName}" -> Normalized: "${normalizedName}", patient count: ${patientCount}`);
    }
    
    if (patientCount === 0) return "hsl(var(--muted))";
    
    const intensity = Math.min(patientCount / maxPatientCount, 1);
    
    // Use clearer color gradations
    if (intensity <= 0.2) return "hsl(var(--primary) / 0.3)";
    if (intensity <= 0.4) return "hsl(var(--primary) / 0.5)";
    if (intensity <= 0.6) return "hsl(var(--primary) / 0.7)";
    if (intensity <= 0.8) return "hsl(var(--primary) / 0.85)";
    return "hsl(var(--primary))";
  };

  const handleRegionClick = (regionName: string) => {
    if (navigation.level === 'overview') {
      if (geographicData.type === 'us') {
        // US map: clicking state goes to subdivision level
        setNavigation({ level: 'subdivision', selectedCountry: 'United States', selectedSubdivision: regionName });
      } else {
        // World/EU map: clicking country goes to country level
        setNavigation({ level: 'country', selectedCountry: regionName });
      }
    } else if (navigation.level === 'country') {
      // Country level: clicking subdivision goes to subdivision level
      setNavigation({ 
        level: 'subdivision', 
        selectedCountry: navigation.selectedCountry, 
        selectedSubdivision: regionName 
      });
    }
    // Subdivision level: no further drill-down from map
  };

  const handleBackNavigation = () => {
    if (navigation.level === 'subdivision') {
      if (navigation.selectedCountry === 'United States' && study.regions.us && !study.regions.eu) {
        // US-only study: go back to overview (US map)
        setNavigation({ level: 'overview' });
      } else {
        // Multi-country study: go back to country level
        setNavigation({ level: 'country', selectedCountry: navigation.selectedCountry });
      }
    } else if (navigation.level === 'country') {
      setNavigation({ level: 'overview' });
    }
  };

  const getMapConfig = () => {
    // Special handling for United States at country level
    if (navigation.level === 'country' && navigation.selectedCountry === 'United States') {
      return {
        geoUrl: usGeoUrl,
        projection: "geoAlbersUsa" as const,
        projectionConfig: { scale: 1000 },
        getRegionName: (geo: any) => geo.properties.name
      };
    }
    
    // For US studies at subdivision level, continue showing US map
    if (navigation.level === 'subdivision' && navigation.selectedCountry === 'United States') {
      return {
        geoUrl: usGeoUrl,
        projection: "geoAlbersUsa" as const,
        projectionConfig: { scale: 1000 },
        getRegionName: (geo: any) => geo.properties.name
      };
    }
    
    // For other specific country maps at country or subdivision level
    if ((navigation.level === 'country' || navigation.level === 'subdivision') && 
        navigation.selectedCountry && 
        navigation.selectedCountry !== 'United States' &&
        countryMaps[navigation.selectedCountry]) {
      return countryMaps[navigation.selectedCountry];
    }
    
    // Default maps based on geographic data type
    switch (geographicData.type) {
      case 'us':
        return {
          geoUrl: usGeoUrl,
          projection: "geoAlbersUsa" as const,
          projectionConfig: { scale: 1000 },
          getRegionName: (geo: any) => geo.properties.name
        };
      case 'eu':
        return {
          geoUrl: euGeoUrl,
          projection: "geoMercator" as const,
          projectionConfig: { 
            scale: 600,
            center: [10, 54] as [number, number]
          },
          getRegionName: (geo: any) => geo.properties.NAME_ENGL || geo.properties.NAME || geo.properties.name
        };
      default:
        return {
          geoUrl: worldGeoUrl,
          projection: "geoNaturalEarth1" as const,
          projectionConfig: { 
            scale: 250,
            center: [-10, 45] as [number, number]
          },
          getRegionName: (geo: any) => geo.properties.name || geo.properties.NAME || geo.properties.NAME_EN
        };
    }
  };

  const mapConfig = getMapConfig();
  const totalPatients = Object.values(geographicData.data).reduce((sum, count) => sum + count, 0);
  const totalSites = Object.values(geographicData.siteData).reduce((sum, count) => sum + count, 0);
  
  const regionalBreakdown = getRegionalBreakdown(sites, geographicData, navigation);

  const getNavigationTitle = () => {
    if (navigation.level === 'country') {
      return navigation.selectedCountry;
    } else if (navigation.level === 'subdivision') {
      return `${navigation.selectedSubdivision}, ${navigation.selectedCountry}`;
    }
    return null;
  };

  const handleItemClick = (itemName: string) => {
    if (navigation.level === 'overview') {
      if (geographicData.type === 'us') {
        // US map: clicking state goes to subdivision level
        setNavigation({ level: 'subdivision', selectedCountry: 'United States', selectedSubdivision: itemName });
      } else {
        // World/EU map: clicking country goes to country level
        setNavigation({ level: 'country', selectedCountry: itemName });
      }
    } else if (navigation.level === 'country') {
      // Country level: clicking subdivision goes to subdivision level
      setNavigation({ 
        level: 'subdivision', 
        selectedCountry: navigation.selectedCountry, 
        selectedSubdivision: itemName 
      });
    }
  };

  return (
    <Card className="p-6 bg-card border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Geographic Distribution</h3>
          {navigation.level !== 'overview' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{getNavigationTitle()}</span>
              <button
                onClick={handleBackNavigation}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {totalPatients.toLocaleString()} patients
          </Badge>
          <Badge variant="outline">
            {totalSites} sites
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-muted/30 rounded-lg p-2">
            <ComposableMap 
              projection={mapConfig.projection}
              className="w-full h-[400px]"
              projectionConfig={mapConfig.projectionConfig}
            >
              <Geographies geography={mapConfig.geoUrl}>
                {({ geographies }) =>
                  geographies
                    .filter((geo) => {
                      const regionName = mapConfig.getRegionName(geo);
                      
                      // Debug: Log all region names being processed
                      if (navigation.level === 'overview' && geographicData.type === 'world') {
                        console.log(`Processing region from GeoJSON: "${regionName}"`);
                      }
                      
                      // For overview level with world map, show all countries for now
                      if (navigation.level === 'overview' && geographicData.type === 'world') {
                        return true;
                      }
                      
                      // For US subdivision level, show all US states
                      if (navigation.level === 'subdivision' && navigation.selectedCountry === 'United States') {
                        return true;
                      }
                      
                      // For US map at country level, show all US states
                      if (navigation.level === 'country' && navigation.selectedCountry === 'United States') {
                        return true;
                      }
                      
                      // For country-specific maps, show all regions and add debug logging
                      if (navigation.level === 'country' || navigation.level === 'subdivision') {
                        if (navigation.level === 'country') {
                          console.log(`Country map - Processing region: "${regionName}"`);
                        }
                        return true; // Show all regions for country maps
                      }
                      
                      return true;
                    })
                    .map((geo) => {
                        const regionName = mapConfig.getRegionName(geo);
                        const normalizedName = normalizeCountryName(regionName);
                        const isSelected = (navigation.level === 'subdivision' && navigation.selectedSubdivision === normalizedName) ||
                                         (navigation.level === 'country' && navigation.selectedCountry === normalizedName);
                        const patientCount = geographicData.data[normalizedName] || 0;
                        
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isSelected ? "hsl(var(--accent))" : getRegionColor(regionName)}
                            stroke="hsl(var(--border))"
                            strokeWidth={isSelected ? 2 : 0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { 
                                fill: "hsl(var(--accent))",
                                outline: "none",
                                cursor: navigation.level === 'overview' || patientCount > 0 ? "pointer" : "default"
                              },
                              pressed: { outline: "none" }
                            }}
                            onClick={() => {
                              if (navigation.level === 'subdivision') {
                                // At subdivision level, clicking on a region shows sites in that subdivision
                                return;
                              }
                              // Allow clicking on any country/region, not just those with patients
                              if (navigation.level === 'overview' || patientCount > 0) {
                                handleRegionClick(normalizedName);
                              }
                            }}
                          />
                        );
                    })
                }
              </Geographies>
            </ComposableMap>
            
            {/* Legend */}
            <div className="flex items-center justify-center mt-4 space-x-4 text-xs">
              <span className="text-muted-foreground">Patient Count:</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(var(--primary) / 0.2)" }}></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(var(--primary) / 0.6)" }}></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(var(--primary))" }}></div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">
              {navigation.level === 'overview' 
                ? (geographicData.type === 'us' ? 'By State' : 'By Country')
                : navigation.level === 'country' 
                ? 'By Region/State' 
                : 'Individual Sites'}
            </h4>
            <span className="text-xs text-muted-foreground">
              {regionalBreakdown.length} {
                navigation.level === 'subdivision' ? 'sites' : 
                navigation.level === 'country' ? 'regions' :
                geographicData.type === 'us' ? 'states' : 'countries'
              }
            </span>
          </div>
          
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {regionalBreakdown.map((item, index) => {
              const percentage = totalPatients > 0 ? ((item.patients / totalPatients) * 100).toFixed(1) : "0.0";
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors ${
                    navigation.level !== 'subdivision' ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => navigation.level !== 'subdivision' && handleItemClick(item.name)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.sites} {item.sites === 1 ? 'site' : 'sites'}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-semibold">{item.patients.toLocaleString()} patients</p>
                    <p className="text-xs text-muted-foreground">{percentage}% of total</p>
                  </div>
                </div>
              );
            })}
            
            {regionalBreakdown.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}