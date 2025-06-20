import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart3, Search, FileText, Users, Activity, Database, TrendingUp, Stethoscope } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#003f7f]">Documentation</h1>
              <p className="text-muted-foreground">Platform guidance and feature descriptions</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Aspen Studies Section */}
        <section id="aspen-studies">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003f7f]">Aspen</h2>
              <p className="text-muted-foreground">Non-interventional clinical studies powered by OM1 Aspen</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>What is an Aspen Study?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  An Aspen study is a type of non-interventional clinical study that utilizes a state-of-the-art technology platform. The primary goals are to lower the expenses of clinical studies, reduce the workload for research sites, and offer deep insights into patient journeys.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Non-interventional</Badge>
                    <span className="text-sm">Observational study design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">State of the art</Badge>
                    <span className="text-sm">Advanced technology platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Cost effective</Badge>
                    <span className="text-sm">Reduced study expenses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Design Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Study Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Non-interventional studies that observe patients without assigning them to specific treatment groups. Also known as "Observational Studies," "Registries," or "Real-World Studies."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Clinical Phase</h4>
                    <p className="text-sm text-muted-foreground">
                      Almost always Phase IV post-marketing studies, though can be used as control arms in earlier phases or for clinical trial design.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Data Collection Methods</CardTitle>
              <CardDescription>Aspen studies utilize both passive and active data collection approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    <h4 className="font-semibold">Passive Data Collection</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Information already captured in Electronic Health Records (EHR) as part of routine patient care. This method enables large-scale data collection.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <h4 className="font-semibold">Active Data Collection</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Data actively provided by patients or clinicians, such as through electronic Patient-Reported Outcomes (ePROs).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Primary Use Cases</CardTitle>
              <CardDescription>Business drivers for conducting Aspen studies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Must-Have</Badge>
                    <h4 className="font-semibold">Post-Marketing Commitments</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Fulfilling regulatory requirements after drug approval, such as long-term safety and effectiveness studies.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <h4 className="font-semibold">Evidence Generation</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Creating product or disease registries to publish findings, engage medical experts, and inform research. Especially vital for rare diseases.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <h4 className="font-semibold">Label Expansion</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gathering data to support approved treatment use for new conditions or patient groups.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-teal-500" />
                    <h4 className="font-semibold">External Control Arms</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Using observational data to provide comparison groups for certain study types.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Aspen Study Tracker Section */}
        <section id="aspen-study-tracker">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003f7f]">Aspen Study Tracker</h2>
              <p className="text-muted-foreground">Real-time monitoring and analytics for Aspen studies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The Aspen Study Tracker is a comprehensive dashboard application designed to monitor and analyze Aspen studies in real-time. It provides researchers and study coordinators with detailed insights into enrollment progress, patient demographics, and clinical outcomes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Real-time study monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Multi-study cohort analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Interactive visualizations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Study Management</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multi-study dashboard interface</li>
                      <li>• Real-time enrollment tracking</li>
                      <li>• Assessment progress monitoring</li>
                      <li>• Study performance metrics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Capabilities</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Demographic distribution analysis</li>
                      <li>• Geographic patient mapping</li>
                      <li>• Clinical outcome tracking</li>
                      <li>• Quality of life assessments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dashboard Sections</CardTitle>
              <CardDescription>Comprehensive overview of available analytics modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Overview</h4>
                      <p className="text-sm text-muted-foreground">High-level study metrics and key performance indicators</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Enrollment</h4>
                      <p className="text-sm text-muted-foreground">Detailed enrollment progress and participant tracking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">BMI Distribution</h4>
                      <p className="text-sm text-muted-foreground">Body mass index analysis and obesity classification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Geographic</h4>
                      <p className="text-sm text-muted-foreground">Patient distribution across regions and countries</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-semibold text-sm">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Demographics</h4>
                      <p className="text-sm text-muted-foreground">Age, gender, race, and country distribution analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-semibold text-sm">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Comorbidity</h4>
                      <p className="text-sm text-muted-foreground">Co-existing medical conditions and risk factors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold text-sm">7</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Medication</h4>
                      <p className="text-sm text-muted-foreground">Current and historical medication usage patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 font-semibold text-sm">8</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quality of Life</h4>
                      <p className="text-sm text-muted-foreground">Patient-reported outcomes and quality of life metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Cohort Explorer Section */}
        <section id="cohort-explorer">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003f7f]">Cohort Explorer</h2>
              <p className="text-muted-foreground">Build and analyze custom patient cohorts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The Cohort Explorer allows researchers to create custom patient cohorts based on specific criteria and analyze their characteristics in real-time.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced filtering capabilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-time cohort statistics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Export and comparison tools</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Filter Capabilities</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Advanced demographic filtering</li>
                      <li>• Clinical criteria selection</li>
                      <li>• Medication history filtering</li>
                      <li>• Geographic restrictions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analysis Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Interactive visualizations</li>
                      <li>• Comparative studies</li>
                      <li>• Trend analysis</li>
                      <li>• Statistical summaries</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* OM1 Insights Reports Section */}
        <section id="insights-reports">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#003f7f]">Insights Library</h2>
              <p className="text-muted-foreground">Comprehensive analytics and reporting suite</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">Provider Insights</h4>
                      <p className="text-sm text-muted-foreground">Analysis of provider prescribing patterns and behaviors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <div>
                      <h4 className="font-semibold">Real-World Effectiveness</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive summaries of real-world clinical outcomes and effectiveness in treated cohorts of interest</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-semibold">Treatment Journey Insights</h4>
                      <p className="text-sm text-muted-foreground">Analysis of patient treatment pathways and care progression</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Population Insights</h4>
                      <p className="text-sm text-muted-foreground">Detailed insights into pre-defined populations of interest</p>
                    </div>
                  </div>
                  
                  
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Generation & Export</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automated report generation</li>
                      <li>• Multiple export formats</li>
                      <li>• Scheduled report delivery</li>
                      <li>• Custom data filtering</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Capabilities</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Advanced statistical analysis</li>
                      <li>• Interactive visualizations</li>
                      <li>• Comparative studies</li>
                      <li>• Trend analysis</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
