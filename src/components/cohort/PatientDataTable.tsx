import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { PatientChartModal } from '@/components/PatientChartModal';
import { usePatients } from '@/state/patients';
import { useStudy } from '@/state/studies';
import { useAppState } from '@/contexts/AppStateContext';
import { PatientData, StudyType } from '@/api/types';

interface PatientDataTableProps {
  studyId?: StudyType;
}

const PatientDataTable: React.FC<PatientDataTableProps> = ({ studyId }) => {
  const { selectedStudy } = useAppState();
  const currentStudy = studyId || selectedStudy;
  
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data: patientsResponse, isLoading } = usePatients(
    { studyId: currentStudy },
    currentPage,
    pageSize
  );
  const { data: study } = useStudy(currentStudy);

  // Standard fields across all studies
  const standardFields = [
    { key: 'id', label: 'Patient ID', type: 'text' as const, formatter: undefined },
    { key: 'age', label: 'Age', type: 'number' as const, formatter: undefined },
    { key: 'gender', label: 'Gender', type: 'text' as const, formatter: undefined },
    { key: 'race', label: 'Race/Ethnicity', type: 'text' as const, formatter: undefined },
  ];

  // Get study-specific additional fields
  const additionalFields = study?.patientDisplayFields || [];
  const allFields = [...standardFields, ...additionalFields];

  const formatValue = (value: any, field: typeof allFields[0]) => {
    if (value === null || value === undefined) return 'N/A';
    
    switch (field.formatter) {
      case 'bmi-category':
        const bmi = parseFloat(value);
        if (bmi >= 40) return 'Class III';
        if (bmi >= 35) return 'Class II';
        if (bmi >= 30) return 'Class I';
        return 'Normal';
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'currency':
        return `$${parseFloat(value).toFixed(2)}`;
      case 'percentage':
        return `${(parseFloat(value) * 100).toFixed(1)}%`;
      default:
        return field.type === 'number' ? parseFloat(value).toFixed(1) : String(value);
    }
  };

  const renderCell = (patient: PatientData, field: typeof allFields[0]) => {
    const value = patient[field.key as keyof PatientData];
    const formattedValue = formatValue(value, field);

    if (field.type === 'badge' && field.formatter === 'bmi-category') {
      const bmi = parseFloat(value as string);
      const category = formattedValue;
      return (
        <Badge
          variant={
            category === 'Class III' ? 'destructive' :
            category === 'Class II' ? 'secondary' : 
            'outline'
          }
        >
          {category}
        </Badge>
      );
    }

    return formattedValue;
  };

  const handleViewChart = (patient: PatientData) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const totalPages = Math.ceil((patientsResponse?.pagination.total || 0) / pageSize);
  const patients = patientsResponse?.data || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patient Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Patient Data</CardTitle>
          <p className="text-sm text-muted-foreground">
            {patientsResponse?.pagination.total.toLocaleString()} patients across all sites
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {allFields.map((field) => (
                    <TableHead key={field.key}>{field.label}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    {allFields.map((field) => (
                      <TableCell key={field.key}>
                        {renderCell(patient, field)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewChart(patient)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Chart
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, patientsResponse?.pagination.total || 0)} of {patientsResponse?.pagination.total.toLocaleString()} patients
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <PatientChartModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PatientDataTable;