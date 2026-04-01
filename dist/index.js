#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleGetAuthToken } from "./tools/auth-token.js";
import { createOrderSchema, handleCreateOrder } from "./tools/create-order.js";
import { getOrderStatusSchema, handleGetOrderStatus } from "./tools/get-order-status.js";
import { refundOrderSchema, handleRefundOrder } from "./tools/refund-order.js";
import { createRecurringSchema, handleCreateRecurring, chargeRecurringSchema, handleChargeRecurring } from "./tools/recurring.js";
import { preauthOrderSchema, handlePreauthOrder, completePreauthSchema, handleCompletePreauth } from "./tools/preauth.js";
const server = new McpServer({ name: "bog-ipay-mcp", version: "1.0.0" });
server.tool("get_auth_token", "Get OAuth 2.0 access token from BOG iPay.", {}, async () => ({ content: [{ type: "text", text: await handleGetAuthToken() }] }));
server.tool("create_order", "Create a new payment order.", createOrderSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleCreateOrder(params) }] }));
server.tool("get_order_status", "Get order status by ID.", getOrderStatusSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleGetOrderStatus(params) }] }));
server.tool("refund_order", "Refund an order (full or partial).", refundOrderSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleRefundOrder(params) }] }));
server.tool("create_recurring", "Set up a recurring payment.", createRecurringSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleCreateRecurring(params) }] }));
server.tool("charge_recurring", "Charge a recurring subscription.", chargeRecurringSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleChargeRecurring(params) }] }));
server.tool("preauth_order", "Pre-authorize (hold) an amount on a card.", preauthOrderSchema.shape, async (params) => ({ content: [{ type: "text", text: await handlePreauthOrder(params) }] }));
server.tool("complete_preauth", "Complete/capture a pre-authorized order.", completePreauthSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleCompletePreauth(params) }] }));
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[bog-ipay-mcp] Server started. 8 tools available.");
}
main().catch((error) => { console.error("[bog-ipay-mcp] Error:", error); process.exit(1); });
//# sourceMappingURL=index.js.map