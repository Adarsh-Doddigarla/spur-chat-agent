import { prisma } from "./client";
import { Sender } from "@prisma/client";

export async function createMessage(
  conversationId: string,
  sender: Sender,
  text: string
) {
  return prisma.message.create({
    data: { conversationId, sender, text },
  });
}

export async function listMessagesByConversation(
  conversationId: string,
  limit: number
) {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
  return messages;
}