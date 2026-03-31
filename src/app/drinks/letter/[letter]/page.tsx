import DrinkListingPage from "@/features/drinks/components/DrinkListingPage";

interface Props {
  params: Promise<{ letter: string }>;
}

export default async function DrinksLetterPage({ params }: Props) {
  const { letter } = await params;

  return <DrinkListingPage letter={letter} />;
}
