export type ChatRole = "system" | "user" | "assistant";

export interface LLMMessage {
  role: ChatRole;
  content: string;
}

export interface LLMProvider {
  generateReply(messages: LLMMessage[]): Promise<string>;
}
