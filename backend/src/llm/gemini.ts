import { GoogleGenAI, ApiError } from "@google/genai";
import { LLMError } from "../lib/errors";
import { LLMMessage, LLMProvider } from "./types";

export class GeminiProvider implements LLMProvider {
  private readonly client: GoogleGenAI;

  constructor(
    private readonly model: string,
    apiKey: string,
    private readonly timeoutMs: number
  ) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateReply(messages: LLMMessage[]): Promise<string> {
    const controller = new AbortController();
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.timeoutMs);

    try {
      const systemMessage = messages.find((m) => m.role === "system");
      const chatMessages = messages.filter((m) => m.role !== "system");

      const contents = chatMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await this.client.models.generateContent({
        model: this.model,
        contents,
        config: {
          systemInstruction: systemMessage?.content,
          maxOutputTokens: 400,
          abortSignal: controller.signal,
        },
      });

      const reply = response.text;
      if (!reply) throw new LLMError();
      return reply;
    } catch (error) {
      if (timedOut) {
        throw new LLMError("The assistant is busy. Please try again.");
      }
      if (error instanceof LLMError) throw error;
      console.error("Gemini raw error:", error);
      if (error instanceof ApiError) {
        if (error.status === 400 || error.status === 401 || error.status === 403) {
          throw new LLMError("LLM provider is misconfigured.");
        }
        if (error.status === 429) {
          throw new LLMError("Too many requests. Please try again later.");
        }
      }
      throw new LLMError();
    } finally {
      clearTimeout(timer);
    }
  }
}