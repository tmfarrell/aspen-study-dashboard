import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Badge } from "@/components/ui/badge";
import { SiteData } from "@/api/types";
import { Users, Database, TrendingUp, Activity, AlertTriangle, CheckCircle, Calendar, Wifi } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface SiteOverviewTabProps {
  site: SiteData;
}

export function SiteOverviewTab({ site }: SiteOverviewTabProps) {
  // Generate some additional mock data for demonstration
  const enrollmentTrend = Math.random() > 0.5 ? 
    { value: Math.floor(Math.random() * 15) + 5, isPositive: true } :
    { value: Math.floor(Math.random() * 8) + 2, isPositive: false };
  
  const dataVolumeTrend = Math.random() > 0.3 ? 
    { value: Math.floor(Math.random() * 20) + 10, isPositive: true } :
    { value: Math.floor(Math.random() * 10) + 3, isPositive: false };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Patients"
          value={site.enrolledPatients.toLocaleString()}
          subtitle="Enrolled in studies"
          trend={enrollmentTrend}
          icon={<Users className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Active Cases"
          value="Active"
          subtitle="Currently active"
          icon={<Database className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Data Quality"
          value={`${site.dataQuality}%`}
          subtitle="Overall score"
          trend={dataVolumeTrend}
          icon={<Activity className="h-5 w-5" />}
        />
        
        <MetricCard
          title="Monthly Growth"
          value={`+${Math.floor(Math.random() * 50) + 20}`}
          subtitle="New enrollments"
          trend={{ value: 12, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Site Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Connection Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connection Type</span>
              <Badge variant="outline">API</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Data Sync</span>
              <div className="text-right">
                {site.lastDataReceived ? (
                  <>
                    <div className="text-sm font-medium">
                      {format(new Date(site.lastDataReceived), new Date(site.lastDataReceived).getFullYear() === new Date().getFullYear() ? 'MMM d' : 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(site.lastDataReceived), { addSuffix: true })}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">No data received</div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sync Frequency</span>
              <span className="text-sm font-medium">
                {site.connectionMethod === 'FHIR' ? 'Real-time' : 'Daily at 2 AM'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Format</span>
              <span className="text-sm font-medium">
                {site.connectionMethod === 'FHIR' ? 'FHIR R4' : 
                 site.connectionMethod === 'SFTP' ? 'CSV/HL7' : 'JSON'}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Error Count</span>
              <div className="flex items-center gap-2">
                {site.errorCount === 0 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <Badge variant={site.errorCount === 0 ? "default" : "destructive"}>
                  {site.errorCount} errors
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Warning Count</span>
              <Badge variant={site.warningCount <= 3 ? "secondary" : "destructive"}>
                {site.warningCount} warnings
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Uptime</span>
              <span className="text-sm font-medium text-green-600">
                {site.healthStatus === 'green' ? '99.9%' : 
                 site.healthStatus === 'yellow' ? '97.2%' : '85.1%'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Response Time</span>
              <span className="text-sm font-medium">
                {site.connectionMethod === 'FHIR' ? '< 200ms' : '< 5min'}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">
                {site.lastDataReceived ? 'Data sync completed successfully' : 'Site setup in progress'}
              </div>
              <div className="text-xs text-muted-foreground">
                {site.lastDataReceived 
                  ? formatDistanceToNow(site.lastDataReceived, { addSuffix: true })
                  : 'Awaiting first data transmission'
                }
              </div>
            </div>
            <Badge variant="secondary">
              {site.lastDataReceived ? `+${Math.floor(Math.random() * 20) + 5} records` : 'Pending'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Activity className="h-4 w-4 text-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium">Patient enrollment milestone reached</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <Badge variant="default">1,000+ patients</Badge>
          </div>
          
          {site.warningCount > 0 && (
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Data quality warnings detected</div>
                <div className="text-xs text-muted-foreground">4 hours ago</div>
              </div>
              <Badge variant="secondary">{site.warningCount} warnings</Badge>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}