"use client";

import { useEffect, useState } from "react";
import type { Drink } from "../types";
import { fetchDrinks } from "../services/drinksService";
import { getCached, setCached } from "../utils/cache";

const DRINKS_CACHE_KEY = "drinks_cache_v2";

type UseDrinksResult = {
  drinks: Drink[];
  featuredDrinks: Drink[];
  loading: boolean;
  error: Error | null;
};

function pickRandomDrinks(drinks: Drink[], total: number): Drink[] {
  const shuffledDrinks = [...drinks];

  for (let index = shuffledDrinks.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentDrink = shuffledDrinks[index];
    shuffledDrinks[index] = shuffledDrinks[randomIndex];
    shuffledDrinks[randomIndex] = currentDrink;
  }

  return shuffledDrinks.slice(0, total);
}

export function useDrinks(): UseDrinksResult {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [featuredDrinks, setFeaturedDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDrinks() {
      const cached = getCached<Drink[]>(DRINKS_CACHE_KEY);

      if (cached && cached.length > 0) {
        if (!cancelled) {
          setDrinks(cached);
          setFeaturedDrinks(pickRandomDrinks(cached, 3));
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchDrinks();

        if (!cancelled) {
          if (data.length > 0) {
            setCached(DRINKS_CACHE_KEY, data);
          }
          setDrinks(data);
          setFeaturedDrinks(pickRandomDrinks(data, 3));
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
  }, []);

  return { drinks, featuredDrinks, loading, error };
}
