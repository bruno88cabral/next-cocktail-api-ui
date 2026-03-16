const DEFAULT_COCKTAIL_API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const configuredApiBaseUrl = process.env.NEXT_PUBLIC_COCKTAIL_API_BASE_URL?.trim();

export const API_BASE_URL = (
	configuredApiBaseUrl && configuredApiBaseUrl.length > 0
		? configuredApiBaseUrl
		: DEFAULT_COCKTAIL_API_BASE_URL
).replace(/\/+$/, "");
