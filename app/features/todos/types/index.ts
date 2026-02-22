export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string; // ISO string — safe across SSR serialization boundary
}

export type TodoCreateInput = Pick<Todo, "title">;
export type TodoUpdateInput = Partial<Pick<Todo, "title" | "completed">>;
