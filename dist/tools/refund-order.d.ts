import { z } from "zod";
export declare const refundOrderSchema: z.ZodObject<{
    order_id: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    order_id: string;
}, {
    amount: number;
    order_id: string;
}>;
export declare function handleRefundOrder(params: z.infer<typeof refundOrderSchema>): Promise<string>;
