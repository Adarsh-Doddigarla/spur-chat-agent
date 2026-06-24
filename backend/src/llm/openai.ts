import OpenAI from "openai";
import { LLMError } from "../lib/errors";
import { LLMMessage, LLMProvider } from "./types";

export class OpenAIProvider implements LLMProvider {
  private readonly client: OpenAI;

  constructor(
    private readonly model: string,
    apiKey: string,
    private readonly timeoutMs: number
  ) {
    this.client = new OpenAI({ apiKey });
  }

  async generateReply(messages: LLMMessage[]): Promise<string> {
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.timeoutMs);

    try {
      const completion = await this.client.chat.completions.create(
        {
          model: this.model,
          messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        },
        { signal: controller.signal }
      );

      const reply = completion.choices[0]?.message?.content;
      if (!reply) {
        throw new LLMError();
      }
      return reply;
    } catch (error) {
      if (timedOut) {
        throw new LLMError("The assistant is busy. Please try again.");
      }
      if (error instanceof LLMError) {
        throw error;
      }
      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) {
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
