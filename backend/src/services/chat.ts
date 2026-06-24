import { createConversation, findConversationById } from "../db/conversations";
import { createMessage, listMessagesByConversation } from "../db/messages";
import { generateReply } from "../llm/index";
import { NotFoundError } from "../lib/errors";
import { config } from "../config/env";
import { Sender } from "@prisma/client";
import { LLMMessage } from "../llm/types";

export async function handleMessage(text: string, sessionId?: string) {
  const conversation = sessionId
    ? await findConversationById(sessionId)
    : await createConversation();

  if (!conversation) {
    throw new NotFoundError("Conversation not found.");
  }

  // Load history BEFORE persisting the new user message
  // so the current message isn't sent to the LLM twice
  const dbMessages = await listMessagesByConversation(
    conversation.id,
    config.LLM_MAX_HISTORY
  );

  const history: LLMMessage[] = dbMessages.map((message) => ({
    role: message.sender === Sender.user ? "user" : "assistant",
    content: message.text,
  }));

  await createMessage(conversation.id, Sender.user, text);

  const reply = await generateReply(history, text);

  await createMessage(conversation.id, Sender.ai, reply);

  return { reply, sessionId: conversation.id };
}