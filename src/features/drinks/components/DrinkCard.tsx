import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
  const tags = drink.strTags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean) ?? [];

  return (
    <Link
      href={`/drinks/${drink.idDrink}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {drink.strDrinkThumb ? (
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
            <span className="text-sm text-zinc-400">No image</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {drink.strCategory && (
            <Badge variant="secondary" className="text-[10px] uppercase">
              {drink.strCategory}
            </Badge>
          )}
          {drink.strAlcoholic && (
            <Badge
              variant={
                drink.strAlcoholic.toLowerCase().includes("non")
                  ? "nonAlcoholic"
                  : "alcoholic"
              }
              className="text-[10px] uppercase"
            >
              {drink.strAlcoholic}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col space-y-2 p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold leading-none tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
            {drink.strDrink}
          </h3>
        </div>

        <p className="flex-grow text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {drink.strInstructions
            ? drink.strInstructions.length > 120
              ? `${drink.strInstructions.slice(0, 120)}...`
              : drink.strInstructions
            : "No description available."}
        </p>

        {(drink.strGlass || tags.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            {drink.strGlass && (
              <>
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                  Served in:
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  {drink.strGlass}
                </span>
              </>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="tag" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
