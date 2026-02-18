import { z } from "zod";

export const clientSchema = z.object({
	VITE_APP_NAME: z.string().min(1),
});

export const serverSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});
