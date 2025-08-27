import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, XCircle, Eye, Search } from "lucide-react";
import { sites, Site, SiteStatus, HealthStatus } from "@/data/siteData";
import { format, formatDistanceToNow } from "date-fns";

interface SiteListTableProps {
  onSiteClick: (site: Site) => void;
}

export function SiteListTable({ onSiteClick }: SiteListTableProps) {
  const [sortBy, setSortBy] = useState<string>("lastData"); // Default to lastData
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSites = sites
    .filter(site => {
      if (!searchQuery) return true;
      return site.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      let result = 0;
      switch (sortBy) {
        case "name":
          result = a.name.localeCompare(b.name);
          break;
        case "status":
          result = a.status.localeCompare(b.status);
          break;
        case "patients":
          result = a.patientsEnrolled - b.patientsEnrolled;
          break;
        case "lastData":
          // Handle null dates - null dates (None) come first when desc, last when asc
          if (!a.lastDataReceived && !b.lastDataReceived) return 0;
          if (!a.lastDataReceived) return sortDirection === 'desc' ? -1 : 1;
          if (!b.lastDataReceived) return sortDirection === 'desc' ? 1 : -1;
          result = a.lastDataReceived.getTime() - b.lastDataReceived.getTime();
          break;
        case "quality":
          result = a.dataQualityScore - b.dataQualityScore;
          break;
        default:
          return 0;
      }
      return sortDirection === 'desc' ? -result : result;
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection(column === 'lastData' ? 'desc' : 'asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getStatusIcon = (status: SiteStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'onboarding':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusVariant = (status: SiteStatus): "success" | "warning" | "muted" => {
    switch (status) {
      case 'active':
        return 'success'; // Green
      case 'onboarding':
        return 'warning'; // Yellow
      case 'inactive':
        return 'muted'; // Gray
    }
  };

  const getHealthIndicator = (health: HealthStatus, site: Site) => {
    // Show nothing for sites with no data received or inactive sites
    if (site.lastDataReceived === null || site.status === 'inactive') {
      return null;
    }
    
    const colors = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      'n/a': 'bg-gray-400'
    };
    return <div className={`w-3 h-3 rounded-full ${colors[health]}`}></div>;
  };

  const needsAttention = (site: Site) => {
    return site.healthStatus === 'red' || 
           site.healthStatus === 'yellow' ||
           (site.status === 'onboarding' && site.caseCount > 0) ||
           site.errorCount > 3;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Site Management</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-48"
            />
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort('name')}
              >
                Site {getSortIcon('name')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </TableHead>
              <TableHead>Health</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort('patients')}
              >
                Patients {getSortIcon('patients')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort('lastData')}
              >
                Last Data {getSortIcon('lastData')}
              </TableHead>
              <TableHead>Connection</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50" 
                onClick={() => handleSort('quality')}
              >
                Data Quality {getSortIcon('quality')}
              </TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSites.map((site) => (
              <TableRow 
                key={site.id} 
                className=""
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{site.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{site.city}, {site.state}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(site.status)}
                    <Badge variant={getStatusVariant(site.status)}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getHealthIndicator(site.healthStatus, site)}
                    <span className="capitalize text-sm">
                      {site.lastDataReceived === null || site.status === 'inactive' ? '-' : 
                       site.healthStatus === 'green' ? 'Healthy' :
                       site.healthStatus === 'yellow' ? 'Warning' :
                       site.healthStatus === 'red' ? 'Critical' : site.healthStatus}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {site.lastDataReceived === null ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    site.patientsEnrolled.toLocaleString()
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {site.lastDataReceived ? (
                      <>
                        <div className="text-sm">
                          {format(site.lastDataReceived, site.lastDataReceived.getFullYear() === new Date().getFullYear() ? 'MMM d' : 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(site.lastDataReceived, { addSuffix: true })}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground">None</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {site.status === 'inactive' ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <Badge variant="outline">{site.connectionMethod}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {site.status === 'inactive' || site.lastDataReceived === null ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{site.dataQualityScore}%</span>
                      <div className="w-12 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            site.dataQualityScore >= 90 ? 'bg-green-500' : 
                            site.dataQualityScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${site.dataQualityScore}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {site.status === 'inactive' || site.lastDataReceived === null ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <div className="space-y-1">
                      {site.errorCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {site.errorCount} errors
                        </Badge>
                      )}
                      {site.warningCount > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {site.warningCount} warnings
                        </Badge>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSiteClick(site)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}