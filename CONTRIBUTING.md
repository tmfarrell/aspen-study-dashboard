# Contributing Guidelines

## Development Standards

### Data Architecture Rules

1. **Data Flow**: Components → React Query → API Layer → Data Layer
2. **No Direct Imports**: Components never import from `src/data/*`
3. **No Hard-coding**: All values should be derived from the data layer
4. **React Query Only**: Components only use React Query hooks for data access

### Before Making Changes

1. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for data flow patterns
2. Check if your change follows the layered architecture
3. Ensure no hard-coded values are introduced

### Code Review Checklist

- [ ] No `import` statements from `src/data/*` in components
- [ ] All data access uses React Query hooks
- [ ] No hard-coded arrays, objects, or configuration values
- [ ] API functions properly import and use data layer
- [ ] Query keys follow established patterns

### Common Violations to Avoid

```typescript
// ❌ DON'T: Direct data import in component
import { studyData } from '@/data/studyData';

// ❌ DON'T: Hard-coded values
const statuses = ['active', 'inactive']; 

// ❌ DON'T: Direct API calls
const data = await patientsApi.getAll();

// ✅ DO: Use React Query hooks
const { data } = usePatients(studyId);
```

### Making Data Changes

1. **Add to Data Layer**: Update `src/data/*` files
2. **Update API Layer**: Modify `src/state/*/api.ts` if needed
3. **Components Automatically Updated**: Through React Query

### New Feature Guidelines

1. **Plan Data Structure**: Design data in `src/data/*` first
2. **Create API Functions**: Add to appropriate `api.ts` file
3. **Add Query Hooks**: Create in `queries.ts` file
4. **Build Components**: Use only React Query hooks

This ensures consistency and maintainability across the codebase.