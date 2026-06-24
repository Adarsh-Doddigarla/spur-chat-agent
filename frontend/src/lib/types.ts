export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  createdAt: string;
}

export interface ChatState {
  messages: Message[];
  sessionId: string | null;
  status: "idle" | "sending" | "error";
}
