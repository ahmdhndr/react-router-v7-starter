import "@/lib/server/server-only";
import type { ActionResponse } from "@/types";

/** Throw a redirect with a proper status code. */
export function redirectTo(
	url: string,
	status: 301 | 302 | 303 | 307 | 308 = 302,
): never {
	throw Response.redirect(url, status);
}

/** Return a typed JSON success response from an action. */
export function ok<T>(data: T, status = 200): Response {
	return Response.json({ ok: true, data } satisfies ActionResponse<T>, {
		status,
	});
}

/** Return a typed JSON error response from an action. */
export function fail(
	error: string,
	fieldErrors?: Record<string, string>,
	status = 422,
): Response {
	return Response.json(
		{ ok: false, error, fieldErrors } satisfies ActionResponse,
		{ status },
	);
}

/** Throw a 404 Response — caught by the nearest ErrorBoundary. */
export function notFound(message = "Not found"): never {
	throw new Response(message, { status: 404 });
}

/** Throw a 403 Response. */
export function forbidden(message = "Forbidden"): never {
	throw new Response(message, { status: 403 });
}
