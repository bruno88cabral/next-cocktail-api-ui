"use client";

import { useEffect, useState } from "react";
import type { Drink } from "../types";
import { fetchDrinksByLetter } from "../services/drinksService";
import { getCached, setCached } from "../utils/cache";

function getCacheKey(letter: string): string {
  return `drinks_by_letter_${letter.toLowerCase()}`;
}

type UseDrinksByLetterResult = {
  drinks: Drink[];
  loading: boolean;
  error: Error | null;
};

export function useDrinksByLetter(letter: string): UseDrinksByLetterResult {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDrinks() {
      setLoading(true);
      setError(null);

      const cacheKey = getCacheKey(letter);
      const cached = getCached<Drink[]>(cacheKey);

      if (cached && cached.length > 0) {
        if (!cancelled) {
          setDrinks(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchDrinksByLetter(letter);

        if (!cancelled) {
          if (data.length > 0) {
            setCached(cacheKey, data);
          }
          setDrinks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDrinks();

    return () => {
      cancelled = true;
    };
  }, [letter]);

  return { drinks, loading, error };
}
