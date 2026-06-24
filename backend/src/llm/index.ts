import { buildMessages } from "./prompt";
import { LLMMessage, LLMProvider } from "./types";
import { config } from "../config/env";
import { GroqProvider } from "./groq";
import { OpenAIProvider } from "./openai";
import { GeminiProvider } from "./gemini";

function createProvider(): LLMProvider {
  switch (config.LLM_PROVIDER) {
    case "openai":
      return new OpenAIProvider(
        config.LLM_MODEL,
        config.OPENAI_API_KEY ?? "",
        config.LLM_TIMEOUT_MS
      );
    case "gemini":
      return new GeminiProvider(
        config.LLM_MODEL,
        config.GEMINI_API_KEY ?? "",
        config.LLM_TIMEOUT_MS
      );
    case "groq":
    default:
      return new GroqProvider(
        config.LLM_MODEL,
        config.GROQ_API_KEY ?? "",
        config.LLM_TIMEOUT_MS
      );
  }
}
const provider: LLMProvider = createProvider();

export async function generateReply(
  history: LLMMessage[],
  userMessage: string
): Promise<string> {
  const messages = buildMessages(history, userMessage);
  return provider.generateReply(messages);
}