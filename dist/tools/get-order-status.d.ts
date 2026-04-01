import { z } from "zod";
export declare const getOrderStatusSchema: z.ZodObject<{
    order_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    order_id: string;
}, {
    order_id: string;
}>;
export declare function handleGetOrderStatus(params: z.infer<typeof getOrderStatusSchema>): Promise<string>;
