import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Plus, Users, Stethoscope, Pill, Eye, Scissors, TestTube, FileText, Calendar, Database, GripVertical, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { studyData, StudyType, getStudyOptions } from '@/data/studyData';
import { useCohortStore } from '@/stores/cohortStore';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, LineChart, Line } from 'recharts';

// Define the criteria types with their specific configuration options
const criteriaTypes = [
  { 
    id: 'patient', 
    label: 'Patient Attributes', 
    icon: Users,
    options: ['Age', 'Gender', 'Race', 'Ethnicity']
  },
  { 
    id: 'diagnosis', 
    label: 'Diagnosis', 
    icon: Stethoscope,
    options: ['ICD-10 Code(s)']
  },
  { 
    id: 'medication', 
    label: 'Medication', 
    icon: Pill,
    options: ['Drug Name(s)', 'NDC Code(s)']
  },
  { 
    id: 'observation', 
    label: 'Observation', 
    icon: Eye,
    options: ['Observation Type', 'Value']
  },
  { 
    id: 'procedure', 
    label: 'Procedure', 
    icon: Scissors,
    options: ['CPT Code(s)']
  },
  { 
    id: 'lab', 
    label: 'Lab Test', 
    icon: TestTube,
    options: ['Test Name(s)', 'LOINC Code(s)']
  },
  { 
    id: 'ehr', 
    label: 'EHR Note', 
    icon: FileText,
    options: ['Note Type', 'Provider Specialty']
  }
];

interface CriteriaBlock {
  id: string;
  type: string;
  config: Record<string, string>;
  isOpen: boolean;
}

