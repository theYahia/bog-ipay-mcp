export interface BogOrder {
    id: string;
    status: string;
    amount: number;
    currency: string;
    shopOrderId?: string;
    description?: string;
    redirect_url?: string;
    createdAt?: string;
}
export interface BogRecurring {
    subscriptionId: string;
    status: string;
    amount: number;
    currency: string;
    customerId: string;
}
export interface BogAuthToken {
    access_token: string;
    token_type: string;
    expires_in: number;
}
export interface BogApiResponse {
    id?: string;
    status?: string;
    redirect_url?: string;
    [key: string]: unknown;
}
