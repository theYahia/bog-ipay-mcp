import { z } from "zod";
import { BogClient } from "../client.js";

const client = new BogClient();

export const refundOrderSchema = z.object({
  order_id: z.string().describe("BOG order ID to refund"),
  amount: z.number().positive().describe("Refund amount"),
});

export async function handleRefundOrder(params: z.infer<typeof refundOrderSchema>): Promise<string> {
  const result = await client.post(`/checkout/refund`, {
    order_id: params.order_id,
    amount: params.amount,
  });
  return JSON.stringify(result, null, 2);
}
