export declare class BogClient {
    private clientId;
    private clientSecret;
    private accessToken;
    private tokenExpiry;
    constructor();
    authenticate(): Promise<string>;
    request(method: string, path: string, body?: unknown): Promise<unknown>;
    get(path: string): Promise<unknown>;
    post(path: string, body: unknown): Promise<unknown>;
}
