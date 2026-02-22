import type React from "react";

import { Link, useNavigation } from "react-router";

import { cn } from "@/lib/utils";

interface AppLayoutProps {
	children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	return (
		<div className="bg-background min-h-screen font-sans antialiased">
			{/* Top loading bar */}
			<div
				role="progressbar"
				aria-label="Page loading"
				aria-hidden={!isLoading}
				className={cn(
					"bg-primary fixed top-0 left-0 z-50 h-0.5 transition-all duration-300",
					isLoading ? "w-3/4 opacity-100" : "w-0 opacity-0",
				)}
			/>

			{/* Nav */}
			<header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
				<nav className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
					<Link
						to="/"
						className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
					>
						react-router-v7-starter
					</Link>
					<div className="flex items-center gap-4">
						<Link
							to="/todos"
							className="text-muted-foreground hover:text-foreground text-sm transition-colors"
						>
							Todos
						</Link>
					</div>
				</nav>
			</header>

			{/* Page content */}
			<main className="mx-auto max-w-2xl px-4 py-8">{children}</main>

			{/* Footer */}
			<footer className="border-t">
				<div className="mx-auto flex h-12 max-w-2xl items-center justify-between px-4">
					<p className="text-muted-foreground text-xs">
						Built with React Router v7 · TailwindCSS v4 · shadcn/ui
					</p>
					<p className="text-muted-foreground text-xs">
						{new Date().getFullYear()} &copy; Achmad Hendarsyah
					</p>
				</div>
			</footer>
		</div>
	);
}
