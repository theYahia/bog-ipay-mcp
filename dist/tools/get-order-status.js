import { z } from "zod";
import { BogClient } from "../client.js";
const client = new BogClient();
export const getOrderStatusSchema = z.object({
    order_id: z.string().describe("BOG order ID"),
});
export async function handleGetOrderStatus(params) {
    const result = await client.get(`/checkout/orders/${params.order_id}`);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=get-order-status.js.map