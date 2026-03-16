import { API_BASE_URL } from "@/lib/api";
import type { Drink, DrinksApiResponse } from "../types";

function normalizeDrinksResponse(data: DrinksApiResponse): Drink[] {
  if (!data.drinks || data.drinks === "no data found") {
    return [];
  }

  return data.drinks;
}

export async function fetchDrinks(): Promise<Drink[]> {
  const response = await fetch(`${API_BASE_URL}/search.php?f=a`);

  if (!response.ok) {
    throw new Error(`Failed to fetch drinks: ${response.statusText}`);
  }

  const data: DrinksApiResponse = await response.json();

  return normalizeDrinksResponse(data);
}
