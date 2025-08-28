import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart } from "recharts";
import { Users, TrendingUp, Calendar, UserPlus, Activity, Target, MapPin } from "lucide-react";
import { useEnrollmentStats } from "@/state/enrollment/queries";
import { StudyType } from "@/api/types";
import { useStudy } from "@/state/studies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { EnrollmentProgressTile } from "@/components/common/EnrollmentProgressTile";
import { TotalPatientsTile } from "@/components/common/TotalPatientsTile";
import DistributionMetric from "@/components/common/DistributionMetric";

interface EnrollmentDashboardProps {
  studyId: StudyType;
}

export function EnrollmentDashboard({ studyId }: EnrollmentDashboardProps) {
  const { data: enrollmentStats, isLoading, error } = useEnrollmentStats(studyId);
  const { data: study, isLoading: studyLoading } = useStudy(studyId);
  const [trendsView, setTrendsView] = useState<'monthly' | 'cumulative'>('monthly');

  // Get the correct unit label based on enrollmentUnits
  const getUnitLabel = () => {
    return study?.enrollmentUnits === 'cases' ? 'Cases' : 'Patients';
  };

  // Get enrollment metric ID for each study
  const getEnrollmentMetricId = (studyId: StudyType) => {
    switch (studyId) {
      case 'cardiology': return 'heart_conditions';
      case 'obesity': return 'bmi_categories';
      case 'diabetes': return 'diabetes_types';
      case 'hypertension': return 'treatment_categories';
      default: return 'bmi_categories';
    }
  };

  // Get enrollment metric title for each study
  const getEnrollmentMetricTitle = (studyId: StudyType) => {
    switch (studyId) {
      case 'cardiology': return 'Heart Rhythm Disorders';
      case 'obesity': return 'BMI Categories';
      case 'diabetes': return 'Patient Demographics';
      case 'hypertension': return 'Treatment Categories';
      default: return 'Enrollment Categories';
    }
  };

  if (isLoading || studyLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !enrollmentStats || !study) {
    return (
      <div className="p-6">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            Unable to load enrollment data for this study.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Key Enrollment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TotalPatientsTile studyId={studyId} showTrend={false} />
        <MetricCard
          title={`New ${getUnitLabel()} (Past Month)`}
          value={enrollmentStats.newPatientsLastMonth.toLocaleString()}
          subtitle="Recently enrolled"
          icon={<UserPlus className="w-5 h-5" />}
          trend={{ value: 18.5, isPositive: true }}
        />
        <MetricCard
          title={`New ${getUnitLabel()} (Past 12 Months)`}
          value={enrollmentStats.newPatientsLast12Months.toLocaleString()}
          subtitle="Annual enrollment"
          icon={<Calendar className="w-5 h-5" />}
          trend={{ value: 24.3, isPositive: true }}
        />
        {enrollmentStats.targetCompletion ? (
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-muted-foreground">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">Target Enrollment End Date</h3>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">{enrollmentStats.targetCompletion.targetDate}</div>
                <Badge 
                  variant={
                    enrollmentStats.targetCompletion.status === 'on-track' ? 'default' : 
                    enrollmentStats.targetCompletion.status === 'at-risk' ? 'secondary' : 
                    'destructive'
                  }
                  className={
                    enrollmentStats.targetCompletion.status === 'on-track' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                    enrollmentStats.targetCompletion.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                    'bg-red-100 text-red-800 hover:bg-red-100'
                  }
                >
                  {enrollmentStats.targetCompletion.status === 'on-track' ? 'On Track' :
                   enrollmentStats.targetCompletion.status === 'at-risk' ? 'At Risk' :
                   'Off Track'}
                </Badge>
              </div>
            </div>
          </Card>
        ) : (
          <MetricCard
            title="Average Monthly Enrollment"
            value={enrollmentStats.averageMonthlyEnrollment.toLocaleString()}
            subtitle={`${getUnitLabel()} per month`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
        )}
      </div>


      {/* Enrollment Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Enrollment Trend with Cumulative */}
        <Card className="p-6 bg-card border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Enrollment Trends</h3>
            <div className="flex gap-2">
              <Button
                variant={trendsView === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendsView('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={trendsView === 'cumulative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendsView('cumulative')}
              >
                Cumulative
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {trendsView === 'monthly' ? (
              <AreaChart data={enrollmentStats.monthlyTrends}>
                <defs>
                  <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                  formatter={(value, name) => [value, name === 'enrolled' ? 'Monthly Enrollment' : 'Cumulative']}
                />
                <Area 
                  type="monotone" 
                  dataKey="enrolled" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorEnrolled)" 
                />
              </AreaChart>
            ) : (
              <LineChart data={enrollmentStats.monthlyTrends}>
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                  formatter={(value) => [value, 'Total Enrolled']}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--secondary))" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </Card>

        {/* Breakdown by Category */}
        <div className="p-6 bg-card border rounded-lg">
          <DistributionMetric 
            metricId={getEnrollmentMetricId(studyId)}
            title={getEnrollmentMetricTitle(studyId)}
            studyId={studyId}
            orientation="horizontal"
          />
          <div className="text-xs text-muted-foreground mt-2">
            Debug: Looking for metric "{getEnrollmentMetricId(studyId)}" for study "{studyId}"
          </div>
        </div>
      </div>

      {/* Site Enrollment and Geography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentProgressTile studyId={studyId} />
        
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Recent Site Enrollment (Last Month)</h3>
          <div className="space-y-3">
            {enrollmentStats.recentSiteEnrollment.slice(0, 8).map((site) => (
              <div key={site.siteId} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{site.siteName}</p>
                    <p className="text-xs text-muted-foreground">{site.city}, {site.state}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">+{site.lastMonthEnrollment}</p>
                  <p className="text-xs text-muted-foreground">{site.totalEnrollment} total</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Enrollment Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Average New {getUnitLabel()} per Category</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Past Month</span>
              <span className="text-2xl font-bold text-foreground">
                {Math.round(enrollmentStats.newPatientsLastMonth / enrollmentStats.breakdowns.length)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Past 12 Months</span>
              <span className="text-2xl font-bold text-foreground">
                {Math.round(enrollmentStats.newPatientsLast12Months / enrollmentStats.breakdowns.length)}
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Average enrollment per category
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Top Enrolling Categories</h3>
          <div className="space-y-3">
            {enrollmentStats.topEnrollingCategories.map((category, index) => (
              <div key={category.key} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{category.label}</p>
                  <p className="text-xs text-muted-foreground">Past 12 months</p>
                </div>
                <span className="text-lg font-bold text-primary">{category.last12Months}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border">
          <h3 className="text-lg font-semibold mb-4">Recent Enrollment Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-lg font-bold text-success">{enrollmentStats.enrollmentVelocity.thisWeek}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-lg font-bold text-primary">{enrollmentStats.enrollmentVelocity.thisMonth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Daily Average</span>
              <span className="text-lg font-bold text-success">{enrollmentStats.enrollmentVelocity.dailyAverage}</span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Enrollment velocity indicators
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}