import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { studyData } from "@/data/studyData";
import { useSites } from "@/state/sites";
import { SiteData, StudyType } from "@/api/types";

interface GeographicTileProps {
  studyId: StudyType;
}

// US Map GeoURL
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// EU Map GeoURL (Europe-specific)
const euGeoUrl = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson";

// World Map GeoURL
const worldGeoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Process site data into geographic data
const getGeographicData = (sites: SiteData[], regions: { us: boolean; eu: boolean }) => {
  if (!sites || sites.length === 0) {
    return { type: 'world', data: {}, siteData: {} };
  }

  const data: Record<string, number> = {};
  const siteData: Record<string, number> = {};

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
};

// Get breakdown data for the regional details panel
const getRegionalBreakdown = (sites: SiteData[], geographicData: any, selectedRegion: string | null) => {
  if (!sites || sites.length === 0) return [];

  const breakdown: Array<{ name: string; patients: number; sites: number }> = [];
  
  if (selectedRegion) {
    // If a region is selected, show site-level details for that region
    const regionSites = sites.filter(site => {
      if (geographicData.type === 'us') {
        return site.subdivision === selectedRegion;
      } else {
        return site.country === selectedRegion;
      }
    });
    
    regionSites.forEach(site => {
      breakdown.push({
        name: site.name,
        patients: site.enrolledPatients,
        sites: 1
      });
    });
  } else {
    // No region selected, show breakdown by next level
    const grouped: Record<string, { patients: number; sites: number }> = {};
    
    sites.forEach(site => {
      let key: string;
      
      if (geographicData.type === 'us') {
        // US map: group by state
        key = site.subdivision;
      } else {
        // World or EU map: group by country
        key = site.country;
      }
      
      if (!grouped[key]) {
        grouped[key] = { patients: 0, sites: 0 };
      }
      
      grouped[key].patients += site.enrolledPatients;
      grouped[key].sites += 1;
    });
    
    Object.entries(grouped).forEach(([name, data]) => {
      breakdown.push({
        name,
        patients: data.patients,
        sites: data.sites
      });
    });
  }
  
  // Sort by patient count descending
  return breakdown.sort((a, b) => b.patients - a.patients);
};

export function GeographicTile({ studyId }: GeographicTileProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const study = studyData[studyId];
  const { data: sitesResponse } = useSites(studyId);
  const sites = sitesResponse?.data || [];
  
  const geographicData = getGeographicData(sites, study.regions);
  const maxPatientCount = Math.max(...Object.values(geographicData.data), 1);

  const getRegionColor = (regionName: string) => {
    const patientCount = geographicData.data[regionName as keyof typeof geographicData.data] || 0;
    const intensity = patientCount / maxPatientCount;
    
    if (intensity === 0) return "hsl(var(--muted))";
    if (intensity < 0.2) return "hsl(var(--primary) / 0.2)";
    if (intensity < 0.4) return "hsl(var(--primary) / 0.4)";
    if (intensity < 0.6) return "hsl(var(--primary) / 0.6)";
    if (intensity < 0.8) return "hsl(var(--primary) / 0.8)";
    return "hsl(var(--primary))";
  };

  const handleRegionClick = (regionName: string) => {
    setSelectedRegion(selectedRegion === regionName ? null : regionName);
  };

  const getMapConfig = () => {
    switch (geographicData.type) {
      case 'us':
        return {
          geoUrl: usGeoUrl,
          projection: "geoAlbersUsa" as const,
          projectionConfig: { scale: 600 },
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
          projectionConfig: { scale: 120 },
          getRegionName: (geo: any) => geo.properties.NAME
        };
    }
  };

  const mapConfig = getMapConfig();
  const totalPatients = Object.values(geographicData.data).reduce((sum, count) => sum + count, 0);
  const totalSites = Object.values(geographicData.siteData).reduce((sum, count) => sum + count, 0);
  
  const selectedPatients = selectedRegion ? geographicData.data[selectedRegion] || 0 : totalPatients;
  const selectedSites = selectedRegion ? geographicData.siteData[selectedRegion] || 0 : totalSites;
  
  const regionalBreakdown = getRegionalBreakdown(sites, geographicData, selectedRegion);

  return (
    <Card className="p-6 bg-card border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Geographic Distribution</h3>
          {selectedRegion && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{selectedRegion}</span>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to all regions
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {selectedPatients.toLocaleString()} patients
          </Badge>
          <Badge variant="outline">
            {selectedSites} sites
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
                      // For EU maps, the Europe GeoJSON should already be filtered to EU countries
                      if (geographicData.type === 'eu') {
                        return true; // Europe GeoJSON should only contain European countries
                      }
                      return true;
                    })
                    .map((geo) => {
                      const regionName = mapConfig.getRegionName(geo);
                      const isSelected = selectedRegion === regionName;
                      const patientCount = geographicData.data[regionName as keyof typeof geographicData.data] || 0;
                      
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
                              cursor: patientCount > 0 ? "pointer" : "default"
                            },
                            pressed: { outline: "none" }
                          }}
                          onClick={() => patientCount > 0 && handleRegionClick(regionName)}
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

        {/* Regional Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">
              {selectedRegion ? `Sites in ${selectedRegion}` : 
                geographicData.type === 'us' ? 'By State' : 'By Country'}
            </h4>
            <span className="text-xs text-muted-foreground">
              {regionalBreakdown.length} {selectedRegion ? 'sites' : geographicData.type === 'us' ? 'states' : 'countries'}
            </span>
          </div>
          
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {regionalBreakdown.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => !selectedRegion && handleRegionClick(item.name)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.sites} {item.sites === 1 ? 'site' : 'sites'}
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-semibold">{item.patients.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">patients</p>
                </div>
              </div>
            ))}
            
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