import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteData } from "@/api/types";
import { AlertTriangle, CheckCircle, Database, TrendingUp, Clock, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { format, subDays, subHours } from "date-fns";

interface SiteDataTimelineTabProps {
  site: SiteData;
}

export function SiteDataTimelineTab({ site }: SiteDataTimelineTabProps) {
  // Generate mock timeline data
  const generateTimelineData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = subDays(now, i);
      const hasError = Math.random() < 0.1; // 10% chance of error
      const hasWarning = Math.random() < 0.2; // 20% chance of warning
      const baseRecords = Math.floor(Math.random() * 100) + 50;
      
      data.push({
        date: format(date, 'MMM d'),
        fullDate: date,
        records: hasError ? 0 : baseRecords,
        cumulativeRecords: data.length > 0 ? data[data.length - 1].cumulativeRecords + (hasError ? 0 : baseRecords) : baseRecords,
        status: hasError ? 'error' : hasWarning ? 'warning' : 'success',
        errorCount: hasError ? Math.floor(Math.random() * 5) + 1 : 0,
        warningCount: hasWarning ? Math.floor(Math.random() * 3) + 1 : 0
      });
    }
    return data;
  };

  const timelineData = generateTimelineData();
  
  // Generate recent sync events
  const generateSyncEvents = () => {
    const events = [];
    const now = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = subHours(now, i * 6); // Every 6 hours
      const isSuccess = Math.random() > 0.15; // 85% success rate
      const recordCount = isSuccess ? Math.floor(Math.random() * 150) + 50 : 0;
      
      events.push({
        id: i,
        timestamp: date,
        status: isSuccess ? 'success' : 'error',
        records: recordCount,
        duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
        message: isSuccess 
          ? `Successfully processed ${recordCount} records`
          : 'Connection timeout - retry scheduled'
      });
    }
    return events;
  };

  const syncEvents = generateSyncEvents();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Daily Data Volume
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value: number) => [`${value} records`, 'Records']}
              />
              <Line 
                type="monotone" 
                dataKey="records" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cumulative Records
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value: number) => [`${value.toLocaleString()} total`, 'Total Records']}
              />
              <Area 
                type="monotone" 
                dataKey="cumulativeRecords" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Data Sync Events */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Sync Events</h3>
        <div className="space-y-3 max-h-96 overflow-auto">
          {syncEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex-shrink-0">
                {getStatusIcon(event.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{event.message}</div>
                  <Badge variant={event.status === 'success' ? 'default' : 'destructive'}>
                    {event.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {format(event.timestamp, 'MMM d, yyyy HH:mm:ss')} • Duration: {event.duration}s
                </div>
              </div>
              
              {event.records > 0 && (
                <div className="text-right">
                  <div className="text-sm font-medium">{event.records}</div>
                  <div className="text-xs text-muted-foreground">records</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-lg font-semibold">
                {syncEvents.filter(e => e.status === 'success').length}
              </div>
              <div className="text-sm text-muted-foreground">Successful Syncs</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <div className="text-lg font-semibold">
                {syncEvents.filter(e => e.status === 'error').length}
              </div>
              <div className="text-sm text-muted-foreground">Failed Syncs</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-lg font-semibold">
                {syncEvents.reduce((sum, e) => sum + e.records, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}