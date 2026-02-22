import { AppLayout } from "@/components/layout/app-layout";
import { RouteErrorBoundary } from "@/components/route-error-boundary";
import { TodoCreateForm } from "@/features/todos/components/todo-create-form";
import { TodoList } from "@/features/todos/components/todo-list";
import { TodoStats } from "@/features/todos/components/todo-stats";
import {
	createTodoSchema,
	deleteTodoSchema,
	updateTodoSchema,
} from "@/features/todos/server/todo.schema";
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from "@/features/todos/server/todo.server";
import { fail, ok } from "@/lib/server/http";

import type { Route } from "./+types/todos";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Todos — my-app" },
		{ name: "description", content: "Manage your tasks" },
	];
}

// ---------------------------------------------------------------------------
// Loader — runs on the server, data is serialized and sent to the client
// ---------------------------------------------------------------------------

export async function loader(_: Route.LoaderArgs) {
	const todos = await getTodos();
	return { todos };
}

// ---------------------------------------------------------------------------
// Action — handles all mutations via a discriminated "intent" field
// ---------------------------------------------------------------------------

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");

	switch (intent) {
		case "create": {
			const parsed = createTodoSchema.safeParse(Object.fromEntries(formData));
			if (!parsed.success) {
				return fail(
					"Validation failed",
					parsed.error.flatten().fieldErrors as Record<string, string>,
				);
			}
			const todo = await createTodo(parsed.data);
			return ok(todo, 201);
		}

		case "update": {
			const parsed = updateTodoSchema.safeParse(Object.fromEntries(formData));
			if (!parsed.success) {
				return fail(
					"Validation failed",
					parsed.error.flatten().fieldErrors as Record<string, string>,
				);
			}
			const { id, ...updates } = parsed.data;
			const todo = await updateTodo(id, updates);
			if (!todo) return fail("Todo not found", undefined, 404);
			return ok(todo);
		}

		case "delete": {
			const parsed = deleteTodoSchema.safeParse(Object.fromEntries(formData));
			if (!parsed.success) {
				return fail("Invalid request", undefined, 400);
			}
			await deleteTodo(parsed.data.id);
			return ok({ deleted: true });
		}

		default:
			return fail("Unknown intent", undefined, 400);
	}
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TodosPage({ loaderData }: Route.ComponentProps) {
	const { todos } = loaderData;

	return (
		<AppLayout>
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Manage your to-do list
					</p>
				</div>

				<TodoCreateForm />
				<TodoStats todos={todos} />
				<TodoList todos={todos} />
			</div>
		</AppLayout>
	);
}

// ---------------------------------------------------------------------------
// Error boundary — keeps the shell visible on route-level errors
// ---------------------------------------------------------------------------

export { RouteErrorBoundary as ErrorBoundary };
