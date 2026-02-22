import { useNavigation } from "react-router";

import { TodoItem } from "@/features/todos/components/todo-item";
import type { Todo } from "@/features/todos/types";
import { cn } from "@/lib/utils";

interface TodoListProps {
	todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
	const navigation = useNavigation();
	const isNavigating = navigation.state === "loading";

	if (todos.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
				<p className="text-muted-foreground text-sm font-medium">
					No tasks yet
				</p>
				<p className="text-muted-foreground/60 mt-1 text-xs">
					Add one above to get started
				</p>
			</div>
		);
	}

	return (
		<ul
			className={cn(
				"flex flex-col gap-2 transition-opacity",
				isNavigating && "opacity-60",
			)}
			aria-label="Todo list"
			aria-live="polite"
		>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
}
