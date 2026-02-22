import { Link } from "react-router";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "my-app" },
		{ name: "description", content: "React Router v7 production starter" },
	];
}

export default function HomePage() {
	return (
		<AppLayout>
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">
						React Router v7 Starter
					</h1>
					<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
						A production-grade foundation with SSR, type-safe loaders &amp;
						actions, Zod validation, error boundaries, and a feature-based
						folder structure.
					</p>
				</div>

				<div className="bg-card rounded-lg border p-5">
					<h2 className="text-sm font-semibold">Included patterns</h2>
					<ul className="text-muted-foreground mt-3 space-y-1.5 text-sm">
						<li>✓ SSR loader + action with intent-based routing</li>
						<li>
							✓ Optimistic UI via <code className="text-xs">useFetcher</code>
						</li>
						<li>
							✓ Zod validation — server-side with field-level errors surfaced to
							client
						</li>
						<li>✓ Server-only module guard</li>
						<li>✓ Root + route-level error boundaries</li>
						<li>✓ 404 not-found route</li>
						<li>✓ Top-level loading indicator</li>
						<li>✓ Feature-based folder structure</li>
					</ul>
				</div>

				<Button asChild className="w-fit">
					<Link to="/todos">View Todo demo →</Link>
				</Button>
			</div>
		</AppLayout>
	);
}
