import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("todos", "routes/todos.tsx"),

	// Catch all - must be last. Renders 404 Error Boundary.
	route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
