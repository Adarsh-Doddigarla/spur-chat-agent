import { LLMMessage } from "./types";

export const STORE_KNOWLEDGE = `Store information for Northwind Goods:

Shipping:
- Standard shipping takes 5-7 business days.
- 2-day express shipping is available.
- Shipping is free on orders over $50.

Returns:
- Items can be returned within 30 days of purchase.
- Returned items must be unused.
- Refunds are issued within 5-7 days of receiving the return.

Support hours:
- Mon-Fri, 9am-5pm EST.
- Email: support@northwind.example`;

const SYSTEM_PROMPT = `You are the customer support assistant for Northwind Goods, an online store.
Answer customer questions in a friendly, concise way using only the store information provided below.
If a question cannot be answered from this information, politely tell the customer to email support@northwind.example.`;

export function buildMessages(
  history: LLMMessage[],
  userMessage: string
): LLMMessage[] {
  return [
    { role: "system", content: `${SYSTEM_PROMPT}\n\n${STORE_KNOWLEDGE}` },
    ...history,
    { role: "user", content: userMessage },
  ];
}
