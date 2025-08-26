import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin, Building2 } from "lucide-react";
import { hospitals, getHospitalsByState, getTotalCasesByState, type Hospital } from "@/data/hospitalData";
import { stateStatistics } from "@/data/patientData";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const ITEMS_PER_PAGE = 8;

export function GeographicDistributionMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const selectedStateHospitals = getHospitalsByState(selectedState);
  const totalCases = getTotalCasesByState(selectedState);
  const totalPages = Math.ceil(selectedStateHospitals.length / ITEMS_PER_PAGE);
  
  const paginatedHospitals = selectedStateHospitals.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Create a map for state patient counts from existing state statistics
  const statePatientCounts = stateStatistics.reduce((acc, stat) => {
    acc[stat.state] = stat.patientCount;
    return acc;
  }, {} as Record<string, number>);

  const maxPatientCount = Math.max(...stateStatistics.map(s => s.patientCount));

  const getStateColor = (stateName: string) => {
    const patientCount = statePatientCounts[stateName] || 0;
    const intensity = patientCount / maxPatientCount;
    
    if (intensity === 0) return "hsl(var(--muted))";
    if (intensity < 0.2) return "hsl(var(--primary) / 0.2)";
    if (intensity < 0.4) return "hsl(var(--primary) / 0.4)";
    if (intensity < 0.6) return "hsl(var(--primary) / 0.6)";
    if (intensity < 0.8) return "hsl(var(--primary) / 0.8)";
    return "hsl(var(--primary))";
  };

  const handleStateClick = (stateName: string) => {
    if (selectedState === stateName) {
      setSelectedState(null);
    } else {
      setSelectedState(stateName);
    }
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card className="p-6 bg-card border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Geographic Distribution</h3>
        {selectedState && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedState(null);
              setCurrentPage(0);
            }}
          >
            Show All States
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="bg-muted/30 rounded-lg p-2">
            <ComposableMap 
              projection="geoAlbersUsa" 
              className="w-full h-[500px]"
              projectionConfig={{
                scale: 900,
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    const isSelected = selectedState === stateName;
                    const patientCount = statePatientCounts[stateName] || 0;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isSelected ? "hsl(var(--accent))" : getStateColor(stateName)}
                        stroke="hsl(var(--border))"
                        strokeWidth={isSelected ? 2 : 0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { 
                            fill: "hsl(var(--accent))",
                            outline: "none",
                            cursor: "pointer"
                          },
                          pressed: { outline: "none" }
                        }}
                        onClick={() => handleStateClick(stateName)}
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

        {/* Hospital Institutions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <h4 className="font-semibold">
                {selectedState || "Total"}
              </h4>
            </div>
            <Badge variant="secondary">
              {totalCases.toLocaleString()} cases
            </Badge>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {paginatedHospitals.map((hospital, index) => (
              <div
                key={hospital.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start space-x-2">
                    <span className="text-xs text-muted-foreground font-mono w-6">
                      #{currentPage * ITEMS_PER_PAGE + index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {hospital.name}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{hospital.city}, {hospital.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {hospital.caseCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">cases</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}