import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@turistei_favoritos';

export function useFavorites() {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((stored) => {
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as string[];
            setFavoritos(Array.isArray(parsed) ? parsed : []);
          } catch {
            setFavoritos([]);
          }
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const toggleFav = useCallback((id: string) => {
    setFavoritos((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoritos.includes(id),
    [favoritos]
  );

  return { favoritos, toggleFav, isFavorite, loaded };
}
