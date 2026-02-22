import { Link, isRouteErrorResponse, useRouteError } from "react-router";

/**
 * Root-level error boundary. Rendered by root.tsx when an error bubbles
 * all the way up. Also used as the default for routes that don't define
 * their own ErrorBoundary.
 */
export function RootErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return <ErrorPage status={error.status} message={error.data} />;
	}

	const message =
		error instanceof Error ? error.message : "An unexpected error occurred.";

	return <ErrorPage status={500} message={message} />;
}

interface ErrorPageProps {
	status: number;
	message?: string;
}

function ErrorPage({ status, message }: ErrorPageProps) {
	const title = statusTitle(status);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{`${status} — ${title}`}</title>
			</head>
			<body className="bg-background flex min-h-screen flex-col items-center justify-center gap-4 p-8 font-sans antialiased">
				<p className="text-muted-foreground/30 text-6xl font-bold tabular-nums">
					{status}
				</p>
				<h1 className="text-xl font-semibold tracking-tight">{title}</h1>
				{message && status !== 404 && (
					<p className="text-muted-foreground max-w-sm text-center text-sm">
						{message}
					</p>
				)}
				<Link
					to="/"
					className="text-primary mt-2 text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
				>
					Go home
				</Link>
			</body>
		</html>
	);
}

function statusTitle(status: number): string {
	const titles: Record<number, string> = {
		400: "Bad Request",
		401: "Unauthorized",
		403: "Forbidden",
		404: "Page Not Found",
		422: "Unprocessable Content",
		500: "Internal Server Error",
	};
	return titles[status] ?? "Something went wrong";
}
