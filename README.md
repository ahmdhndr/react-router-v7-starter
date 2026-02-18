# React Router v7 Starter

Basic starter built with:

- React Router v7
- Vite
- TypeScript (strict)
- TailwindCSS v4
- shadcn/ui
- ESLint (flat config)
- Prettier
- Husky + lint-staged
- Zod env validation

## Features

- File-based routing (React Router v7)
- Type-safe environment variables
- Strict TypeScript
- Pre-commit lint + typecheck gate
- Production-ready build
- Scalable structure
- UI system with shadcn
- Dark mode ready
- Clean architecture

## Quick Start

```bash
pnpm create https://github.com/ahmdhndr/react-router-v7-starter my-app
cd my-app
pnpm install
pnpm dev
```

## Environment

Copy and edit:

```bash
cp .env.example .env
```

## Scripts

```bash
pnpm build           # production build
pnpm start           # production start
pnpm dev             # start dev server
pnpm lint            # eslint check
pnpm lint:fix        # eslint fix
pnpm typecheck       # typescript check
pnpm format:check    # prettier check
pnpm format          # prettier format/write
pnpm format:ci       # prettier list-different
```

## Project Structure

```
app/
  routes/        # file-based routing
  components/
    ui/          # shadcn
  lib/
  hooks/
```

## Tech Stack

- React 19
- React Router v7
- Vite
- TypeScript
- TailwindCSS v4
- shadcn/ui
- Zod
