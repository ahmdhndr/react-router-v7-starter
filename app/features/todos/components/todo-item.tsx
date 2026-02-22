import { Trash2 } from "lucide-react";
import { useFetcher } from "react-router";

import { Button } from "@/components/ui/button";
import type { Todo } from "@/features/todos/types";
import { cn } from "@/lib/utils";

interface TodoItemProps {
	todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
	const toggleFetcher = useFetcher();
	const deleteFetcher = useFetcher();

	const isDeleting = deleteFetcher.state !== "idle";
	// Optimistic UI: reflect the toggle immediately before the server responds
	const optimisticCompleted =
		toggleFetcher.state !== "idle"
			? toggleFetcher.formData?.get("completed") === "true"
			: todo.completed;

	return (
		<li
			className={cn(
				"group bg-card flex items-center gap-3 rounded-lg border px-4 py-3 shadow-sm transition-opacity",
				isDeleting && "pointer-events-none opacity-40",
			)}
		>
			{/* Toggle checkbox */}
			<toggleFetcher.Form method="post">
				<input type="hidden" name="intent" value="update" />
				<input type="hidden" name="id" value={todo.id} />
				<input
					type="hidden"
					name="completed"
					value={String(!optimisticCompleted)}
				/>
				<button
					type="submit"
					aria-label={optimisticCompleted ? "Mark incomplete" : "Mark complete"}
					className={cn(
						"flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
						optimisticCompleted
							? "border-primary bg-primary text-primary-foreground"
							: "border-muted-foreground hover:border-primary",
					)}
				>
					{optimisticCompleted && (
						<svg
							viewBox="0 0 12 10"
							fill="none"
							strokeWidth={2}
							stroke="currentColor"
							className="h-3 w-3"
						>
							<polyline points="1,5 4,8 11,1" />
						</svg>
					)}
				</button>
			</toggleFetcher.Form>

			{/* Title */}
			<span
				className={cn(
					"flex-1 text-sm transition-colors",
					optimisticCompleted && "text-muted-foreground line-through",
				)}
			>
				{todo.title}
			</span>

			{/* Delete */}
			<deleteFetcher.Form method="post">
				<input type="hidden" name="intent" value="delete" />
				<input type="hidden" name="id" value={todo.id} />
				<Button
					type="submit"
					variant="ghost"
					size="icon"
					aria-label="Delete todo"
					className="text-muted-foreground hover:text-destructive h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</deleteFetcher.Form>
		</li>
	);
}
