import { writable } from "svelte/store";
import type { Message, ChatState } from "../types";

const initialState: ChatState = {
  messages: [],
  sessionId: null,
  status: "idle",
};

export const chatStore = writable<ChatState>(initialState);

export async function sendMessage(text: string): Promise<void> {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    sender: "user",
    text,
    createdAt: new Date().toISOString(),
  };

  chatStore.update((s) => ({
    ...s,
    status: "sending",
    messages: [...s.messages, userMessage],
  }));

  await new Promise((resolve) => setTimeout(resolve, 500));

  const aiMessage: Message = {
    id: crypto.randomUUID(),
    sender: "ai",
    text: "This is a mock reply.",
    createdAt: new Date().toISOString(),
  };

  chatStore.update((s) => ({
    ...s,
    status: "idle",
    messages: [...s.messages, aiMessage],
  }));
}

export async function loadHistory(): Promise<void> {}
