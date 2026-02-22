import { z } from "zod";

export const createTodoSchema = z.object({
	title: z
		.string({ error: "Title is required" })
		.min(1, "Title cannot be empty")
		.max(200, "Title must be 200 characters or fewer")
		.trim(),
});

export const updateTodoSchema = z.object({
	id: z.string().min(1),
	title: z
		.string()
		.min(1, "Title cannot be empty")
		.max(200, "Title must be 200 characters or fewer")
		.trim()
		.optional(),
	completed: z
		.enum(["true", "false"])
		.transform((v) => v === "true")
		.optional(),
});

export const deleteTodoSchema = z.object({
	id: z.string().min(1),
});

export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;
export type DeleteTodoSchema = z.infer<typeof deleteTodoSchema>;
