import { z } from "zod";
export declare const createOrderSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    redirect_url: z.ZodString;
    shop_order_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    description: string;
    redirect_url: string;
    shop_order_id: string;
}, {
    amount: number;
    description: string;
    redirect_url: string;
    shop_order_id: string;
    currency?: string | undefined;
}>;
export declare function handleCreateOrder(params: z.infer<typeof createOrderSchema>): Promise<string>;
