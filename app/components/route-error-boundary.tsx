import { Link, isRouteErrorResponse, useRouteError } from "react-router";

/**
 * In-page route-level error boundary. Import and export this as
 * `ErrorBoundary` from any route that needs isolated error handling
 * (i.e. you want the nav/shell to stay visible when the route fails).
 *
 * Usage in a route file:
 *   export { RouteErrorBoundary as ErrorBoundary } from "@/components/route-error-boundary";
 */
export function RouteErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<div className="flex flex-col items-center gap-3 py-16 text-center">
					<p className="text-muted-foreground/20 text-5xl font-bold tabular-nums">
						404
					</p>
					<h2 className="font-semibold">Not found</h2>
					<p className="text-muted-foreground text-sm">
						The page you&apos;re looking for doesn&apos;t exist.
					</p>
					<Link
						to="/"
						className="text-primary text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
					>
						Go home
					</Link>
				</div>
			);
		}

		return (
			<div className="border-destructive/30 bg-destructive/5 rounded-lg border p-6">
				<h2 className="text-destructive font-semibold">{error.status} Error</h2>
				<p className="text-muted-foreground mt-1 text-sm">{error.data}</p>
			</div>
		);
	}

	const message =
		error instanceof Error ? error.message : "An unexpected error occurred.";

	return (
		<div className="border-destructive/30 bg-destructive/5 rounded-lg border p-6">
			<h2 className="text-destructive font-semibold">Something went wrong</h2>
			<p className="text-muted-foreground mt-1 text-sm">{message}</p>
		</div>
	);
}
