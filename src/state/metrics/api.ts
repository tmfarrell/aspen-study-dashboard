// Metrics API functions
import { 
  StudyMetrics, 
  MetricResult, 
  MetricDefinition,
  CategoricalMetric,
  NumericalMetric,
  getAllMetricsForStudy
} from '@/data/studyHelpers';
import { StudyType, PatientData } from '@/api/types';
import { generateStudyPatients } from '@/data/patientHelpers';
import { getStudySites } from '@/data/studyHelpers';
import { cardiologyPatientConfig } from '@/data/study/cardiology/patients';
import { obesityPatientConfig } from '@/data/study/obesity/patients';
import { diabetesPatientConfig } from '@/data/study/diabetes/patients';
import { hypertensionPatientConfig } from '@/data/study/hypertension/patients';

// Cache for computed metrics to avoid recalculation
// Clear cache on startup to ensure fresh data with enrollment categories
const metricsCache = new Map<StudyType, StudyMetrics>();

// Simulate network delay
const delay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Get patient config for study
const getPatientConfig = (studyId: StudyType) => {
  switch (studyId) {
    case 'cardiology': return cardiologyPatientConfig;
    case 'obesity': return obesityPatientConfig;
    case 'diabetes': return diabetesPatientConfig;
    case 'hypertension': return hypertensionPatientConfig;
    default: return obesityPatientConfig;
  }
};

// Calculate categorical metric
const calculateCategoricalMetric = (
  definition: MetricDefinition,
  patients: PatientData[]
): CategoricalMetric => {
  const counts = new Map<string, number>();
  const total = patients.length;

  patients.forEach(patient => {
    let value: any;
    
    if (definition.field === 'medications' || definition.field === 'medicalHistory') {
      // Handle array fields - count each item separately
      const arrayValue = patient[definition.field as keyof PatientData] as string[];
      arrayValue.forEach(item => {
        counts.set(item, (counts.get(item) || 0) + 1);
      });
      return;
    } else if (definition.field === 'enrollmentCategory') {
      // Handle enrollment category field
      value = patient.enrollmentCategory;
      if (!value) {
        console.warn(`Patient ${patient.id} missing enrollmentCategory, available fields:`, Object.keys(patient));
        return; // Skip patients without enrollment category
      }
    } else {
      value = patient[definition.field as keyof PatientData];
    }
    
    const stringValue = String(value || 'Unknown');
    counts.set(stringValue, (counts.get(stringValue) || 0) + 1);
  });

  const data = Array.from(counts.entries())
    .map(([category, count]) => ({
      category,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    }))
    .sort((a, b) => b.count - a.count);

  return {
    id: definition.id,
    name: definition.name,
    type: 'categorical',
    data,
    total
  };
};

// Calculate numerical metric
const calculateNumericalMetric = (
  definition: MetricDefinition,
  patients: PatientData[]
): NumericalMetric => {
  const values: number[] = [];
  
  patients.forEach(patient => {
    let value: number;
    
    if (definition.field === 'medicalHistory') {
      // For comorbidity count
      value = (patient.medicalHistory as string[]).length;
    } else {
      value = patient[definition.field as keyof PatientData] as number;
    }
    
    if (typeof value === 'number' && !isNaN(value)) {
      values.push(value);
    }
  });

  if (values.length === 0) {
    return {
      id: definition.id,
      name: definition.name,
      type: 'numerical',
      min: 0,
      max: 0,
      average: 0,
      median: 0,
      data: [],
      total: 0
    };
  }

  values.sort((a, b) => a - b);
  const min = values[0];
  const max = values[values.length - 1];
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  const median = values[Math.floor(values.length / 2)];

  // Create buckets
  let buckets: Array<{ min: number; max: number; label: string }> = [];
  
  if (definition.buckets) {
    buckets = definition.buckets;
  } else {
    const bucketCount = 5;
    const range = max - min;
    const bucketSize = range / bucketCount;
    
    for (let i = 0; i < bucketCount; i++) {
      const bucketMin = min + (i * bucketSize);
      const bucketMax = i === bucketCount - 1 ? max : min + ((i + 1) * bucketSize);
      buckets.push({
        min: bucketMin,
        max: bucketMax,
        label: `${Math.round(bucketMin)}-${Math.round(bucketMax)}`
      });
    }
  }

  // Count values in each bucket
  const data = buckets.map(bucket => {
    const count = values.filter(val => val >= bucket.min && val <= bucket.max).length;
    return {
      bucket: bucket.label,
      min: bucket.min,
      max: bucket.max,
      count,
      percentage: (count / values.length) * 100
    };
  });

  return {
    id: definition.id,
    name: definition.name,
    type: 'numerical',
    min,
    max,
    average: Math.round(average * 100) / 100,
    median,
    data,
    total: values.length
  };
};

// Calculate all metrics for a study
const calculateStudyMetrics = (studyId: StudyType): StudyMetrics => {
  const sites = getStudySites(studyId);
  const config = getPatientConfig(studyId);
  console.log(`Patient config for ${studyId}:`, config.enrollmentCategories ? config.enrollmentCategories.length + ' categories' : 'No enrollment categories');
  const patients = generateStudyPatients(studyId, sites, config);
  
  console.log(`Generated ${patients.length} patients for ${studyId}`);
  console.log(`Sample patient:`, patients[0]);
  console.log(`Enrollment categories in sample:`, patients.slice(0, 5).map(p => ({ id: p.id, enrollmentCategory: p.enrollmentCategory })));
  
  const metricDefinitions = getAllMetricsForStudy(studyId);
  console.log(`Metric definitions for ${studyId}:`, metricDefinitions);
  
  const metrics: MetricResult[] = [];

  metricDefinitions.forEach(definition => {
    try {
      if (definition.type === 'categorical') {
        const metric = calculateCategoricalMetric(definition, patients);
        console.log(`Calculated categorical metric ${definition.id}:`, metric.data.length > 0 ? metric.data : 'No data');
        metrics.push(metric);
      } else {
        const metric = calculateNumericalMetric(definition, patients);
        console.log(`Calculated numerical metric ${definition.id}:`, metric.data.length > 0 ? metric.data : 'No data');
        metrics.push(metric);
      }
    } catch (error) {
      console.error(`Error calculating metric ${definition.id}:`, error);
    }
  });

  return {
    studyId,
    totalPatients: patients.length,
    metrics,
    generatedAt: new Date().toISOString()
  };
};

export const metricsApi = {
  getStudyMetrics: async (studyId: StudyType): Promise<StudyMetrics> => {
    await delay();
    
    // Force cache clear to ensure fresh data with enrollment categories
    metricsCache.clear();
    
    // Calculate and cache metrics
    const metrics = calculateStudyMetrics(studyId);
    console.log(`Generated metrics for ${studyId}:`, metrics.metrics.map(m => ({ id: m.id, name: m.name })));
    metricsCache.set(studyId, metrics);
    
    return metrics;
  },

  getMetricById: async (studyId: StudyType, metricId: string): Promise<MetricResult | null> => {
    await delay();
    
    const studyMetrics = await metricsApi.getStudyMetrics(studyId);
    return studyMetrics.metrics.find(m => m.id === metricId) || null;
  },

  // Clear cache (useful for testing or forced refresh)
  clearCache: () => {
    metricsCache.clear();
  }
};