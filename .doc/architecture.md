# Architecture Documentation — Next Cocktail API UI

## Overview

Next Cocktail API UI is a client-side web application built with **Next.js 16 (App Router)** that consumes [TheCocktailDB](https://www.thecocktaildb.com/) public API to display cocktail information.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript (strict) | 5.x |
| UI Runtime | React | 19.2.3 |
| Styling | Tailwind CSS | 4.2.1 |
| Component Primitives | Radix UI | 1.4.3 |
| Data Fetching / State | React hooks + localStorage cache | — |
| Data Fetching (future) | TanStack Query | 5.90.21 |
| Testing | Vitest + Testing Library | 4.0.0 / 16.3.0 |
| Package Manager | Yarn | 1.22.x |

---

## Directory Structure

```
next-cocktail-api-ui/
├── .doc/                        # Project documentation
├── .github/
│   └── workflows/
│       ├── pr-validation.yml    # Lint + test on PRs
│       └── release-tag.yml      # Semantic version tagging on main
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (Header + Footer)
│   │   ├── page.tsx             # Home route (/)
│   │   ├── globals.css          # Global CSS variables and base styles
│   │   ├── drinks/[id]/
│   │   │   └── page.tsx         # Dynamic drink detail route (/drinks/:id)
│   │   └── random/
│   │       └── page.tsx         # Random drink route (/random)
│   ├── components/
│   │   ├── shared/              # App-wide layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                  # shadcn/ui-based design system
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── features/                # Feature-based modules (self-contained)
│   │   ├── drinks/              # Core drinks domain
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   │   └── useDrinks.ts
│   │   │   ├── services/
│   │   │   │   └── drinksService.ts
│   │   │   ├── utils/
│   │   │   │   └── cache.ts
│   │   │   └── types.ts
│   │   ├── landing/             # Home page feature
│   │   │   ├── components/
│   │   │   │   └── LandingPage.tsx
│   │   │   ├── utils/
│   │   │   │   └── mockedLandingData.ts
│   │   │   └── types.ts
│   │   ├── search/              # Search feature (stub)
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types.ts
│   │   └── random/              # Random drink feature (stub)
│   │       ├── hooks/
│   │       └── services/
│   ├── lib/
│   │   ├── api.ts               # API base URL configuration
│   │   ├── query-client.ts      # TanStack Query client setup
│   │   └── utils.ts             # Shared utilities (cn helper)
│   ├── types/                   # Global TypeScript types
│   └── utils/                   # Global utility functions
├── test/
│   └── setup.ts                 # Vitest global setup (mocks for Next.js)
└── public/                      # Static assets
```

---

## Architectural Patterns

### Feature-Based Organization

Each feature lives in `src/features/<name>/` and is fully self-contained:

```
features/drinks/
├── components/     # React components specific to this feature
├── hooks/          # Custom hooks (data fetching, local state)
├── services/       # API call functions
├── utils/          # Feature-specific utilities
└── types.ts        # TypeScript types/interfaces
```

This pattern prevents cross-feature coupling and makes each domain independently testable and replaceable.

### App Router Layout

The root layout (`src/app/layout.tsx`) wraps every page with `Header` and `Footer`. Individual routes are thin entry points that delegate rendering to feature components:

```
app/page.tsx  →  features/landing/components/LandingPage.tsx
```

### API Integration

API access is centralized through a two-layer pattern:

1. **Configuration** (`src/lib/api.ts`): Reads `NEXT_PUBLIC_COCKTAIL_API_BASE_URL` env var, falls back to the public TheCocktailDB endpoint.
2. **Service functions** (`features/*/services/*.ts`): Call the native `fetch` API, check response status, and return typed data.
3. **Custom hooks** (`features/*/hooks/*.ts`): Consume service functions, manage component-level state (`useState`/`useEffect`), and apply caching.

### Client-Side Caching

Drinks data is cached in `localStorage` via `features/drinks/utils/cache.ts`:

- TTL: **30 days**
- Format: JSON with a timestamp field
- Graceful fallback when `localStorage` is unavailable (e.g., SSR, private browsing)

### State Management

The current approach relies on React's built-in primitives:

- **`useState` / `useEffect`** inside custom hooks for async data
- **`localStorage`** for persistence across sessions
- **No global state manager** (no Redux, Zustand, or Context)

TanStack Query (`@tanstack/react-query`) is already installed and a query client is configured in `src/lib/query-client.ts`, ready to replace the manual fetch/cache pattern when the application scales.

---

## UI & Design System

### Component Library

UI primitives live in `src/components/ui/` and are built with:

- **Radix UI** — accessible, unstyled component primitives
- **class-variance-authority (cva)** — type-safe variant definitions
- **tailwind-merge** — conflict-free Tailwind class merging
- **clsx** — conditional className composition

### Theming

CSS custom properties defined in `globals.css` drive the entire color system:

```css
/* Light mode */
--background: oklch(...);
--foreground: oklch(...);

/* Dark mode — activated automatically via prefers-color-scheme */
```

Tailwind CSS 4 reads these variables directly. No `tailwind.config.js` is required for the theme — configuration is done via PostCSS.

### Typography

The **Geist** font family (loaded via `next/font/google`) is applied globally.

---

## Routing

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Landing page with featured drinks |
| `/drinks/[id]` | `app/drinks/[id]/page.tsx` | Drink detail page (dynamic) |
| `/random` | `app/random/page.tsx` | Random drink page |

---

## Testing

| Tool | Role |
|---|---|
| Vitest | Test runner |
| jsdom | DOM environment simulation |
| @testing-library/react | Component rendering and querying |
| @testing-library/jest-dom | Extended DOM matchers |

**Setup** (`test/setup.ts`): Mocks `next/navigation` and `next/router` globally so components can be tested in isolation without a running Next.js server. `fetch` is also stubbed globally.

**Conventions**: Test files live alongside the components they test (`Footer.test.tsx` next to `Footer.tsx`).

---

## CI/CD

### Pull Request Validation (`.github/workflows/pr-validation.yml`)

Triggered on PRs targeting `develop` or `main`:

1. Checkout code
2. Setup Node 20 with Corepack (Yarn)
3. `yarn install --frozen-lockfile`
4. `yarn lint` (ESLint)
5. `yarn test --run` (Vitest)

### Release Tagging (`.github/workflows/release-tag.yml`)

Triggered on every push to `main`:

- Checks if the current commit already has a semantic version tag
- If not, increments the patch version (e.g., `v0.1.0` → `v0.1.1`)
- Pushes the new tag back to the repository
- Initial version: `v0.1.0`

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_COCKTAIL_API_BASE_URL` | No | `https://www.thecocktaildb.com/api/json/v1/1` | Base URL for TheCocktailDB API |

---

## External Dependencies

**TheCocktailDB** (`https://www.thecocktaildb.com/api/json/v1/1`)

The only external service consumed by the application. Currently used endpoints:

| Endpoint | Description |
|---|---|
| `/search.php?f={letter}` | Search drinks by first letter |

---

## Future Considerations

- **TanStack Query** is already installed — intended to replace the manual `useState`/`localStorage` data-fetching pattern as the app grows.
- **`features/search/`** and **`features/random/`** directories exist as stubs awaiting implementation.
- No deployment pipeline is configured yet (Vercel, Docker, etc.).
- Test coverage reporting is not configured (can be enabled via `vitest --coverage`).
