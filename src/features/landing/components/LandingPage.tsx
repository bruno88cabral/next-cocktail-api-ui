"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDrinks } from "@/features/drinks/hooks/useDrinks";
import DrinkCard from "@/features/drinks/components/DrinkCard";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "../types";

type LandingPageProps = {
  data: LandingPageData;
};

export default function LandingPage({ data }: LandingPageProps) {
  const { featuredDrinks, loading, error } = useDrinks();

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-16">
      {/* Hero Section */}
      <header className="mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-amber-500">
              {data.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
              {data.title}
            </h1>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            {data.subtitle}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {data.actions.map((action) => (
            <Button
              key={action.href}
              asChild
              variant={action.variant === "primary" ? "default" : "outline"}
              className={cn("rounded-full px-5 py-2.5")}
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </header>

      {/* Featured Drinks */}
      <section className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Featured drinks
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            API data
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Loading drinks...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center py-20">
            <p className="text-sm text-red-600 dark:text-red-400">
              Failed to load drinks. Please try again later.
            </p>
          </div>
        )}

        {/* Drinks Grid */}
        {!loading && !error && featuredDrinks.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDrinks.map((drink) => (
                <DrinkCard key={drink.idDrink} drink={drink} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Showing {featuredDrinks.length} featured drink
                {featuredDrinks.length !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
