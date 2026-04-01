import { z } from "zod";
import { BogClient } from "../client.js";
const client = new BogClient();
export const createRecurringSchema = z.object({
    amount: z.number().positive().describe("Recurring payment amount"),
    customer_id: z.string().describe("Customer ID for recurring billing"),
    currency: z.string().default("GEL").describe("Currency code"),
    description: z.string().optional().describe("Subscription description"),
});
export async function handleCreateRecurring(params) {
    const result = await client.post("/checkout/orders/recurring", {
        intent: "AUTHORIZE",
        customer_id: params.customer_id,
        amount: params.amount,
        currency: params.currency,
        description: params.description ?? "Recurring payment",
    });
    return JSON.stringify(result, null, 2);
}
export const chargeRecurringSchema = z.object({
    subscription_id: z.string().describe("Recurring subscription ID"),
    amount: z.number().positive().describe("Amount to charge"),
    currency: z.string().default("GEL").describe("Currency code"),
});
export async function handleChargeRecurring(params) {
    const result = await client.post(`/checkout/orders/recurring/${params.subscription_id}/charge`, {
        amount: params.amount,
        currency: params.currency,
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=recurring.js.map