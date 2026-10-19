import React, { createContext, useContext, useMemo, useState } from 'react';
import { EMPTY_FILTERS, type PlaceFilters } from '@/lib/placeFilters';

interface FiltersContextValue {
  filters: PlaceFilters;
  setFilters: React.Dispatch<React.SetStateAction<PlaceFilters>>;
  clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextValue | undefined>(undefined);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<PlaceFilters>(EMPTY_FILTERS);
  const value = useMemo(() => ({ filters, setFilters, clearFilters: () => setFilters(EMPTY_FILTERS) }), [filters]);
  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const value = useContext(FiltersContext);
  if (!value) throw new Error('useFilters precisa de FiltersProvider');
  return value;
}
