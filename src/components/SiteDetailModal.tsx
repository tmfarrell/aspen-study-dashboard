import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteData } from "@/api/types";
import { SiteOverviewTab } from "./SiteOverviewTab";
import { SiteDataTimelineTab } from "./SiteDataTimelineTab";
import { SiteDataQualityTab } from "./SiteDataQualityTab";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface SiteDetailModalProps {
  site: SiteData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SiteDetailModal({ site, isOpen, onClose }: SiteDetailModalProps) {
  if (!site) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'onboarding':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{site.name}</DialogTitle>
              <p className="text-muted-foreground">{site.city}, {site.subdivision}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(site.status)}
                <Badge variant={site.status === 'active' ? 'default' : site.status === 'onboarding' ? 'secondary' : 'destructive'}>
                  {site.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getHealthColor(site.healthStatus)}`}></div>
                <span className="text-sm capitalize">{site.healthStatus} Health</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Data Timeline</TabsTrigger>
            <TabsTrigger value="quality">Data Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <SiteOverviewTab site={site} />
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <SiteDataTimelineTab site={site} />
          </TabsContent>
          
          <TabsContent value="quality" className="mt-6">
            <SiteDataQualityTab site={site} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}