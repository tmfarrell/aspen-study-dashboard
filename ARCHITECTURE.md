# Architecture Guidelines

This document outlines the architectural principles and data flow patterns that must be followed in this project.

## Core Principles

### 1. Layered Data Architecture

```
Components → React Query Hooks → API Layer → Data Layer
```

- **Data Layer** (`src/data/*`): Contains all mock data, organized by study type
- **API Layer** (`src/state/*/api.ts`): Simulates backend APIs, only layer that imports from `src/data/*`
- **Query Layer** (`src/state/*/queries.ts`): React Query hooks that call API functions
- **Component Layer**: Only uses React Query hooks, never imports data directly

### 2. Data Organization

#### Study-Specific Data
```
src/data/study/
├── cardiology/
│   ├── index.ts          # Study configuration
│   ├── patients.ts       # Patient data generator
│   └── sites.ts          # Site data
├── diabetes/
├── obesity/
└── hypertension/
```

#### Shared Data
```
src/data/
├── studyData.ts          # Study registry
├── studyHelpers.ts       # Utility functions
└── patientHelpers.ts     # Patient data utilities
```

### 3. API Layer Standards

#### API Functions Must:
- Be in `src/state/*/api.ts` files
- Import data only from `src/data/*`
- Return consistent `ApiResponse<T>` format
- Simulate realistic delays and behavior

#### Example API Structure:
```typescript
// src/state/patients/api.ts
import { patientData } from '@/data/studyData';

export const patientsApi = {
  getAll: async (studyId: StudyType): Promise<ApiResponse<Patient[]>> => {
    // Implementation that uses data layer
  }
};
```

### 4. React Query Layer Standards

#### Query Hooks Must:
- Be in `src/state/*/queries.ts` files
- Use consistent query key patterns
- Only call API functions, never import data directly
- Include proper TypeScript types

#### Example Query Structure:
```typescript
// src/state/patients/queries.ts
import { patientsApi } from './api';

export const usePatients = (studyId: StudyType) => {
  return useQuery({
    queryKey: ['patients', studyId],
    queryFn: () => patientsApi.getAll(studyId),
    select: (response) => response.data,
  });
};
```

### 5. Component Standards

#### Components Must:
- Only use React Query hooks for data
- Never import from `src/data/*` directly
- Never hard-code values that could come from data
- Derive all configuration from the data layer

#### ❌ Wrong - Direct Data Import:
```typescript
import { studyData } from '@/data/studyData';

const Component = () => {
  const study = studyData.cardiology; // Wrong!
```

#### ✅ Correct - React Query:
```typescript
import { useStudy } from '@/state/studies/queries';

const Component = () => {
  const { data: study } = useStudy('cardiology'); // Correct!
```

## Data Flow Examples

### Patient Data Flow
1. **Data**: `src/data/study/cardiology/patients.ts` - Patient generator functions
2. **API**: `src/state/patients/api.ts` - Calls patient generators
3. **Query**: `src/state/patients/queries.ts` - React Query hooks
4. **Component**: Uses `usePatients()` hook

### Study Configuration Flow
1. **Data**: `src/data/study/cardiology/index.ts` - Study configuration
2. **API**: `src/state/studies/api.ts` - Accesses study config
3. **Query**: `src/state/studies/queries.ts` - React Query hooks
4. **Component**: Uses `useStudy()` hook

## Validation Checklist

Before submitting code, ensure:

- [ ] No components import from `src/data/*`
- [ ] All data access goes through React Query
- [ ] API functions are the only code importing data
- [ ] No hard-coded values in components
- [ ] Query keys follow consistent patterns
- [ ] API responses use `ApiResponse<T>` format

## Migration Guidelines

When refactoring existing code:

1. **Identify Direct Data Imports**: Search for imports from `src/data/*`
2. **Create API Endpoints**: Add functions to appropriate `api.ts` files
3. **Create Query Hooks**: Add hooks to appropriate `queries.ts` files
4. **Update Components**: Replace direct imports with React Query hooks
5. **Remove Hard-coding**: Extract values to data layer if needed

## File Naming Conventions

- API files: `src/state/{domain}/api.ts`
- Query files: `src/state/{domain}/queries.ts`
- Data files: `src/data/{domain}/` or `src/data/study/{study}/`
- Components: `src/components/{feature}/` or `src/components/`

## Common Anti-Patterns

### ❌ Component Importing Data
```typescript
import { studyData } from '@/data/studyData';
```

### ❌ Hard-coded Values
```typescript
const regions = ['US', 'EU', 'APAC']; // Should come from data
```

### ❌ API Logic in Components
```typescript
const patients = generatePatients(studyId); // Should use React Query
```

### ❌ Direct State Management
```typescript
const [data, setData] = useState(mockData); // Should use React Query
```

This architecture ensures maintainable, testable, and consistent data flow throughout the application.