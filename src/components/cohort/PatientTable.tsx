
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PatientTable = () => {
  const samplePatients = [
    { id: "P001", age: 45, bmi: 32.1, state: "Texas", gender: "F" },
    { id: "P002", age: 58, bmi: 36.8, state: "California", gender: "M" },
    { id: "P003", age: 62, bmi: 41.2, state: "Florida", gender: "F" },
    { id: "P004", age: 39, bmi: 33.7, state: "New York", gender: "M" },
    { id: "P005", age: 51, bmi: 38.9, state: "Pennsylvania", gender: "F" },
    { id: "P006", age: 44, bmi: 35.4, state: "Illinois", gender: "M" },
    { id: "P007", age: 67, bmi: 30.8, state: "Ohio", gender: "F" },
    { id: "P008", age: 29, bmi: 42.3, state: "Georgia", gender: "M" },
    { id: "P009", age: 55, bmi: 37.1, state: "North Carolina", gender: "F" },
    { id: "P010", age: 48, bmi: 34.6, state: "Michigan", gender: "M" }
  ];

  const getBMICategory = (bmi: number) => {
    if (bmi >= 40) return "Class III";
    if (bmi >= 35) return "Class II";
    return "Class I";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Patient Data</CardTitle>
        <p className="text-sm text-muted-foreground">
          First 10 patients from the cohort (showing diversity)
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>BMI</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Gender</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {samplePatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.bmi}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getBMICategory(patient.bmi) === "Class III" 
                      ? "bg-destructive/10 text-destructive"
                      : getBMICategory(patient.bmi) === "Class II"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {getBMICategory(patient.bmi)}
                  </span>
                </TableCell>
                <TableCell>{patient.state}</TableCell>
                <TableCell>{patient.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PatientTable;
