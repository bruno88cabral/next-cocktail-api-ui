export type Drink = {
  idDrink: string;
  strDrink: string;
  strCategory: string | null;
  strAlcoholic: string | null;
  strGlass: string | null;
  strInstructions: string | null;
  strDrinkThumb: string | null;
  strTags: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
};

export type DrinksApiResponse = {
  drinks: Drink[] | "no data found" | null;
};

export type CacheEntry<T> = {
  data: T;
  timestamp: number;
};
