export type LandingAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type FeaturedDrink = {
  id: string;
  name: string;
  category: string;
  glass: string;
  alcoholic: boolean;
  description: string;
  tags: string[];
};

export type LandingPageData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions: LandingAction[];
  featuredDrinks: FeaturedDrink[];
};