import { StatCard } from "@/components/ui/stat-card";
import { Activity, AlertCircle, CheckCircle, Users, Database } from "lucide-react";
import { sites, getSitesByStatus, getSitesByHealthStatus, getTotalPatients, getAverageDataQuality } from "@/data/siteData";

export function SiteStatusHeader() {
  const totalSites = sites.length;
  const activeSites = getSitesByStatus('active').length;
  const onboardingSites = getSitesByStatus('onboarding').length;
  const inactiveSites = getSitesByStatus('inactive').length;
  const totalPatients = getTotalPatients();
  const averageDataQuality = getAverageDataQuality();
  
  // Calculate patient count categories
  const highVolumeSites = sites.filter(site => site.patientsEnrolled > 400).length;
  const mediumVolumeSites = sites.filter(site => site.patientsEnrolled >= 100 && site.patientsEnrolled <= 400).length;
  const lowVolumeSites = sites.filter(site => site.patientsEnrolled < 100).length;
  
  // Calculate health status counts for sites with data (matching the list logic)
  const healthySites = sites.filter(site => site.lastDataReceived !== null && site.status !== 'inactive' && site.healthStatus === 'green').length;
  const warningSites = sites.filter(site => site.lastDataReceived !== null && site.status !== 'inactive' && site.healthStatus === 'yellow').length;
  const criticalSites = sites.filter(site => site.lastDataReceived !== null && site.status !== 'inactive' && site.healthStatus === 'red').length;
  const totalHealthSites = healthySites + warningSites + criticalSites;
  
  // Calculate data quality breakdown (same thresholds as in the list)
  const excellentQuality = sites.filter(site => site.dataQualityScore >= 90).length;
  const goodQuality = sites.filter(site => site.dataQualityScore >= 75 && site.dataQualityScore < 90).length;
  const poorQuality = sites.filter(site => site.dataQualityScore < 75).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-lg border p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Sites</span>
          </div>
          <span className="text-2xl font-bold">{totalSites}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Active</span>
            </div>
            <span className="text-sm font-semibold">{activeSites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Onboarding</span>
            </div>
            <span className="text-sm font-semibold">{onboardingSites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-xs">Inactive</span>
            </div>
            <span className="text-sm font-semibold">{inactiveSites}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Patients</span>
          </div>
          <span className="text-2xl font-bold">{totalPatients.toLocaleString()}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">&gt;400</span>
            </div>
            <span className="text-sm font-semibold">{highVolumeSites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">100-400</span>
            </div>
            <span className="text-sm font-semibold">{mediumVolumeSites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">&lt;100</span>
            </div>
            <span className="text-sm font-semibold">{lowVolumeSites}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Data Quality</span>
          </div>
          <span className="text-2xl font-bold">{averageDataQuality}%</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Excellent (≥90%)</span>
            </div>
            <span className="text-sm font-semibold">{excellentQuality}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Good (75-89%)</span>
            </div>
            <span className="text-sm font-semibold">{goodQuality}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Poor (&lt;75%)</span>
            </div>
            <span className="text-sm font-semibold">{poorQuality}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border p-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Health Status</span>
          </div>
          <span className="text-2xl font-bold">{totalHealthSites}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Healthy</span>
            </div>
            <span className="text-sm font-semibold">{healthySites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Warning</span>
            </div>
            <span className="text-sm font-semibold">{warningSites}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Critical</span>
            </div>
            <span className="text-sm font-semibold">{criticalSites}</span>
          </div>
        </div>
      </div>
    </div>
  );
}