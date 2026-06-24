import { config } from "../config/env";
import { OpenAIProvider } from "./openai";
import { buildMessages } from "./prompt";
import { LLMMessage, LLMProvider } from "./types";

const provider: LLMProvider = new OpenAIProvider(
  config.LLM_MODEL,
  config.OPENAI_API_KEY,
  config.LLM_TIMEOUT_MS
);

export async function generateReply(
  history: LLMMessage[],
  userMessage: string
): Promise<string> {
  const messages = buildMessages(history, userMessage);
  return provider.generateReply(messages);
}
