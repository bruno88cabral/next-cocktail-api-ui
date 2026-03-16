"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDrinks } from "@/features/drinks/hooks/useDrinks";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "../types";

type LandingPageProps = {
  data: LandingPageData;
};

export default function LandingPage({ data }: LandingPageProps) {
  const { featuredDrinks, loading, error } = useDrinks();

  return (
    <main className="mx-auto w-[75%] py-12 md:py-16">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {data.eyebrow}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
          {data.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {data.subtitle}
        </p>

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
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Featured drinks
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">API data</span>
        </div>

        {loading && <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Loading drinks...</p>}
        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">Failed to load drinks.</p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredDrinks.map((drink) => (
            <Card
              key={drink.idDrink}
              className="h-full gap-0 shadow-none"
            >
              <CardHeader>
                <CardTitle className="text-lg">{drink.strDrink}</CardTitle>
                <CardAction>
                  <Badge
                    variant={
                      (drink.strAlcoholic ?? "").toLowerCase().includes("non")
                        ? "nonAlcoholic"
                        : "alcoholic"
                    }
                    className="px-2.5 py-1"
                  >
                    {(drink.strAlcoholic ?? "").toLowerCase().includes("non")
                      ? "Non-alcoholic"
                      : "Alcoholic"}
                  </Badge>
                </CardAction>
                <CardDescription className="text-sm leading-6">
                  {drink.strInstructions ?? "No description available."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
                    <dd className="font-medium text-zinc-700 dark:text-zinc-200">
                      {drink.strCategory ?? "Unknown"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-zinc-500 dark:text-zinc-400">Glass</dt>
                    <dd className="font-medium text-zinc-700 dark:text-zinc-200">
                      {drink.strGlass ?? "Unknown"}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-2">
                  {(drink.strTags
                    ?.split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean) ?? []
                  ).map((tag) => (
                    <Badge
                      key={tag}
                      variant="tag"
                      className="px-2.5 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/drinks/${drink.idDrink}`}
                  className="inline-flex text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  View details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}