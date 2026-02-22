import { Link } from "react-router";

import { AppLayout } from "@/components/layout/app-layout";

import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs) {
	return [{ title: "404 — Page not found" }];
}

export function loader() {
	// Throw a proper 404 so the status code is correct in SSR responses
	throw new Response("Not found", { status: 404 });
}

export default function NotFoundPage() {
	// This component is unreachable when loader throws, but React Router
	// requires a default export on every route file.
	return null;
}

// Renders inside AppLayout so the nav stays visible
export function ErrorBoundary(_: Route.ErrorBoundaryProps) {
	return (
		<AppLayout>
			<div className="flex flex-col items-center gap-4 py-16 text-center">
				<p className="text-muted-foreground/20 text-7xl font-bold tabular-nums">
					404
				</p>
				<h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
				<p className="text-muted-foreground text-sm">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<Link
					to="/"
					className="text-primary mt-2 text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
				>
					Go home
				</Link>
			</div>
		</AppLayout>
	);
}
