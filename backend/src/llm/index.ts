import OpenAI from "openai";
import { buildMessages } from "./prompt";
import { LLMMessage, LLMProvider } from "./types";
import { LLMError } from "../lib/errors";
import { config } from "../config/env";

class GroqProvider implements LLMProvider {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.GROQ_API_KEY ?? "",
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  async generateReply(messages: LLMMessage[]): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        max_tokens: config.LLM_MAX_OUTPUT_TOKENS,
      });
      const reply = completion.choices[0]?.message?.content;
      if (!reply) throw new LLMError();
      return reply;
    } catch (error) {
      if (error instanceof LLMError) throw error;
      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) throw new LLMError("LLM provider is misconfigured.");
        if (error.status === 429) throw new LLMError("Too many requests. Please try again later.");
      }
      console.error("Groq error:", error);
      throw new LLMError();
    }
  }
}

const provider: LLMProvider = new GroqProvider();

export async function generateReply(
  history: LLMMessage[],
  userMessage: string
): Promise<string> {
  const messages = buildMessages(history, userMessage);
  return provider.generateReply(messages);
}