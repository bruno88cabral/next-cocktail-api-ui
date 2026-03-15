# next-cocktail-api-ui

Initial setup for the Next.js UI application that will consume a cocktail API.

## Stack

- Next.js (App Router)
- TypeScript
- ESLint
- Prettier

## Requirements

- Node.js 20+
- Yarn 1.22+

## Getting started

Install dependencies:

```bash
yarn
```

Run development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project architecture

```text
src
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── drinks
│   │   └── [id]
│   │       └── page.tsx
│   └── random
│       └── page.tsx
├── components
│   ├── ui
│   └── shared
├── features
│   ├── drinks
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   ├── utils
│   │   └── types.ts
│   ├── search
│   │   ├── components
│   │   ├── hooks
│   │   └── types.ts
│   └── random
│       ├── hooks
│       └── services
├── lib
│   ├── api.ts
│   ├── query-client.ts
│   └── utils.ts
├── types
└── utils
```

This repository follows a feature-based architecture. The current scope sets up
the initial structure only; implementation details for components, hooks,
services, and utilities will be added in future issues.

## Scripts

- `yarn dev`: start local development server
- `yarn build`: create production build
- `yarn start`: run production server
- `yarn lint`: run ESLint checks
- `yarn format`: format the project with Prettier
- `yarn format:check`: verify formatting with Prettier
