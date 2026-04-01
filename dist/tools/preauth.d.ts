import { z } from "zod";
export declare const preauthOrderSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    redirect_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    description: string;
    redirect_url?: string | undefined;
}, {
    amount: number;
    description: string;
    currency?: string | undefined;
    redirect_url?: string | undefined;
}>;
export declare function handlePreauthOrder(params: z.infer<typeof preauthOrderSchema>): Promise<string>;
export declare const completePreauthSchema: z.ZodObject<{
    order_id: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    order_id: string;
}, {
    amount: number;
    order_id: string;
}>;
export declare function handleCompletePreauth(params: z.infer<typeof completePreauthSchema>): Promise<string>;
