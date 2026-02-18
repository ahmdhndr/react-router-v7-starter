import { Button } from "@components/ui/button";

import type { Route } from "./+types/home";

/**
 *
 * @description `_` keep the `Route` type for example
 * @description if didn't use the `Route.MetaArgs` type at all, simply remove it
 * @example export function meta() { ... }
 * @returns meta
 */
export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Basic React Router v7 Starter" },
		{
			name: "description",
			content:
				"Scalable React Router v7 basic starter powered by Vite, TailwindCSS v4, shadcn/ui, strict TypeScript, and commit-safe tooling.",
		},
	];
}

export default function Home() {
	return (
		<div className="mx-auto flex h-full min-h-screen w-full max-w-lg flex-col items-center justify-center space-y-2">
			<div className="space-y-2">
				<h1 className="text-center text-xl font-bold md:text-3xl">
					React Router v7 Starter
				</h1>

				<p className="text-muted-foreground w-full max-w-lg">
					Scalable React Router v7 basic starter powered by Vite, TailwindCSS
					v4, shadcn/ui, strict TypeScript, and commit-safe tooling.
				</p>

				<a
					href="https://github.com/ahmdhndr/react-router-v7-starter"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Github repo open in a new tab"
				>
					<Button>Github repo</Button>
				</a>
			</div>
			<div className="self-start">
				<h2 className="text-lg font-semibold md:text-xl">Features</h2>
				<ol>
					<li>File-based routing</li>
					<li>Type-safe environment variables</li>
					<li>Strict TypeScript</li>
					<li>Pre-commit lint + typecheck gate</li>
					<li>Production-ready build</li>
					<li>Scalable structure</li>
					<li>UI system with shadcn</li>
				</ol>
			</div>
		</div>
	);
}
