import type { Message } from "./types";

const API_URL: string = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface PostMessageResponse {
  reply: string;
  sessionId: string;
}

export interface GetHistoryResponse {
  sessionId: string;
  messages: Message[];
}

async function extractError(res: Response): Promise<string> {
  try {
    const data: unknown = await res.json();
    if (
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
    ) {
      return (data as { error: string }).error;
    }
  } catch {
    // Body was empty or not JSON; fall through to a generic message.
  }
  return `Request failed with status ${res.status}`;
}

export async function postMessage({
  message,
  sessionId,
}: {
  message: string;
  sessionId: string | null;
}): Promise<PostMessageResponse> {
  const res = await fetch(`${API_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, ...(sessionId ? { sessionId } : {}) }),
  });

  if (!res.ok) {
    throw new ApiError(await extractError(res), res.status);
  }

  return res.json() as Promise<PostMessageResponse>;
}

export async function getHistory(sessionId: string): Promise<GetHistoryResponse> {
  const res = await fetch(`${API_URL}/chat/${sessionId}/messages`);

  if (!res.ok) {
    throw new ApiError(await extractError(res), res.status);
  }

  return res.json() as Promise<GetHistoryResponse>;
}
