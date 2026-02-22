import type { Todo } from "@/features/todos/types";

interface TodoStatsProps {
	todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
	const total = todos.length;
	const completed = todos.filter((t) => t.completed).length;
	const remaining = total - completed;

	if (total === 0) return null;

	return (
		<div className="text-muted-foreground flex items-center justify-between text-xs">
			<span>
				{remaining} {remaining === 1 ? "task" : "tasks"} remaining
			</span>
			<span>
				{completed}/{total} completed
			</span>
		</div>
	);
}
