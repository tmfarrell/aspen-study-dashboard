import { MetricCard } from "@/components/ui/metric-card";
import { Users } from "lucide-react";
import { studyData } from "@/data/studyData";
import { calculateTotalPatients } from "@/data/studyHelpers";
import { StudyType } from "@/api/types";

interface TotalPatientsTileProps {
  studyId: StudyType;
  showTrend?: boolean;
  trendValue?: number;
}

export function TotalPatientsTile({ studyId, showTrend = true, trendValue = 12.5 }: TotalPatientsTileProps) {
  const study = studyData[studyId];
  const totalPatients = calculateTotalPatients(studyId);

  if (!study) {
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
      value={totalPatients.toLocaleString()}
      subtitle={getEnrollmentSubtitle()}
      icon={<Users className="w-5 h-5" />}
      trend={showTrend ? { value: trendValue, isPositive: true } : undefined}
    />
  );
}