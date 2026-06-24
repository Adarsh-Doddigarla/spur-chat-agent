import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  ALLOWED_ORIGIN: z.string().min(1, "ALLOWED_ORIGIN is required"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  LLM_PROVIDER: z.string().default("openai"),
  LLM_MODEL: z.string().default("gpt-4o-mini"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  GEMINI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  LLM_TIMEOUT_MS: z.string().default("20000"),
  LLM_MAX_OUTPUT_TOKENS: z.string().default("400"),
  LLM_MAX_HISTORY: z.string().default("12"),
  MAX_MESSAGE_LENGTH: z.string().default("2000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  parsed.error.issues.forEach((err) => {
    console.error(`   ${err.path.join(".")}: ${err.message}`);
  });
  process.exit(1);
}

const env = parsed.data;

export const config = {
  PORT: parseInt(env.PORT, 10),
  ALLOWED_ORIGIN: env.ALLOWED_ORIGIN,
  DATABASE_URL: env.DATABASE_URL,
  LLM_PROVIDER: env.LLM_PROVIDER,
  LLM_MODEL: env.LLM_MODEL,
  OPENAI_API_KEY: env.OPENAI_API_KEY,
  GEMINI_API_KEY: env.GEMINI_API_KEY,
  GROQ_API_KEY: env.GROQ_API_KEY,
  LLM_TIMEOUT_MS: parseInt(env.LLM_TIMEOUT_MS, 10),
  LLM_MAX_OUTPUT_TOKENS: parseInt(env.LLM_MAX_OUTPUT_TOKENS, 10),
  LLM_MAX_HISTORY: parseInt(env.LLM_MAX_HISTORY, 10),
  MAX_MESSAGE_LENGTH: parseInt(env.MAX_MESSAGE_LENGTH, 10),
};
