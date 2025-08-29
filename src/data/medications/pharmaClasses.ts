// Pharmaceutical classes and their associated medications
export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosageForm: string;
  typicalDose: {
    loading?: string;
    maintenance: string;
    unit: string;
  };
  averageTreatmentDuration: number; // in months
  commonDiscontinuationReasons: Array<{
    reason: string;
    percentage: number;
  }>;
}

export interface PharmaClass {
  id: string;
  name: string;
  description: string;
  medications: Medication[];
}

export const cardiologyPharmaClasses: PharmaClass[] = [
  {
    id: 'ace_inhibitors',
    name: 'ACE Inhibitors',
    description: 'Angiotensin-converting enzyme inhibitors for blood pressure management',
    medications: [
      {
        id: 'captopril',
        name: 'Captopril',
        genericName: 'captopril',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '25-150',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 20,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 38 },
          { reason: 'Taste disturbance', percentage: 15 },
          { reason: 'Drug ineffectiveness', percentage: 27 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'enalapril',
        name: 'Enalapril',
        genericName: 'enalapril maleate',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '5-20',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 22,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 32 },
          { reason: 'Hyperkalemia', percentage: 18 },
          { reason: 'Drug ineffectiveness', percentage: 28 },
          { reason: 'Cost/Insurance', percentage: 22 }
        ]
      },
      {
        id: 'lisinopril',
        name: 'Lisinopril',
        genericName: 'lisinopril',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '10-40',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 24,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 35 },
          { reason: 'Hyperkalemia', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 25 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'ramipril',
        name: 'Ramipril',
        genericName: 'ramipril',
        dosageForm: 'Capsule',
        typicalDose: {
          maintenance: '2.5-10',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 26,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 30 },
          { reason: 'Hyperkalemia', percentage: 22 },
          { reason: 'Drug ineffectiveness', percentage: 28 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'benazepril',
        name: 'Benazepril',
        genericName: 'benazepril hydrochloride',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '10-40',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 23,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 33 },
          { reason: 'Hyperkalemia', percentage: 19 },
          { reason: 'Drug ineffectiveness', percentage: 26 },
          { reason: 'Cost/Insurance', percentage: 22 }
        ]
      }
    ]
  },
  {
    id: 'beta_blockers',
    name: 'Beta Blockers',
    description: 'Beta-adrenergic receptor blockers for heart rate and blood pressure control',
    medications: [
      {
        id: 'atenolol',
        name: 'Atenolol',
        genericName: 'atenolol',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '25-100',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 26,
        commonDiscontinuationReasons: [
          { reason: 'Fatigue', percentage: 28 },
          { reason: 'Cold extremities', percentage: 22 },
          { reason: 'Drug ineffectiveness', percentage: 30 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'metoprolol',
        name: 'Metoprolol',
        genericName: 'metoprolol tartrate/succinate',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '25-200',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 30,
        commonDiscontinuationReasons: [
          { reason: 'Fatigue', percentage: 25 },
          { reason: 'Dizziness', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 35 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'labetolol',
        name: 'Labetolol',
        genericName: 'labetolol hydrochloride',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '100-400',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 24,
        commonDiscontinuationReasons: [
          { reason: 'Dizziness', percentage: 30 },
          { reason: 'Fatigue', percentage: 25 },
          { reason: 'Drug ineffectiveness', percentage: 25 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'carvedilol',
        name: 'Carvedilol',
        genericName: 'carvedilol',
        dosageForm: 'Tablet',
        typicalDose: {
          loading: '3.125',
          maintenance: '6.25-25',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 28,
        commonDiscontinuationReasons: [
          { reason: 'Fatigue', percentage: 30 },
          { reason: 'Dizziness', percentage: 25 },
          { reason: 'Drug ineffectiveness', percentage: 25 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'propranolol',
        name: 'Propranolol',
        genericName: 'propranolol hydrochloride',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '40-320',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 22,
        commonDiscontinuationReasons: [
          { reason: 'Fatigue', percentage: 32 },
          { reason: 'Depression', percentage: 18 },
          { reason: 'Drug ineffectiveness', percentage: 30 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'bisoprolol',
        name: 'Bisoprolol',
        genericName: 'bisoprolol fumarate',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '2.5-10',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 32,
        commonDiscontinuationReasons: [
          { reason: 'Fatigue', percentage: 25 },
          { reason: 'Cold extremities', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 35 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      }
    ]
  },
  {
    id: 'anticoagulants',
    name: 'Anticoagulants',
    description: 'Blood thinning medications for stroke prevention',
    medications: [
      {
        id: 'lmw_heparin',
        name: 'LMW Heparin',
        genericName: 'low molecular weight heparin',
        dosageForm: 'Injection',
        typicalDose: {
          maintenance: '40-80',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 18,
        commonDiscontinuationReasons: [
          { reason: 'Injection site reactions', percentage: 35 },
          { reason: 'Bleeding risk', percentage: 30 },
          { reason: 'Patient compliance', percentage: 20 },
          { reason: 'Cost/Insurance', percentage: 15 }
        ]
      },
      {
        id: 'warfarin',
        name: 'Warfarin',
        genericName: 'warfarin sodium',
        dosageForm: 'Tablet',
        typicalDose: {
          loading: '5-10',
          maintenance: '2-10',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 36,
        commonDiscontinuationReasons: [
          { reason: 'Bleeding risk', percentage: 40 },
          { reason: 'INR monitoring burden', percentage: 25 },
          { reason: 'Drug interactions', percentage: 20 },
          { reason: 'Patient preference', percentage: 15 }
        ]
      },
      {
        id: 'dabigatran',
        name: 'Dabigatran',
        genericName: 'dabigatran etexilate',
        dosageForm: 'Capsule',
        typicalDose: {
          maintenance: '150',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 28,
        commonDiscontinuationReasons: [
          { reason: 'GI upset', percentage: 40 },
          { reason: 'Bleeding events', percentage: 25 },
          { reason: 'Cost/Insurance', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 15 }
        ]
      },
      {
        id: 'apixaban',
        name: 'Apixaban',
        genericName: 'apixaban',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '5',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 32,
        commonDiscontinuationReasons: [
          { reason: 'Bleeding events', percentage: 35 },
          { reason: 'Cost/Insurance', percentage: 30 },
          { reason: 'GI upset', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 15 }
        ]
      }
    ]
  },
  {
    id: 'antiarrhythmics',
    name: 'Antiarrhythmics',
    description: 'Medications for heart rhythm control',
    medications: [
      {
        id: 'diltiazem',
        name: 'Diltiazem',
        genericName: 'diltiazem hydrochloride',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '120-480',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 26,
        commonDiscontinuationReasons: [
          { reason: 'Peripheral edema', percentage: 30 },
          { reason: 'Constipation', percentage: 25 },
          { reason: 'Drug ineffectiveness', percentage: 25 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'captopril_antiarrhythmic',
        name: 'Captopril',
        genericName: 'captopril',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '25-150',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 20,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 38 },
          { reason: 'Taste disturbance', percentage: 15 },
          { reason: 'Drug ineffectiveness', percentage: 27 },
          { reason: 'Cost/Insurance', percentage: 20 }
        ]
      },
      {
        id: 'enalapril_antiarrhythmic',
        name: 'Enalapril',
        genericName: 'enalapril maleate',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '5-20',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 22,
        commonDiscontinuationReasons: [
          { reason: 'Dry cough', percentage: 32 },
          { reason: 'Hyperkalemia', percentage: 18 },
          { reason: 'Drug ineffectiveness', percentage: 28 },
          { reason: 'Cost/Insurance', percentage: 22 }
        ]
      },
      {
        id: 'amiodarone',
        name: 'Amiodarone',
        genericName: 'amiodarone hydrochloride',
        dosageForm: 'Tablet',
        typicalDose: {
          loading: '400-800',
          maintenance: '200-400',
          unit: 'mg daily'
        },
        averageTreatmentDuration: 18,
        commonDiscontinuationReasons: [
          { reason: 'Thyroid dysfunction', percentage: 30 },
          { reason: 'Pulmonary toxicity', percentage: 25 },
          { reason: 'Liver toxicity', percentage: 20 },
          { reason: 'Drug ineffectiveness', percentage: 25 }
        ]
      },
      {
        id: 'flecainide',
        name: 'Flecainide',
        genericName: 'flecainide acetate',
        dosageForm: 'Tablet',
        typicalDose: {
          maintenance: '50-150',
          unit: 'mg twice daily'
        },
        averageTreatmentDuration: 24,
        commonDiscontinuationReasons: [
          { reason: 'Proarrhythmic effects', percentage: 35 },
          { reason: 'Drug ineffectiveness', percentage: 30 },
          { reason: 'Visual disturbances', percentage: 20 },
          { reason: 'Cost/Insurance', percentage: 15 }
        ]
      }
    ]
  }
];

// Generate medication data for patients
export const generateMedicationData = (pharmaClassId: string, patientCount: number) => {
  const pharmaClass = cardiologyPharmaClasses.find(pc => pc.id === pharmaClassId);
  if (!pharmaClass) return [];

  const data = [];
  
  pharmaClass.medications.forEach(medication => {
    // Calculate how many patients are on this medication (random distribution)
    const patientCountForMed = Math.floor(Math.random() * patientCount * 0.3) + 50;
    
    data.push({
      medicationId: medication.id,
      medicationName: medication.name,
      patientCount: patientCountForMed,
      averageDose: medication.typicalDose.maintenance,
      unit: medication.typicalDose.unit,
      loadingDose: medication.typicalDose.loading,
      averageTreatmentDuration: medication.averageTreatmentDuration,
      discontinuationReasons: medication.commonDiscontinuationReasons.map(reason => ({
        ...reason,
        patientCount: Math.floor((patientCountForMed * reason.percentage) / 100)
      }))
    });
  });

  return data;
};

// Calculate pharma class distribution
export const getPharmaClassDistribution = () => {
  return cardiologyPharmaClasses.map(pharmaClass => {
    const totalPatients = pharmaClass.medications.reduce((sum, med) => {
      return sum + Math.floor(Math.random() * 800) + 200; // Random patient count per medication
    }, 0);

    return {
      category: pharmaClass.name,
      count: Math.floor(totalPatients / pharmaClass.medications.length), // Average across medications
      percentage: 0, // Will be calculated based on total
      pharmaClassId: pharmaClass.id
    };
  });
};