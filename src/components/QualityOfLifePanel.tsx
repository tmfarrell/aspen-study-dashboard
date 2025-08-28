import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, BarChart3 } from "lucide-react";
import { useAppState } from "@/contexts/AppStateContext";
import { useStudyMetrics } from "@/state/metrics";
import DistributionMetric from "./common/DistributionMetric";
import MetricTile from "./common/MetricTile";

export function QualityOfLifePanel() {
  const { selectedStudy } = useAppState();
  const { data: metrics, isLoading } = useStudyMetrics(selectedStudy);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Quality of Life Assessments</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 bg-card border">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Only show QoL assessments for cardiology study
  if (selectedStudy !== 'cardiology' || !metrics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Quality of Life Assessments</h3>
        </div>
        <Card className="p-6 bg-card border">
          <p className="text-muted-foreground">Quality of life assessments are available for cardiology studies.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Quality of Life Assessments</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricTile
          studyId={selectedStudy}
          metricId="assessment_completion_rate"
          displayType="average"
          icon="check-circle"
          description="Assessment completion rate"
        />
        <MetricTile
          studyId={selectedStudy}
          metricId="afeqt_scores"
          displayType="average"
          icon="heart"
          description="Average AFEQT score"
        />
        <MetricTile
          studyId={selectedStudy}
          metricId="sf36_scores"
          displayType="average"
          icon="activity"
          description="Average SF-36 score"
        />
        <MetricTile
          studyId={selectedStudy}
          metricId="eq5d_scores"
          displayType="average"
          icon="trending-up"
          description="Average EQ-5D-5L score"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistributionMetric
          metricId="afeqt_scores"
          title="AFEQT Score Distribution"
          studyId={selectedStudy}
          orientation="vertical"
        />
        <DistributionMetric
          metricId="eq5d_scores"
          title="EQ-5D-5L Score Distribution"
          studyId={selectedStudy}
          orientation="vertical"
        />
      </div>
    </div>
  );
}