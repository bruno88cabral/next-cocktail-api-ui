export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-center px-6 md:px-12">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Powered by{" "}
          <a
            href="https://www.thecocktaildb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            TheCocktailDB
          </a>
        </p>
      </div>
    </footer>
  );
}
