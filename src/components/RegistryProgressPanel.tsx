import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { registryGrowthData } from "@/data/qualityOfLifeData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, MapPin } from "lucide-react";

export function RegistryProgressPanel() {
  const totalGrowth = ((registryGrowthData[registryGrowthData.length - 1].patients - registryGrowthData[0].patients) / registryGrowthData[0].patients * 100).toFixed(1);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Registry Growth Progress</h3>
          <Badge variant="secondary" className="ml-auto">
            +{totalGrowth}% YTD
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {registryGrowthData[registryGrowthData.length - 1].patients.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Current Total</div>
          </div>
          
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {registryGrowthData.reduce((sum, month) => sum + month.newPatients, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Added This Year</div>
          </div>
          
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-success">
              {Math.round(registryGrowthData.reduce((sum, month) => sum + month.newPatients, 0) / 12)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Monthly Growth</div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Patient Enrollment Trend
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registryGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px"
                }}
                formatter={(value, name) => [
                  `${value} patients`,
                  name === 'patients' ? 'Total Enrolled' : 'New Enrollments'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="newPatients" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Regional Distribution (Current)
          </h4>
          <div className="text-sm text-muted-foreground bg-accent/30 p-3 rounded-lg">
            {registryGrowthData[registryGrowthData.length - 1].region}
          </div>
        </div>
      </Card>
    </div>
  );
}