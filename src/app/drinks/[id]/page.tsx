import { notFound } from "next/navigation";
import { fetchDrinkById } from "@/features/drinks/services/drinksService";
import DrinkDetailPage from "@/features/drinks/components/DrinkDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DrinkDetailsPage({ params }: Props) {
  const { id } = await params;
  const drink = await fetchDrinkById(id);

  if (!drink) {
    notFound();
  }

  return <DrinkDetailPage drink={drink} />;
}