const CriteriaInput = memo(({ 
  value, 
  onChange, 
  option 
}: { 
  value: string, 
  onChange: (value: string) => void, 
  option: string 
}) => (
  <div className="grid grid-cols-2 gap-4">
    <label className="text-sm font-medium text-muted-foreground">
      {option}:
    </label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter ${option.toLowerCase()}`}
    />
  </div>
));

CriteriaInput.displayName = 'CriteriaInput';

const CriteriaBlock = memo(({ 
  block, 
  type,
  index,
  onTypeChange,
  onConfigChange,
  onToggle,
  onRemove,
  dragHandleProps
}: {
  block: CriteriaBlock,
  type: 'inclusion' | 'exclusion',
  index: number,
  onTypeChange: (value: string) => void,
  onConfigChange: (option: string, value: string) => void,
  onToggle: () => void,
  onRemove: () => void,
  dragHandleProps: any
}) => (
  <Card className="border border-dashed">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <div {...dragHandleProps}>
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
        </div>
        <Select
          value={block.type}
          onValueChange={onTypeChange}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select criteria type" />
          </SelectTrigger>
          <SelectContent>
            {criteriaTypes.map((criteriaType) => (
              <SelectItem key={criteriaType.id} value={criteriaType.id}>
                <div className="flex items-center gap-2">
                  <criteriaType.icon className="h-4 w-4" />
                  {criteriaType.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${block.isOpen ? 'transform rotate-180' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {block.type && block.isOpen && (
        <div className="space-y-4 mt-4">
          {criteriaTypes.find(t => t.id === block.type)?.options.map((option) => (
            <CriteriaInput
              key={option}
              option={option}
              value={block.config[option] || ''}
              onChange={(value) => onConfigChange(option, value)}
            />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
));

CriteriaBlock.displayName = 'CriteriaBlock';

const CriteriaSection = ({ type, criteria, setCriteria }: { 
  type: 'inclusion' | 'exclusion', 
  criteria: CriteriaBlock[],
  setCriteria: React.Dispatch<React.SetStateAction<CriteriaBlock[]>>
}) => {
  const handleTypeChange = useCallback((blockId: string, value: string) => {
    setCriteria(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, type: value, config: {} } 
        : block
    ));
  }, [setCriteria]);

  const handleConfigChange = useCallback((blockId: string, option: string, value: string) => {
    setCriteria(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, config: { ...block.config, [option]: value } } 
        : block
    ));
  }, [setCriteria]);

  const handleToggle = useCallback((blockId: string) => {
    setCriteria(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, isOpen: !block.isOpen } 
        : block
    ));
  }, [setCriteria]);

  const handleRemove = useCallback((blockId: string) => {
    setCriteria(prev => prev.filter(block => block.id !== blockId));
  }, [setCriteria]);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const items = [...criteria];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCriteria(items);
  }, [criteria, setCriteria]);

  const handleAddCriteria = useCallback(() => {
    const newBlock: CriteriaBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: '',
      config: {},
      isOpen: true
    };

    setCriteria(prev => [...prev, newBlock]);
  }, [setCriteria]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {type === 'inclusion' ? 'Inclusion Criteria' : 'Exclusion Criteria'}
        </CardTitle>
        <CardDescription>
          {type === 'inclusion' 
            ? 'Define criteria that patients must meet to be included in the cohort'
            : 'Define criteria that will exclude patients from the cohort'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={`${type}-criteria`}>
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="space-y-4"
              >
                {criteria.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <CriteriaBlock
                          block={block}
                          type={type}
                          index={index}
                          onTypeChange={(value) => handleTypeChange(block.id, value)}
                          onConfigChange={(option, value) => handleConfigChange(block.id, option, value)}
                          onToggle={() => handleToggle(block.id)}
                          onRemove={() => handleRemove(block.id)}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={handleAddCriteria}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Criteria Block
                </Button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

const Explorer = () => {
  const [inclusionCriteria, setInclusionCriteria] = useState<CriteriaBlock[]>([]);
  const [exclusionCriteria, setExclusionCriteria] = useState<CriteriaBlock[]>([]);
  
  const { 
    selectedStudy, 
    setSelectedStudy, 
    populationSize = 0, 
    currentCohortSize = 0, 
    applyCriteria,
    resetCohortSize
  } = useCohortStore();

  const currentStudyData = studyData[selectedStudy];

  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCriteria = useCallback(async () => {
    setIsApplying(true);
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    const totalCriteria = inclusionCriteria.length + exclusionCriteria.length;
    applyCriteria(totalCriteria);
    setIsApplying(false);
  }, [inclusionCriteria, exclusionCriteria, applyCriteria]);

  // Check if criteria have been applied
  const hasCriteriaApplied = useMemo(() => {
    return currentCohortSize !== populationSize || (inclusionCriteria.length > 0 || exclusionCriteria.length > 0);
  }, [currentCohortSize, populationSize, inclusionCriteria.length, exclusionCriteria.length]);

  // Generate mock data for charts based on current cohort size
  const generateChartData = useCallback(() => {
    if (!hasCriteriaApplied || currentCohortSize === 0) return null;

    // Demographics data
    const genderData = [
      { gender: 'Female', count: Math.floor(currentCohortSize * 0.62), percentage: 62, color: '#8884d8' },
      { gender: 'Male', count: Math.floor(currentCohortSize * 0.36), percentage: 36, color: '#82ca9d' },
      { gender: 'Non-binary', count: Math.floor(currentCohortSize * 0.015), percentage: 1.5, color: '#ffc658' },
      { gender: 'Other', count: Math.floor(currentCohortSize * 0.005), percentage: 0.5, color: '#ff7300' }
    ];

    // Age distribution data
    const ageData = [
      { ageGroup: "18-29", patients: Math.floor(currentCohortSize * 0.045), percentage: 4.5 },
      { ageGroup: "30-39", patients: Math.floor(currentCohortSize * 0.12), percentage: 12.0 },
      { ageGroup: "40-49", patients: Math.floor(currentCohortSize * 0.18), percentage: 18.0 },
      { ageGroup: "50-59", patients: Math.floor(currentCohortSize * 0.22), percentage: 22.0 },
      { ageGroup: "60-69", patients: Math.floor(currentCohortSize * 0.25), percentage: 25.0 },
      { ageGroup: "70-79", patients: Math.floor(currentCohortSize * 0.15), percentage: 15.0 },
      { ageGroup: "80+", patients: Math.floor(currentCohortSize * 0.035), percentage: 3.5 }
    ];

    // Geographic distribution data
    const geographicData = [
      { region: 'North America', patients: Math.floor(currentCohortSize * 0.35), color: '#0066CC' },
      { region: 'Europe', patients: Math.floor(currentCohortSize * 0.28), color: '#0066CC' },
      { region: 'Asia', patients: Math.floor(currentCohortSize * 0.22), color: '#0066CC' },
      { region: 'South America', patients: Math.floor(currentCohortSize * 0.08), color: '#0066CC' },
      { region: 'Africa', patients: Math.floor(currentCohortSize * 0.05), color: '#0066CC' },
      { region: 'Oceania', patients: Math.floor(currentCohortSize * 0.02), color: '#0066CC' }
    ];

    // Clinical characteristics data - sorted by frequency
    const clinicalData = [
      { characteristic: 'Hypertension', patients: Math.floor(currentCohortSize * 0.68) },
      { characteristic: 'Hyperlipidemia', patients: Math.floor(currentCohortSize * 0.52) },
      { characteristic: 'Diabetes', patients: Math.floor(currentCohortSize * 0.45) },
      { characteristic: 'Arthritis', patients: Math.floor(currentCohortSize * 0.42) },
      { characteristic: 'Sleep Apnea', patients: Math.floor(currentCohortSize * 0.38) },
      { characteristic: 'GERD', patients: Math.floor(currentCohortSize * 0.31) }
    ].sort((a, b) => b.patients - a.patients);

    return { genderData, ageData, geographicData, clinicalData };
  }, [hasCriteriaApplied, currentCohortSize]);

  const chartData = generateChartData();

  const handleCriteriaTypeChange = (type: 'inclusion' | 'exclusion', id: string, value: string) => {
    const updateCriteria = (criteria: CriteriaBlock[]) => 
      criteria.map(block => 
        block.id === id 
          ? { ...block, type: value, config: {} } 
          : block
      );

    if (type === 'inclusion') {
      setInclusionCriteria(updateCriteria(inclusionCriteria));
    } else {
      setExclusionCriteria(updateCriteria(exclusionCriteria));
    }
  };

  const handleConfigChange = (type: 'inclusion' | 'exclusion', blockId: string, option: string, value: string) => {
    const updateCriteria = (criteria: CriteriaBlock[]) => 
      criteria.map(block => 
        block.id === blockId 
          ? { ...block, config: { ...block.config, [option]: value } } 
          : block
      );

    if (type === 'inclusion') {
      setInclusionCriteria(updateCriteria(inclusionCriteria));
    } else {
      setExclusionCriteria(updateCriteria(exclusionCriteria));
    }
  };

  const handleRemoveCriteria = (type: 'inclusion' | 'exclusion', id: string) => {
    if (type === 'inclusion') {
      setInclusionCriteria(inclusionCriteria.filter(block => block.id !== id));
    } else {
      setExclusionCriteria(exclusionCriteria.filter(block => block.id !== id));
    }
  };

  const toggleCriteriaBlock = (type: 'inclusion' | 'exclusion', id: string) => {
    const updateCriteria = (criteria: CriteriaBlock[]) => 
      criteria.map(block => 
        block.id === id 
          ? { ...block, isOpen: !block.isOpen } 
          : block
      );

    if (type === 'inclusion') {
      setInclusionCriteria(updateCriteria(inclusionCriteria));
    } else {
      setExclusionCriteria(updateCriteria(exclusionCriteria));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Cohort Explorer" 
        subtitle="Create and explore custom patient cohorts based on your study data"
        showStudySelector={true}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-4 mr-4">
            <div className="flex flex-col gap-1 text-right">
              <span className="text-sm text-muted-foreground">Cohort Size</span>
              <div className="text-2xl font-bold text-[#003f7f]">
                {(currentCohortSize || 0).toLocaleString()}
              </div>
        </div>
      </div>
    </div>

        {/* Cohort Overview Card */}
        <Card className="border border-none shadow-none mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Selected Study</span>
                <span className="font-medium">{currentStudyData?.name || 'No study selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Population Size</span>
                <span className="font-medium">{(populationSize || 0).toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Inclusion Criteria</span>
                <span className="font-medium">{inclusionCriteria.length} defined</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Exclusion Criteria</span>
                <span className="font-medium">{exclusionCriteria.length} defined</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="criteria" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="criteria">Criteria</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="criteria" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg"></CardTitle>
                    <CardDescription>
                      
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={handleApplyCriteria} 
                    disabled={isApplying || (inclusionCriteria.length === 0 && exclusionCriteria.length === 0)}
                  >
                    {isApplying ? (
                      <>
                        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Filter className="h-4 w-4 mr-2" />
                        Apply Criteria
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <CriteriaSection 
                    type="inclusion" 
                    criteria={inclusionCriteria} 
                    setCriteria={setInclusionCriteria} 
                  />
                  <CriteriaSection 
                    type="exclusion" 
                    criteria={exclusionCriteria} 
                    setCriteria={setExclusionCriteria} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg"></CardTitle>
                    <CardDescription>
                      
                    </CardDescription>
                  </div>
                  <Button variant="outline" disabled={!hasCriteriaApplied}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!hasCriteriaApplied ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <p className="text-lg text-muted-foreground text-center">
                      Select and apply criteria to view results for the custom cohort
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Cohort Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cohort Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-[#003f7f]">
                              {currentCohortSize.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Patients</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {((currentCohortSize / populationSize) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">of Original Population</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {inclusionCriteria.length + exclusionCriteria.length}
                            </div>
                            <div className="text-sm text-muted-foreground">Criteria Applied</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Demographics Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Gender Distribution */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Gender Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={{}} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={chartData?.genderData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  dataKey="count"
                                  label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                                >
                                  {chartData?.genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Age Distribution */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Age Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={{}} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={chartData?.ageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="ageGroup" />
                                <YAxis />
                                <ChartTooltip 
                                  content={<ChartTooltipContent />}
                                  formatter={(value) => [value, "Patients"]}
                                  labelFormatter={(label) => `Age Group: ${label}`}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="patients" 
                                  stroke="#2563eb"
                                  fill="#2563eb"
                                  fillOpacity={0.3}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Geographic and Clinical Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Geographic Distribution */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Geographic Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={{}} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData?.geographicData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="region" />
                                <YAxis />
                                <ChartTooltip 
                                  content={<ChartTooltipContent />}
                                  formatter={(value) => [value, "Patients"]}
                                  labelFormatter={(label) => `Region: ${label}`}
                                />
                                <Bar 
                                  dataKey="patients" 
                                  fill="#2563eb"
                                  radius={[4, 4, 0, 0]}
                                >
                                  {chartData?.geographicData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Clinical Characteristics */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Clinical Characteristics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={{}} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                                             <BarChart 
                                  data={chartData?.clinicalData} 
                                  layout="vertical"
                                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis 
                                  type="category" 
                                  dataKey="characteristic" 
                                  width={100}
                                  tick={{ fontSize: 12 }}
                                />
                                <ChartTooltip 
                                  content={<ChartTooltipContent />}
                                  formatter={(value) => [value, "Patients"]}
                                />
                                <Bar 
                                  dataKey="patients" 
                                  fill="#0066CC"
                                  radius={[0, 4, 4, 0]}
                                  barSize={20}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
