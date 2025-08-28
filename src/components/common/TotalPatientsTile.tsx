import { MetricCard } from "@/components/ui/metric-card";
import { Users } from "lucide-react";
import { useStudy, useStudyStats } from "@/state/studies";
import { StudyType } from "@/api/types";

interface TotalPatientsTileProps {
  studyId: StudyType;
  showTrend?: boolean;
  trendValue?: number;
}

export function TotalPatientsTile({ studyId, showTrend = true, trendValue = 12.5 }: TotalPatientsTileProps) {
  const { data: study, isLoading: studyLoading } = useStudy(studyId);
  const { data: stats, isLoading: statsLoading } = useStudyStats(studyId);

  if (studyLoading || statsLoading) {
    return <div className="h-32 bg-muted animate-pulse rounded-lg" />;
  }

  if (!study || !stats) {
    return null;
  }

  // Get the correct unit label based on enrollmentUnits
  const getUnitLabel = () => {
    return study.enrollmentUnits === 'cases' ? 'Cases' : 'Patients';
  };

  // Get enrollment subtitle (with target if applicable)
  const getEnrollmentSubtitle = () => {
    if (study.targetEnrollment) {
      return `of ${study.targetEnrollment.total.toLocaleString()} target`;
    }
    return study.enrollmentUnits === 'cases' ? 'Total registered cases' : 'All enrolled patients';
  };

  return (
    <MetricCard
      title={`Total ${getUnitLabel()}`}
      value={stats.totalPatients.toLocaleString()}
      subtitle={getEnrollmentSubtitle()}
      icon={<Users className="w-5 h-5" />}
      trend={showTrend ? { value: trendValue, isPositive: true } : undefined}
    />
  );
}