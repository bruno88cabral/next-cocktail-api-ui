import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Drink } from "../types";

type DrinkDetailPageProps = {
  drink: Drink;
};

type Ingredient = {
  name: string;
  measure: string;
};

function getIngredients(drink: Drink): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 6; i++) {
    const name = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];

    if (name && typeof name === "string" && name.trim()) {
      ingredients.push({
        name: name.trim(),
        measure: typeof measure === "string" && measure.trim() ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function getTags(drink: Drink): string[] {
  return (
    drink.strTags
      ?.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean) ?? []
  );
}

export default function DrinkDetailPage({ drink }: DrinkDetailPageProps) {
  const ingredients = getIngredients(drink);
  const tags = getTags(drink);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden md:h-[650px]">
        {drink.strDrinkThumb ? (
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:px-12">
          <div className="mx-auto max-w-5xl">
            {drink.strCategory && (
              <Badge
                variant="alcoholic"
                className="mb-4 text-[10px] uppercase"
              >
                {drink.strCategory}
              </Badge>
            )}

            <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {drink.strDrink}
            </h1>

            <div className="flex flex-wrap gap-3">
              {drink.strAlcoholic && (
                <Badge
                  variant={
                    drink.strAlcoholic.toLowerCase().includes("non")
                      ? "nonAlcoholic"
                      : "alcoholic"
                  }
                  className="gap-1.5 py-1 text-[11px]"
                >
                  {drink.strAlcoholic}
                </Badge>
              )}
              {drink.strGlass && (
                <Badge variant="outline" className="gap-1.5 py-1 text-[11px]">
                  {drink.strGlass}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column - Instructions */}
          <div className="space-y-10 lg:col-span-7">
            {/* Instructions */}
            {drink.strInstructions && (
              <div className="space-y-4">
                <h2 className="font-serif text-3xl text-amber-500 dark:text-amber-400">
                  The Preparation
                </h2>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {drink.strInstructions}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Ingredients */}
          <div className="space-y-8 lg:col-span-5">
            {/* Ingredients Card */}
            {ingredients.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="mb-6 font-serif text-2xl">Ingredients</h3>

                <ul className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={ingredient.name}
                      className={`flex items-center justify-between pb-3 ${
                        index < ingredients.length - 1
                          ? "border-b border-zinc-100 dark:border-zinc-800/50"
                          : ""
                      }`}
                    >
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {ingredient.name}
                      </span>
                      {ingredient.measure && (
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          {ingredient.measure}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800/50">
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="tag" className="text-[11px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
