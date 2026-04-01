import { describe, it, expect, vi, beforeEach } from "vitest";
const mockFetch = vi.fn();
global.fetch = mockFetch;
process.env.BOG_CLIENT_ID = "test-client-id";
process.env.BOG_CLIENT_SECRET = "test-client-secret";
function mockAuthAndResponse(responseData) {
    mockFetch
        .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "test-token", expires_in: 3600 }),
        headers: new Headers({ "content-type": "application/json" }),
    })
        .mockResolvedValueOnce({
        ok: true,
        json: async () => responseData,
        headers: new Headers({ "content-type": "application/json" }),
    });
}
describe("bog-ipay-mcp tools", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
    });
    it("get_auth_token returns token", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "test-token", expires_in: 3600 }),
            headers: new Headers({ "content-type": "application/json" }),
        });
        const { handleGetAuthToken } = await import("../auth-token.js");
        const result = await handleGetAuthToken();
        const parsed = JSON.parse(result);
        expect(parsed.access_token).toBe("test-token");
    });
    it("create_order sends correct order payload", async () => {
        mockAuthAndResponse({ id: "order-123", redirect_url: "https://ipay.ge/pay/order-123" });
        const { handleCreateOrder } = await import("../create-order.js");
        const result = await handleCreateOrder({
            amount: 1500,
            currency: "GEL",
            description: "Test order",
            redirect_url: "https://example.com/callback",
            shop_order_id: "shop-001",
        });
        const parsed = JSON.parse(result);
        expect(parsed.id).toBe("order-123");
        expect(parsed.redirect_url).toContain("ipay.ge");
    });
    it("get_order_status retrieves status", async () => {
        mockAuthAndResponse({ id: "order-456", status: "COMPLETED" });
        const { handleGetOrderStatus } = await import("../get-order-status.js");
        const result = await handleGetOrderStatus({ order_id: "order-456" });
        const parsed = JSON.parse(result);
        expect(parsed.status).toBe("COMPLETED");
    });
    it("refund_order sends refund request", async () => {
        mockAuthAndResponse({ status: "REFUNDED", amount: 500 });
        const { handleRefundOrder } = await import("../refund-order.js");
        const result = await handleRefundOrder({ order_id: "order-789", amount: 500 });
        const parsed = JSON.parse(result);
        expect(parsed.status).toBe("REFUNDED");
    });
    it("preauth_order creates pre-authorization", async () => {
        mockAuthAndResponse({ id: "preauth-001", status: "AUTHORIZED" });
        const { handlePreauthOrder } = await import("../preauth.js");
        const result = await handlePreauthOrder({
            amount: 3000,
            currency: "GEL",
            description: "Pre-auth test",
        });
        const parsed = JSON.parse(result);
        expect(parsed.status).toBe("AUTHORIZED");
    });
    it("handles HTTP errors gracefully", async () => {
        mockFetch
            .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "test-token", expires_in: 3600 }),
            headers: new Headers({ "content-type": "application/json" }),
        })
            .mockResolvedValueOnce({
            ok: false,
            status: 403,
            text: async () => "Forbidden",
            headers: new Headers(),
        });
        const { handleGetOrderStatus } = await import("../get-order-status.js");
        await expect(handleGetOrderStatus({ order_id: "bad-id" })).rejects.toThrow("BOG HTTP 403");
    });
});
//# sourceMappingURL=tools.test.js.map