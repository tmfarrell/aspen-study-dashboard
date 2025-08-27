import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Site } from "@/data/siteData";
import { CheckCircle, AlertTriangle, XCircle, Database, FileText, Brain, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface SiteDataQualityTabProps {
  site: Site;
}

export function SiteDataQualityTab({ site }: SiteDataQualityTabProps) {
  // Generate mock data quality metrics
  const generateQualityMetrics = () => {
    const base = site.dataQualityScore;
    return {
      structuredMapping: Math.min(100, base + Math.floor(Math.random() * 10) - 5),
      completeness: Math.min(100, base + Math.floor(Math.random() * 15) - 7),
      accuracy: Math.min(100, base + Math.floor(Math.random() * 12) - 6),
      consistency: Math.min(100, base + Math.floor(Math.random() * 8) - 4),
      unstructuredModel: Math.min(100, base + Math.floor(Math.random() * 20) - 10),
      timeliness: Math.min(100, base + Math.floor(Math.random() * 6) - 3)
    };
  };

  const qualityMetrics = generateQualityMetrics();

  // Data for charts
  const mappingData = [
    { name: 'Successfully Mapped', value: 85, color: '#10b981' },
    { name: 'Partially Mapped', value: 12, color: '#f59e0b' },
    { name: 'Unmapped', value: 3, color: '#ef4444' }
  ];

  const fieldQualityData = [
    { field: 'Patient ID', completeness: 99, accuracy: 98 },
    { field: 'Demographics', completeness: 95, accuracy: 92 },
    { field: 'Diagnoses', completeness: 87, accuracy: 89 },
    { field: 'Medications', completeness: 78, accuracy: 85 },
    { field: 'Lab Results', completeness: 92, accuracy: 94 },
    { field: 'Vitals', completeness: 89, accuracy: 91 }
  ];

  const modelPerformance = {
    entityExtraction: 92,
    relationshipMapping: 88,
    codingAccuracy: 85,
    confidenceScore: 91
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 75) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Quality Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Structured Mapping</span>
            {getScoreIcon(qualityMetrics.structuredMapping)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.structuredMapping}%</div>
          <Progress value={qualityMetrics.structuredMapping} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Data Completeness</span>
            {getScoreIcon(qualityMetrics.completeness)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.completeness}%</div>
          <Progress value={qualityMetrics.completeness} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Accuracy Score</span>
            {getScoreIcon(qualityMetrics.accuracy)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.accuracy}%</div>
          <Progress value={qualityMetrics.accuracy} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Data Consistency</span>
            {getScoreIcon(qualityMetrics.consistency)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.consistency}%</div>
          <Progress value={qualityMetrics.consistency} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Model Performance</span>
            {getScoreIcon(qualityMetrics.unstructuredModel)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.unstructuredModel}%</div>
          <Progress value={qualityMetrics.unstructuredModel} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Data Timeliness</span>
            {getScoreIcon(qualityMetrics.timeliness)}
          </div>
          <div className="text-2xl font-bold">{qualityMetrics.timeliness}%</div>
          <Progress value={qualityMetrics.timeliness} className="mt-2" />
        </Card>
      </div>

      {/* Mapping Statistics and Field Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Mapping Statistics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mappingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mappingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {mappingData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Field Quality Analysis
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fieldQualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              <Bar dataKey="completeness" fill="#3b82f6" name="Completeness" />
              <Bar dataKey="accuracy" fill="#10b981" name="Accuracy" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Model Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Unstructured Data Model Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Entity Extraction</span>
              <span className={`text-sm font-semibold ${getScoreColor(modelPerformance.entityExtraction)}`}>
                {modelPerformance.entityExtraction}%
              </span>
            </div>
            <Progress value={modelPerformance.entityExtraction} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Relationship Mapping</span>
              <span className={`text-sm font-semibold ${getScoreColor(modelPerformance.relationshipMapping)}`}>
                {modelPerformance.relationshipMapping}%
              </span>
            </div>
            <Progress value={modelPerformance.relationshipMapping} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Coding Accuracy</span>
              <span className={`text-sm font-semibold ${getScoreColor(modelPerformance.codingAccuracy)}`}>
                {modelPerformance.codingAccuracy}%
              </span>
            </div>
            <Progress value={modelPerformance.codingAccuracy} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className={`text-sm font-semibold ${getScoreColor(modelPerformance.confidenceScore)}`}>
                {modelPerformance.confidenceScore}%
              </span>
            </div>
            <Progress value={modelPerformance.confidenceScore} />
          </div>
        </div>
      </Card>

      {/* Issues and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Quality Issues
          </h3>
          <div className="space-y-3">
            {site.errorCount > 0 && (
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Critical Data Errors</div>
                  <div className="text-xs text-muted-foreground">
                    {site.errorCount} records with validation failures
                  </div>
                </div>
                <Badge variant="destructive">{site.errorCount}</Badge>
              </div>
            )}
            
            {site.warningCount > 0 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Data Quality Warnings</div>
                  <div className="text-xs text-muted-foreground">
                    {site.warningCount} records with quality concerns
                  </div>
                </div>
                <Badge variant="secondary">{site.warningCount}</Badge>
              </div>
            )}

            {qualityMetrics.structuredMapping < 85 && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                <FileText className="h-4 w-4 text-orange-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Mapping Completeness</div>
                  <div className="text-xs text-muted-foreground">
                    Some fields require manual mapping review
                  </div>
                </div>
                <Badge variant="secondary">Review Needed</Badge>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recommendations
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
              <div className="text-sm font-medium">Optimize Data Mappings</div>
              <div className="text-xs text-muted-foreground mt-1">
                Review unmapped fields to improve data completeness
              </div>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div className="text-sm font-medium">Enhance Validation Rules</div>
              <div className="text-xs text-muted-foreground mt-1">
                Implement stricter validation for medication dosages
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <div className="text-sm font-medium">Model Retraining</div>
              <div className="text-xs text-muted-foreground mt-1">
                Consider retraining NLP models with recent data
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}