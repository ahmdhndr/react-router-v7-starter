# Production Extension Guide

This document describes every pattern added on top of the base starter
and explains the **why** behind each decision.

---

## Updated folder tree

```
app/
├── components/
│   ├── layout/
│   │   └── app-layout.tsx          # Shell: nav, loading bar, footer
│   ├── ui/
│   │   ├── button.tsx              # (existing)
│   │   ├── input.tsx               # NEW — shadcn Input
│   │   └── tabs.tsx                # (existing)
│   ├── root-error-boundary.tsx     # NEW — full-page error UI (root level)
│   └── route-error-boundary.tsx    # NEW — in-page error UI (route level)
│
├── features/
│   └── todos/                      # Self-contained feature slice
│       ├── components/
│       │   ├── todo-create-form.tsx
│       │   ├── todo-item.tsx
│       │   ├── todo-list.tsx
│       │   └── todo-stats.tsx
│       ├── server/
│       │   ├── todo.schema.ts      # Zod schemas (shared client/server)
│       │   └── todo.server.ts      # Data layer (server-only)
│       └── types/
│           └── index.ts
│
├── lib/
│   ├── env/                        # (existing)
│   └── server/
│       ├── http.ts                 # NEW — ok/fail/notFound/redirectTo helpers
│       └── server-only.ts          # NEW — runtime client-import guard
│
├── routes/
│   ├── home.tsx                    # Updated
│   ├── todos.tsx                   # NEW — loader + action demo
│   └── not-found.tsx               # NEW — catch-all 404
│
├── types/
│   └── index.ts                    # NEW — shared ActionResponse type
│
├── root.tsx                        # Updated — ErrorBoundary wired
└── routes.ts                       # Updated — todos + catch-all added
```

---

## Patterns explained

### 1. Feature-based folder structure

Each feature lives in `app/features/<name>/` and owns its own components,
server code, types, and validation. Routes import from features — features
never import from routes.

```
features/todos/
  components/   ← React components for this feature
  server/       ← Server-only modules (data, validation)
  types/        ← TypeScript types
```

This keeps the codebase navigable as it scales. Adding a new feature
means creating a new `features/<name>/` slice without touching anything else.

---

### 2. Server-only guard (`lib/server/server-only.ts`)

Add this import as the **first line** of any file that must never reach
the client bundle:

```ts
import "@/lib/server/server-only";
```

It throws at runtime if `window` is defined, making accidental client-side
imports loud and obvious rather than silent.

Real-world use: any file that imports your ORM, reads secrets, or calls
internal APIs should have this guard.

---

### 3. Loader pattern

```ts
// routes/todos.tsx
export async function loader(_: Route.LoaderArgs) {
 const todos = await getTodos();
 return { todos }; // serialized to JSON, typed via Route.ComponentProps
}

export default function TodosPage({ loaderData }: Route.ComponentProps) {
 const { todos } = loaderData; // fully typed, no useEffect, no useQuery
}
```

Loaders run **on the server** on first load and on the server during
client-side navigation. The return value is serialized over the wire.
Never put server-only imports in the component body — only in loaders/actions.

---

### 4. Action pattern — intent-based routing

All mutations for a route go through a single `action()`. The `intent`
hidden field acts as a discriminator:

```ts
export async function action({ request }: Route.ActionArgs) {
 const formData = await request.formData();
 const intent = formData.get("intent");

 switch (intent) {
  case "create": {
   /* ... */
  }
  case "update": {
   /* ... */
  }
  case "delete": {
   /* ... */
  }
  default:
   return fail("Unknown intent", undefined, 400);
 }
}
```

This avoids the proliferation of resource routes for simple CRUD and keeps
all mutation logic co-located with the route it belongs to.

---

### 5. Zod validation — server-side with client-surfaced errors

Schemas live in `features/todos/server/todo.schema.ts`. They are imported
by the action on the server. Field errors are serialized in the response
and read by `useFetcher` on the client:

```ts
// Server (action)
const parsed = createTodoSchema.safeParse(Object.fromEntries(formData));
if (!parsed.success) {
 return fail("Validation failed", parsed.error.flatten().fieldErrors);
}

// Client (component)
const fetcher = useFetcher<ActionResponse>();
const titleError = fetcher.data?.fieldErrors?.title;
```

No client-side validation library needed. Server is the source of truth.

---

### 6. Optimistic UI with `useFetcher`

`todo-item.tsx` uses two independent fetchers — one for toggling, one for
deletion. The toggle updates the UI immediately before the server responds:

```ts
const optimisticCompleted =
 toggleFetcher.state !== "idle"
  ? toggleFetcher.formData?.get("completed") === "true"
  : todo.completed;
```

When the server responds, React Router revalidates the loader and the UI
syncs to the real state. If the server fails, the optimistic state reverts.

---

### 7. HTTP helpers (`lib/server/http.ts`)

A small set of typed helpers that standardize how loaders and actions
respond:

| Helper                               | Use case                   |
| ------------------------------------ | -------------------------- |
| `ok(data, status?)`                  | Success JSON response      |
| `fail(error, fieldErrors?, status?)` | Error JSON response        |
| `notFound(message?)`                 | Throws a 404 Response      |
| `forbidden(message?)`                | Throws a 403 Response      |
| `redirectTo(url, status?)`           | Throws a redirect Response |

Throwing a `Response` in a loader is caught by React Router and rendered
by the nearest `ErrorBoundary`.

---

### 8. Error boundaries — two levels

**Root (`root-error-boundary.tsx`)** — Full-page error with `<html>` shell.
Rendered by `root.tsx` when an error has nowhere else to go. Handles
unmatched status codes and unexpected exceptions.

**Route (`route-error-boundary.tsx`)** — In-page error that keeps the nav
and shell visible. Export it from any route:

```ts
export { RouteErrorBoundary as ErrorBoundary } from "@/components/route-error-boundary";
```

When a loader `throw`s a `Response`, it's caught here. When an unexpected
error occurs during rendering, it's also caught here.

---

### 9. 404 not-found route

`routes/not-found.tsx` is registered last in `routes.ts` as a catch-all:

```ts
route("*", "routes/not-found.tsx"),
```

Its loader immediately throws a `Response` with status 404, ensuring the
HTTP response code is correct for SSR (important for SEO and crawlers).
Its `ErrorBoundary` export renders the user-visible 404 page inside
`AppLayout` so the nav stays intact.

---

### 10. Loading indicator

`AppLayout` reads `useNavigation().state` and renders a top progress bar
that appears during route transitions:

```ts
const isLoading = navigation.state === "loading";
// thin fixed bar at top of viewport, opacity + width transition
```

This provides visual feedback without a heavy spinner library.

---

## Swapping the mock data layer for a real one

Every function in `todo.server.ts` has this shape:

```ts
export async function getTodos(): Promise<Todo[]> { ... }
export async function createTodo(input: TodoCreateInput): Promise<Todo> { ... }
export async function updateTodo(id: string, input: TodoUpdateInput): Promise<Todo | null> { ... }
export async function deleteTodo(id: string): Promise<boolean> { ... }
```

To migrate to Prisma, Drizzle, or any other ORM, replace the function
bodies — the rest of the app (routes, components, schemas) stays untouched.
