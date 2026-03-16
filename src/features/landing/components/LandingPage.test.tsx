import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LandingPage from "./LandingPage";

vi.mock("@/features/drinks/hooks/useDrinks", () => ({
  useDrinks: vi.fn(),
}));

import { useDrinks } from "@/features/drinks/hooks/useDrinks";

const mockedUseDrinks = vi.mocked(useDrinks);

const baseData = {
  eyebrow: "Discover",
  title: "Cocktail Explorer",
  subtitle: "Browse classic and modern cocktails.",
  actions: [
    { label: "Random drink", href: "/random", variant: "primary" as const },
    { label: "Browse drinks", href: "/drinks", variant: "secondary" as const },
  ],
  featuredDrinks: [],
};

describe("LandingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders hero content and call-to-action links", () => {
    mockedUseDrinks.mockReturnValue({
      drinks: [],
      featuredDrinks: [],
      loading: false,
      error: null,
    });

    render(<LandingPage data={baseData} />);

    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cocktail Explorer" })).toBeInTheDocument();
    expect(screen.getByText("Browse classic and modern cocktails.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Random drink" })).toHaveAttribute("href", "/random");
    expect(screen.getByRole("link", { name: "Browse drinks" })).toHaveAttribute("href", "/drinks");
  });

  it("renders loading and error states", () => {
    mockedUseDrinks.mockReturnValue({
      drinks: [],
      featuredDrinks: [],
      loading: true,
      error: new Error("Request failed"),
    });

    render(<LandingPage data={baseData} />);

    expect(screen.getByText("Loading drinks...")).toBeInTheDocument();
    expect(screen.getByText("Failed to load drinks.")).toBeInTheDocument();
  });

  it("renders featured drink details", () => {
    mockedUseDrinks.mockReturnValue({
      drinks: [],
      featuredDrinks: [
        {
          idDrink: "11000",
          strDrink: "Mojito",
          strCategory: "Cocktail",
          strAlcoholic: "Alcoholic",
          strGlass: "Highball glass",
          strInstructions: "Muddle mint leaves with sugar and lime juice.",
          strDrinkThumb: null,
          strTags: "IBA,Classic",
          strIngredient1: null,
          strIngredient2: null,
          strIngredient3: null,
          strIngredient4: null,
          strIngredient5: null,
          strIngredient6: null,
          strMeasure1: null,
          strMeasure2: null,
          strMeasure3: null,
          strMeasure4: null,
          strMeasure5: null,
          strMeasure6: null,
        },
      ],
      loading: false,
      error: null,
    });

    render(<LandingPage data={baseData} />);

    expect(screen.getByRole("heading", { name: "Featured drinks" })).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("Alcoholic")).toBeInTheDocument();
    expect(screen.getByText("Cocktail")).toBeInTheDocument();
    expect(screen.getByText("Highball glass")).toBeInTheDocument();
    expect(screen.getByText("IBA")).toBeInTheDocument();
    expect(screen.getByText("Classic")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute("href", "/drinks/11000");
  });
});
