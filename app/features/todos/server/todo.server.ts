import type {
	Todo,
	TodoCreateInput,
	TodoUpdateInput,
} from "@/features/todos/types";
import "@/lib/server/server-only";

/**
 * In-memory store. In a real app, swap every function body for your
 * ORM of choice (Prisma, Drizzle, etc.) — the interface stays the same.
 *
 * NOTE: This resets on every server restart in dev. That's expected
 * for a mock; persist to a DB for production.
 */
const store = new Map<string, Todo>([
	[
		"1",
		{
			id: "1",
			title: "Read React Router v7 docs",
			completed: true,
			createdAt: new Date("2025-01-01").toISOString(),
		},
	],
	[
		"2",
		{
			id: "2",
			title: "Set up production-grade starter",
			completed: false,
			createdAt: new Date("2025-01-02").toISOString(),
		},
	],
	[
		"3",
		{
			id: "3",
			title: "Add loader & action patterns",
			completed: false,
			createdAt: new Date("2025-01-03").toISOString(),
		},
	],
]);

function generateId(): string {
	return Math.random().toString(36).slice(2, 10);
}

// Simulate async latency so SSR streaming is observable in dev
function delay(ms = 80): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTodos(): Promise<Todo[]> {
	await delay();
	return [...store.values()].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);
}

export async function getTodoById(id: string): Promise<Todo | null> {
	await delay();
	return store.get(id) ?? null;
}

export async function createTodo(input: TodoCreateInput): Promise<Todo> {
	await delay();
	const todo: Todo = {
		id: generateId(),
		title: input.title.trim(),
		completed: false,
		createdAt: new Date().toISOString(),
	};
	store.set(todo.id, todo);
	return todo;
}

export async function updateTodo(
	id: string,
	input: TodoUpdateInput,
): Promise<Todo | null> {
	await delay();
	const existing = store.get(id);
	if (!existing) return null;
	const updated: Todo = { ...existing, ...input };
	store.set(id, updated);
	return updated;
}

export async function deleteTodo(id: string): Promise<boolean> {
	await delay();
	return store.delete(id);
}
