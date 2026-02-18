import process from "node:process";
import z from "zod";

import { serverSchema } from "./schema";

// eslint-disable-next-line n/no-process-env
const result = serverSchema.safeParse(process.env);

if (!result.success) {
	console.error("\n❌ Invalid SERVER env:\n");
	console.error(z.prettifyError(result.error));
	throw new Error("Invalid server environment variables");
}

export const serverEnv = result.data;
