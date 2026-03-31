"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDrinksByLetter } from "../hooks/useDrinksByLetter";
import DrinkCard from "./DrinkCard";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type DrinkListingPageProps = {
  letter: string;
};

export default function DrinkListingPage({ letter }: DrinkListingPageProps) {
  const { drinks, loading, error } = useDrinksByLetter(letter);

  const currentLetter = letter.toUpperCase();

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-16">
      {/* Hero Section */}
      <header className="mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-amber-500">
              Mixology Collection
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
              Drinks by letter{" "}
              <span className="italic text-amber-500">
                &ldquo;{currentLetter}&rdquo;
              </span>
            </h1>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Explore cocktails and drinks starting with the letter{" "}
            {currentLetter}. Browse the full alphabet to discover more.
          </p>
        </div>
      </header>

      {/* Alphabet Navigation */}
      <section className="mb-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h4 className="mb-3 text-sm font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
          Browse by letter
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALPHABET.map((l) => (
            <Badge
              key={l}
              asChild
              variant={l === currentLetter ? "default" : "outline"}
              className="cursor-pointer px-2.5 py-0.5"
            >
              <Link href={`/drinks/letter/${l.toLowerCase()}`}>{l}</Link>
            </Badge>
          ))}
        </div>
      </section>

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

      {/* Empty State */}
      {!loading && !error && drinks.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No drinks found starting with &ldquo;{currentLetter}&rdquo;.
          </p>
          <Button asChild variant="outline">
            <Link href="/drinks/letter/a">Browse letter A</Link>
          </Button>
        </div>
      )}

      {/* Drinks Grid */}
      {!loading && !error && drinks.length > 0 && (
        <>
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {drinks.map((drink) => (
              <DrinkCard key={drink.idDrink} drink={drink} />
            ))}
          </section>

          <div className="mt-16 flex justify-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Showing {drinks.length} drink{drinks.length !== 1 ? "s" : ""}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
