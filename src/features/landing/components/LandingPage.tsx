import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LandingPageData } from "../types";

type LandingPageProps = {
  data: LandingPageData;
};

export default function LandingPage({ data }: LandingPageProps) {
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
            <Link
              key={action.href}
              href={action.href}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                action.variant === "primary"
                  ? "border-zinc-900 bg-zinc-900 text-zinc-50 hover:bg-zinc-700 hover:border-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:border-zinc-300 dark:hover:bg-zinc-300"
                  : "border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
              )}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Featured drinks
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Mocked data</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.featuredDrinks.map((drink) => (
            <article
              key={drink.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {drink.name}
                </h3>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {drink.alcoholic ? "Alcoholic" : "Non-alcoholic"}
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{drink.description}</p>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
                  <dd className="font-medium text-zinc-700 dark:text-zinc-200">{drink.category}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500 dark:text-zinc-400">Glass</dt>
                  <dd className="font-medium text-zinc-700 dark:text-zinc-200">{drink.glass}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {drink.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/drinks/${drink.id}`}
                className="mt-5 inline-flex text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                View details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}