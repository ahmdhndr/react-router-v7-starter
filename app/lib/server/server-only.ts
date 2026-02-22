/**
 * A server-only guard. Import this at the top of any file that must never
 * be bundled for the browser. React Router v7 with SSR will tree-shake
 * server modules, but this provides an explicit runtime safety net.
 *
 * Usage: add `import "@/lib/server/server-only"` as the first line of
 * any server-exclusive module (db, auth, secrets, etc.).
 */
if (typeof window !== "undefined") {
	throw new Error(
		"Attempted to import a server-only module on the client. " +
			"Check your import graph for files that import from server-only utilities.",
	);
}
