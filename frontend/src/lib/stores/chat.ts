import { writable } from "svelte/store";
import type { Message, ChatState } from "../types";
import { postMessage, getHistory, ApiError } from "../api";

const SESSION_KEY = "sessionId";

const initialState: ChatState = {
  messages: [],
  sessionId: null,
  status: "idle",
};

export const chatStore = writable<ChatState>(initialState);

export async function sendMessage(text: string): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;

  const userMessage: Message = {
    id: crypto.randomUUID(),
    sender: "user",
    text: trimmed,
    createdAt: new Date().toISOString(),
  };

  let currentSessionId: string | null = null;
  chatStore.update((s) => {
    currentSessionId = s.sessionId;
    return {
      ...s,
      status: "sending",
      messages: [...s.messages, userMessage],
    };
  });

  try {
    const { reply, sessionId } = await postMessage({
      message: trimmed,
      sessionId: currentSessionId,
    });

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      sender: "ai",
      text: reply,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_KEY, sessionId);

    chatStore.update((s) => ({
      ...s,
      sessionId,
      messages: [...s.messages, aiMessage],
    }));
  } catch {
    const errorMessage: Message = {
      id: crypto.randomUUID(),
      sender: "ai",
      text: "Sorry, something went wrong. Please try again.",
      createdAt: new Date().toISOString(),
    };

    chatStore.update((s) => ({
      ...s,
      messages: [...s.messages, errorMessage],
    }));
  } finally {
    chatStore.update((s) => ({ ...s, status: "idle" }));
  }
}

export async function loadHistory(): Promise<void> {
  const sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) return;

  try {
    const { messages } = await getHistory(sessionId);
    chatStore.update((s) => ({ ...s, messages, sessionId }));
  } catch (err) {
    // A 404 means the stored session no longer exists on the server, so
    // drop it and start fresh. Other (transient) errors leave the session
    // intact so a later retry can still recover the history.
    if (err instanceof ApiError && err.status === 404) {
      localStorage.removeItem(SESSION_KEY);
      chatStore.update((s) => ({ ...s, sessionId: null }));
    }
  }
}
