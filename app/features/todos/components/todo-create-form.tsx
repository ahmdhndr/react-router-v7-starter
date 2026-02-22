import { useEffect, useRef } from "react";

import { Plus } from "lucide-react";
import { useFetcher } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ActionResponse } from "@/types";

export function TodoCreateForm() {
	const fetcher = useFetcher<ActionResponse>();
	const inputRef = useRef<HTMLInputElement>(null);
	const isSubmitting = fetcher.state !== "idle";

	// Clear and refocus input after successful submission
	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data?.ok) {
			if (inputRef.current) {
				inputRef.current.value = "";
				inputRef.current.focus();
			}
		}
	}, [fetcher.state, fetcher.data]);

	const titleError = fetcher.data?.fieldErrors?.title;

	return (
		<fetcher.Form method="post" noValidate>
			<input type="hidden" name="intent" value="create" />
			<div className="flex flex-col gap-1.5">
				<div className="flex gap-2">
					<Input
						ref={inputRef}
						name="title"
						placeholder="Add a new task…"
						autoComplete="off"
						disabled={isSubmitting}
						aria-label="New todo title"
						aria-describedby={titleError ? "title-error" : undefined}
						aria-invalid={!!titleError}
						className={
							titleError
								? "border-destructive focus-visible:ring-destructive"
								: ""
						}
					/>
					<Button type="submit" disabled={isSubmitting} aria-label="Add todo">
						<Plus className="h-4 w-4" />
						<span>Add</span>
					</Button>
				</div>
				{titleError && (
					<p id="title-error" className="text-destructive text-xs">
						{titleError}
					</p>
				)}
				{fetcher.data?.ok === false && !titleError && (
					<p className="text-destructive text-xs">{fetcher.data.error}</p>
				)}
			</div>
		</fetcher.Form>
	);
}
