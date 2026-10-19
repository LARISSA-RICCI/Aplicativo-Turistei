import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@turistei_favoritos';

interface FavoritesContextValue {
  favoritos: string[];
  loaded: boolean;
  toggleFav: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const writeQueue = useRef(Promise.resolve());

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((value) => {
        if (!active || !value) return;
        const parsed: unknown = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setFavoritos([...new Set(parsed.filter((id): id is string => typeof id === 'string'))]);
        }
      })
      .catch(() => { /* Dados locais indisponíveis: iniciar lista vazia. */ })
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const payload = JSON.stringify(favoritos);
    // Serializa gravações para evitar que um clique antigo sobrescreva o mais recente.
    writeQueue.current = writeQueue.current
      .catch(() => {})
      .then(() => AsyncStorage.setItem(FAVORITES_KEY, payload));
  }, [favoritos, loaded]);

  const toggleFav = useCallback((id: string) => {
    setFavoritos((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favoritos.includes(id), [favoritos]);
  const value = useMemo(() => ({ favoritos, loaded, toggleFav, isFavorite }), [favoritos, loaded, toggleFav, isFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites precisa de FavoritesProvider');
  return context;
}
