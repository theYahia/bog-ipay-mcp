import { z } from "zod";
export declare const createRecurringSchema: z.ZodObject<{
    amount: z.ZodNumber;
    customer_id: z.ZodString;
    currency: z.ZodDefault<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    customer_id: string;
    description?: string | undefined;
}, {
    amount: number;
    customer_id: string;
    currency?: string | undefined;
    description?: string | undefined;
}>;
export declare function handleCreateRecurring(params: z.infer<typeof createRecurringSchema>): Promise<string>;
export declare const chargeRecurringSchema: z.ZodObject<{
    subscription_id: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    subscription_id: string;
}, {
    amount: number;
    subscription_id: string;
    currency?: string | undefined;
}>;
export declare function handleChargeRecurring(params: z.infer<typeof chargeRecurringSchema>): Promise<string>;
