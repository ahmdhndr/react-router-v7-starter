import { z } from "zod";

const schema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("production"),
});

const result = schema.safeParse(import.meta.env);

if (!result.success) {
	console.error("\n❌ Invalid environment variables:\n");
	console.error(result.error.format());
	throw new Error("Invalid environment variables");
}

export const env = result.data;
