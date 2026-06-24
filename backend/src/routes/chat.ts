import { Router } from "express";
import { chatMessageSchema } from "../schemas/chat";
import { handleMessage } from "../services/chat";
import { ValidationError, NotFoundError } from "../lib/errors";
import { listMessagesByConversation } from "../db/messages";
import { findConversationById } from "../db/conversations";
import { config } from "../config/env";

const router = Router();

router.post("/message", async (req, res) => {
  const parsed = chatMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0].message);
  }

  const { message, sessionId } = parsed.data;
  const result = await handleMessage(message, sessionId);
  res.status(200).json(result);
});

router.get("/:sessionId/messages", async (req, res) => {
  const { sessionId } = req.params;

  const conversation = await findConversationById(sessionId);
  if (!conversation) {
    throw new NotFoundError("Conversation not found.");
  }

  const messages = await listMessagesByConversation(
    sessionId,
    config.LLM_MAX_HISTORY
  );

  res.status(200).json({ sessionId, messages });
});

export default router;
