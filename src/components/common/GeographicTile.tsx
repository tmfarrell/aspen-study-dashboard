import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { studyData, StudyType } from "@/data/studyData";

interface GeographicTileProps {
  studyId: StudyType;
}

// US Map GeoURL
const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// EU Map GeoURL (using Natural Earth data)
const euGeoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// World Map GeoURL
const worldGeoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

// Mock data for different regions
const getMockData = (regions: { us: boolean; eu: boolean }) => {
  if (regions.us && !regions.eu) {
    // US-only data
    return {
      type: 'us',
      data: {
        "California": 1250,
        "Texas": 980,
        "Florida": 745,
        "New York": 689,
        "Pennsylvania": 567,
        "Illinois": 456,
        "Ohio": 398,
        "Georgia": 345,
        "North Carolina": 289,
        "Michigan": 234
      }
    };
  } else if (!regions.us && regions.eu) {
    // EU-only data
    return {
      type: 'eu',
      data: {
        "Germany": 1920,
        "France": 1650,
        "Italy": 840,
        "United Kingdom": 300,
        "Spain": 425,
        "Netherlands": 290,
        "Belgium": 185,
        "Austria": 156,
        "Switzerland": 134,
        "Poland": 298
      }
    };
  } else {
    // World data (both regions)
    return {
      type: 'world',
      data: {
        "United States": 4200,
        "Germany": 1920,
        "France": 1650,
        "Italy": 840,
        "Canada": 800,
        "United Kingdom": 300,
        "Spain": 425,
        "Australia": 367,
        "Japan": 234,
        "Brazil": 189
      }
    };
  }
};

export function GeographicTile({ studyId }: GeographicTileProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const study = studyData[studyId];
  const mockData = getMockData(study.regions);
  const maxPatientCount = Math.max(...Object.values(mockData.data));

  const getRegionColor = (regionName: string) => {
    const patientCount = mockData.data[regionName as keyof typeof mockData.data] || 0;
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
    switch (mockData.type) {
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
            scale: 400,
            center: [15, 50] as [number, number]
          },
          getRegionName: (geo: any) => geo.properties.NAME
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
  const totalPatients = Object.values(mockData.data).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="p-6 bg-card border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Geographic Distribution</h3>
        <Badge variant="secondary">
          {totalPatients.toLocaleString()} total patients
        </Badge>
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
                      // Filter for EU countries if EU-only
                      if (mockData.type === 'eu') {
                        const euCountries = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Poland', 'United Kingdom'];
                        return euCountries.includes(regionName);
                      }
                      return true;
                    })
                    .map((geo) => {
                      const regionName = mapConfig.getRegionName(geo);
                      const isSelected = selectedRegion === regionName;
                      const patientCount = mockData.data[regionName as keyof typeof mockData.data] || 0;
                      
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

        {/* Region Stats */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <h4 className="font-semibold">
              {selectedRegion || "All Regions"}
            </h4>
          </div>

          <div className="space-y-2 max-h-[340px] overflow-y-auto">
            {Object.entries(mockData.data)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([region, count], index) => (
                <div
                  key={region}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    selectedRegion === region 
                      ? 'bg-accent/50' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                  onClick={() => handleRegionClick(region)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground font-mono w-6">
                        #{index + 1}
                      </span>
                      <p className="text-sm font-medium truncate">
                        {region}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {count.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">patients</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}