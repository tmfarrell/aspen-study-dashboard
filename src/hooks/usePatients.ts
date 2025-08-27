import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { patientsApi } from '@/api/services';
import { PatientFilters } from '@/api/types';

// Query keys
export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  list: (filters?: PatientFilters) => [...patientKeys.lists(), filters] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
};

// Get paginated patients
export const usePatients = (filters?: PatientFilters, page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: [...patientKeys.list(filters), page, limit],
    queryFn: () => patientsApi.getAll(filters, page, limit),
    select: (response) => response,
    placeholderData: (previousData) => previousData,
  });
};

// Get infinite scroll patients
export const usePatientsInfinite = (filters?: PatientFilters, limit: number = 50) => {
  return useInfiniteQuery({
    queryKey: [...patientKeys.list(filters), 'infinite'],
    queryFn: ({ pageParam }: { pageParam: number }) => patientsApi.getAll(filters, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      patients: data.pages.flatMap(page => page.data),
      totalCount: data.pages[0]?.pagination.total || 0,
    }),
  });
};

// Get single patient
export const usePatient = (id: string) => {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => patientsApi.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

// Get patient summary stats
export const usePatientStats = (filters?: PatientFilters) => {
  return useQuery({
    queryKey: [...patientKeys.all, 'stats', filters],
    queryFn: async () => {
      const response = await patientsApi.getAll(filters, 1, 1000); // Get more for stats
      const patients = response.data;
      
      return {
        total: patients.length,
        byGender: {
          male: patients.filter(p => p.gender === 'male').length,
          female: patients.filter(p => p.gender === 'female').length,
          other: patients.filter(p => p.gender === 'other').length,
        },
        byStatus: {
          active: patients.filter(p => p.status === 'active').length,
          completed: patients.filter(p => p.status === 'completed').length,
          withdrawn: patients.filter(p => p.status === 'withdrawn').length,
        },
        averageAge: Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length),
        averageBMI: Math.round((patients.reduce((sum, p) => sum + p.bmi, 0) / patients.length) * 10) / 10,
      };
    },
    select: (data) => data,
  });
};