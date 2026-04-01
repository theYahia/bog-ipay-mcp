import { z } from "zod";
import { BogClient } from "../client.js";
const client = new BogClient();
export const createOrderSchema = z.object({
    amount: z.number().positive().describe("Order amount"),
    currency: z.string().default("GEL").describe("Currency code (GEL, USD, EUR)"),
    description: z.string().describe("Order description"),
    redirect_url: z.string().url().describe("Redirect URL after payment"),
    shop_order_id: z.string().describe("Your unique order ID"),
});
export async function handleCreateOrder(params) {
    const result = await client.post("/checkout/orders", {
        intent: "CAPTURE",
        items: [{
                amount: params.amount,
                description: params.description,
                quantity: 1,
                product_id: params.shop_order_id,
            }],
        locale: "ka",
        shop_order_id: params.shop_order_id,
        redirect_url: params.redirect_url,
        show_shop_order_id_on_extract: true,
        capture_method: "AUTOMATIC",
        purchase_units: [{
                amount: { currency_code: params.currency, value: params.amount },
            }],
    });
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-order.js.map