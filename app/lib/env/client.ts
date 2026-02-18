import z from "zod";

import { clientSchema } from "./schema";

const result = clientSchema.safeParse(import.meta.env);

if (!result.success) {
	console.error("\n❌ Invalid CLIENT env:\n");
	console.error(z.prettifyError(result.error));
	throw new Error("Invalid client environment variables");
}

export const clientEnv = result.data;
