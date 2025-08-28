import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, XCircle, Eye, Search } from "lucide-react";
import { useSites } from "@/state/sites/queries";
import { useAppState } from "@/contexts/AppStateContext";
import { SiteData } from "@/api/types";
import { format, formatDistanceToNow } from "date-fns";

interface SiteListTableProps {
  onSiteClick: (site: SiteData) => void;
}

export function SiteListTable({ onSiteClick }: SiteListTableProps) {
  const { selectedStudy } = useAppState();
  const { data: sitesResponse, isLoading } = useSites(selectedStudy);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading || !sitesResponse) {
    return <div>Loading sites...</div>;
  }

  const sites = sitesResponse || [];

  // Filter and sort sites
  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.subdivision.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSites = [...filteredSites].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'health':
        const healthOrder = { 'healthy': 0, 'warning': 1, 'critical': 2 };
        aValue = healthOrder[a.healthStatus];
        bValue = healthOrder[b.healthStatus];
        break;
      case 'patients':
        aValue = a.enrolledPatients;
        bValue = b.enrolledPatients;
        break;
      case 'lastData':
        aValue = a.lastDataReceived ? new Date(a.lastDataReceived).getTime() : 0;
        bValue = b.lastDataReceived ? new Date(b.lastDataReceived).getTime() : 0;
        break;
      case 'dataQuality':
        aValue = a.dataQuality;
        bValue = b.dataQuality;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getStatusIcon = (status: SiteData['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'onboarding':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusVariant = (status: SiteData['status']): "default" | "secondary" | "outline" => {
    switch (status) {
      case 'active':
        return 'default';
      case 'onboarding':
        return 'secondary';
      case 'inactive':
        return 'outline';
    }
  };

  const getHealthIndicator = (health: SiteData['healthStatus'], site: SiteData) => {
    if (site.lastDataReceived === null || site.status === 'inactive') {
      return null;
    }
    
    const colors = {
      healthy: 'bg-green-500',
      warning: 'bg-yellow-500',
      critical: 'bg-red-500'
    };
    return <div className={`w-3 h-3 rounded-full ${colors[health]}`}></div>;
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
                onClick={() => handleSort('dataQuality')}
              >
                Data Quality {getSortIcon('dataQuality')}
              </TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSites.map((site) => (
              <TableRow 
                key={site.id} 
                className=""
              >
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{site.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{site.city}, {site.subdivision}</div>
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
                       site.healthStatus === 'healthy' ? 'Healthy' :
                       site.healthStatus === 'warning' ? 'Warning' :
                       site.healthStatus === 'critical' ? 'Critical' : site.healthStatus}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {site.lastDataReceived === null ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    site.enrolledPatients.toLocaleString()
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {site.lastDataReceived ? (
                      <>
                        <div className="text-sm">
                          {format(new Date(site.lastDataReceived), new Date(site.lastDataReceived).getFullYear() === new Date().getFullYear() ? 'MMM d' : 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(site.lastDataReceived), { addSuffix: true })}
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
                    <Badge variant="outline">API</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {site.status === 'inactive' || site.lastDataReceived === null ? (
                    <span className="text-muted-foreground">-</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{site.dataQuality}%</span>
                      <div className="w-12 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            site.dataQuality >= 90 ? 'bg-green-500' : 
                            site.dataQuality >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${site.dataQuality}%` }}
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
                      {site.healthStatus === 'critical' && (
                        <Badge variant="destructive" className="text-xs">
                          Critical
                        </Badge>
                      )}
                      {site.healthStatus === 'warning' && (
                        <Badge variant="secondary" className="text-xs">
                          Warning
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