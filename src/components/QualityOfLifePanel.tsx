import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { qualityOfLifeAssessments } from "@/data/qualityOfLifeData";
import { CheckCircle, Clock, BarChart3 } from "lucide-react";

export function QualityOfLifePanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Quality of Life Assessments</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qualityOfLifeAssessments.map((assessment, index) => (
          <Card key={index} className="p-4 bg-card border">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground mb-1">
                    {assessment.condition}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {assessment.assessmentName}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {assessment.scoreRange}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">
                    {Math.round((assessment.completedAssessments / assessment.totalPatients) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(assessment.completedAssessments / assessment.totalPatients) * 100} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{assessment.completedAssessments} completed</span>
                  <span>{assessment.totalPatients} total</span>
                </div>
                
                {assessment.averageScore && (
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Average Score</span>
                      <span className="text-sm font-semibold text-primary">
                        {assessment.averageScore}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground">
                {assessment.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}