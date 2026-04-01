const BASE_URL = "https://ipay.ge/opay/api/v1";
const AUTH_URL = "https://ipay.ge/opay/api/v1/oauth2/token";
const TIMEOUT = 15_000;
export class BogClient {
    clientId;
    clientSecret;
    accessToken = null;
    tokenExpiry = 0;
    constructor() {
        this.clientId = process.env.BOG_CLIENT_ID ?? "";
        this.clientSecret = process.env.BOG_CLIENT_SECRET ?? "";
        if (!this.clientId || !this.clientSecret) {
            throw new Error("Environment variables BOG_CLIENT_ID and BOG_CLIENT_SECRET are required. " +
                "Get credentials from Bank of Georgia iPay developer portal.");
        }
    }
    async authenticate() {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);
        try {
            const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
            const response = await fetch(AUTH_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ grant_type: "client_credentials" }),
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`BOG Auth HTTP ${response.status}: ${text}`);
            }
            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
            return this.accessToken;
        }
        catch (error) {
            clearTimeout(timer);
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error("BOG: request timeout (15s). Try again later.");
            }
            throw error;
        }
    }
    async request(method, path, body) {
        const token = await this.authenticate();
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);
        try {
            const response = await fetch(`${BASE_URL}${path}`, {
                method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`BOG HTTP ${response.status}: ${text}`);
            }
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                return response.json();
            }
            return { status: response.status, statusText: response.statusText };
        }
        catch (error) {
            clearTimeout(timer);
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error("BOG: request timeout (15s). Try again later.");
            }
            throw error;
        }
    }
    async get(path) {
        return this.request("GET", path);
    }
    async post(path, body) {
        return this.request("POST", path, body);
    }
}
//# sourceMappingURL=client.js.map