import { z } from "zod";
import { BogClient } from "../client.js";

const client = new BogClient();

export const preauthOrderSchema = z.object({
  amount: z.number().positive().describe("Pre-authorization amount"),
  currency: z.string().default("GEL").describe("Currency code"),
  description: z.string().describe("Order description"),
  redirect_url: z.string().url().optional().describe("Redirect URL after auth"),
});

export async function handlePreauthOrder(params: z.infer<typeof preauthOrderSchema>): Promise<string> {
  const result = await client.post("/checkout/orders", {
    intent: "AUTHORIZE",
    items: [{
      amount: params.amount,
      description: params.description,
      quantity: 1,
    }],
    capture_method: "MANUAL",
    redirect_url: params.redirect_url,
    purchase_units: [{
      amount: { currency_code: params.currency, value: params.amount },
    }],
  });
  return JSON.stringify(result, null, 2);
}

export const completePreauthSchema = z.object({
  order_id: z.string().describe("Pre-authorized order ID"),
  amount: z.number().positive().describe("Capture amount"),
});

export async function handleCompletePreauth(params: z.infer<typeof completePreauthSchema>): Promise<string> {
  const result = await client.post(`/checkout/orders/${params.order_id}/capture`, {
    amount: params.amount,
  });
  return JSON.stringify(result, null, 2);
}
