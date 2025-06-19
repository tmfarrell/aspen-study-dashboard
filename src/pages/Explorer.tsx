import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Plus, Users, Stethoscope, Pill, Eye, Scissors, TestTube, FileText, Calendar, Database, GripVertical, X, ChevronDown } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    options: ['Observation Type', 'Value', 'Date']
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

// Study data configuration
const studyData = {
  obesity: {
    name: 'Obesity Registry',
    studySize: '10,000 patients',
    cohortSize: '4,291,377',
    totalPatients: '8,000',
    totalDescription: 'of 10,000 target patients enrolled'
  },
  diabetes: {
    name: 'Diabetes Registry',
    studySize: '15,000 patients',
    cohortSize: '3,856,249',
    totalPatients: '12,500',
    totalDescription: 'of 15,000 target patients enrolled'
  },
  hypertension: {
    name: 'MASH Registry',
    studySize: '8,500 patients',
    cohortSize: '2,147,832',
    totalPatients: '6,800',
    totalDescription: 'of 8,500 target patients enrolled'
  }
};

interface CriteriaBlock {
  id: string;
  type: string;
  config: Record<string, string>;
  isOpen: boolean;
}

const Explorer = () => {
  const [selectedStudy, setSelectedStudy] = useState('obesity');
  const [inclusionCriteria, setInclusionCriteria] = useState<CriteriaBlock[]>([]);
  const [exclusionCriteria, setExclusionCriteria] = useState<CriteriaBlock[]>([]);

  const currentStudyData = studyData[selectedStudy as keyof typeof studyData];

  const handleAddCriteria = (type: 'inclusion' | 'exclusion') => {
    const newBlock: CriteriaBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: '',
      config: {},
      isOpen: true
    };

    if (type === 'inclusion') {
      setInclusionCriteria([...inclusionCriteria, newBlock]);
    } else {
      setExclusionCriteria([...exclusionCriteria, newBlock]);
    }
  };

  const handleRemoveCriteria = (type: 'inclusion' | 'exclusion', id: string) => {
    if (type === 'inclusion') {
      setInclusionCriteria(inclusionCriteria.filter(block => block.id !== id));
    } else {
      setExclusionCriteria(exclusionCriteria.filter(block => block.id !== id));
    }
  };

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

  const handleDragEnd = (result: any, type: 'inclusion' | 'exclusion') => {
    if (!result.destination) return;

    const items = type === 'inclusion' ? [...inclusionCriteria] : [...exclusionCriteria];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (type === 'inclusion') {
      setInclusionCriteria(items);
    } else {
      setExclusionCriteria(items);
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

  const CriteriaSection = ({ type, criteria, setCriteria }: { 
    type: 'inclusion' | 'exclusion', 
    criteria: CriteriaBlock[],
    setCriteria: React.Dispatch<React.SetStateAction<CriteriaBlock[]>>
  }) => (
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
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, type)}>
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
                        <Card className="border border-dashed">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                              </div>
                              <Select
                                value={block.type}
                                onValueChange={(value) => handleCriteriaTypeChange(type, block.id, value)}
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
                                onClick={() => toggleCriteriaBlock(type, block.id)}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${block.isOpen ? 'transform rotate-180' : ''}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCriteria(type, block.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {block.type && block.isOpen && (
                              <div className="space-y-4 mt-4">
                                {criteriaTypes.find(t => t.id === block.type)?.options.map((option) => (
                                  <div key={option} className="grid grid-cols-2 gap-4">
                                    <label className="text-sm font-medium text-muted-foreground">
                                      {option}:
                                    </label>
                                    <Input
                                      value={block.config[option] || ''}
                                      onChange={(e) => handleConfigChange(type, block.id, option, e.target.value)}
                                      placeholder={`Enter ${option.toLowerCase()}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={() => handleAddCriteria(type)}
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

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="pt-2">
                <h1 className="text-2xl font-bold text-[#003f7f]">Cohort Explorer</h1>
                <p className="text-muted-foreground">Create and explore custom patient cohorts based on your study data</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 ml-4">
            <label className="text-sm font-medium text-muted-foreground">Select Study:</label>
            <Select value={selectedStudy} onValueChange={setSelectedStudy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a study" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="obesity">Obesity Registry</SelectItem>
                <SelectItem value="diabetes">Diabetes Registry</SelectItem>
                <SelectItem value="hypertension">MASH Registry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 mr-4">
            <div className="flex flex-col gap-1 text-right">
              <span className="text-sm text-muted-foreground">Cohort Size</span>
              <div className="text-2xl font-bold text-[#003f7f]">{currentStudyData.cohortSize}</div>
            </div>
          </div>
        </div>

        {/* Cohort Overview Card */}
        <Card className="border border-none shadow-none mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Selected Study</span>
                <span className="font-medium">{currentStudyData.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Study Size</span>
                <span className="font-medium">{currentStudyData.studySize}</span>
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
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Criteria
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
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Additional Results Content */}
                <div className="space-y-4">
                  <Card className="border border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Demographics Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Select and apply criteria to view demographic distribution
                    </CardContent>
                  </Card>

                  <Card className="border border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Geographic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Select and apply criteria to view geographic distribution
                    </CardContent>
                  </Card>

                  <Card className="border border-dashed">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Clinical Characteristics</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Select and apply criteria to view clinical characteristics
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explorer;
