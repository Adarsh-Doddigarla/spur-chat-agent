import { prisma } from "./client";

export async function createConversation(channel = "web") {
  return prisma.conversation.create({
    data: { channel },
  });
}

export async function findConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
  });
}