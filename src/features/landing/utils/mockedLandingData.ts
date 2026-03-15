import type { LandingPageData } from "../types";

export const mockedLandingData: LandingPageData = {
  eyebrow: "Cocktail Explorer",
  title: "Discover your next favorite drink",
  subtitle:
    "Browse curated cocktail suggestions and jump into random discoveries while the API integration is in progress.",
  actions: [
    {
      label: "Explore random drink",
      href: "/random",
      variant: "primary",
    },
    {
      label: "Open drink #11007",
      href: "/drinks/11007",
      variant: "secondary",
    },
  ],
  featuredDrinks: [
    {
      id: "11007",
      name: "Margarita",
      category: "Ordinary Drink",
      glass: "Cocktail glass",
      alcoholic: true,
      description:
        "A bright, citrus-forward classic with tequila, orange liqueur, and lime.",
      tags: ["Citrus", "Classic"],
    },
    {
      id: "11000",
      name: "Mojito",
      category: "Cocktail",
      glass: "Highball glass",
      alcoholic: true,
      description:
        "Fresh mint and lime balanced with rum and soda for a crisp, refreshing sip.",
      tags: ["Refreshing", "Mint"],
    },
    {
      id: "11001",
      name: "Old Fashioned",
      category: "Cocktail",
      glass: "Old-fashioned glass",
      alcoholic: true,
      description:
        "A spirit-forward favorite with whiskey, bitters, and a touch of sweetness.",
      tags: ["Spirit-forward", "Classic"],
    },
  ],
};