# bog-ipay-mcp

MCP server for Bank of Georgia iPay payment gateway. Supports orders, refunds, recurring payments, and pre-authorization via OAuth 2.0 + JWT.

## Tools (8)

| Tool | Description |
|---|---|
| `get_auth_token` | Get OAuth 2.0 access token |
| `create_order` | Create a new payment order |
| `get_order_status` | Get order status by ID |
| `refund_order` | Refund an order |
| `create_recurring` | Set up recurring payment |
| `charge_recurring` | Charge a recurring subscription |
| `preauth_order` | Pre-authorize an amount |
| `complete_preauth` | Capture a pre-authorized order |

## Quick Start

```json
{
  "mcpServers": {
    "bog-ipay": {
      "command": "npx",
      "args": ["-y", "@theyahia/bog-ipay-mcp"],
      "env": {
        "BOG_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "BOG_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BOG_CLIENT_ID` | Yes | OAuth client ID from BOG iPay |
| `BOG_CLIENT_SECRET` | Yes | OAuth client secret from BOG iPay |

## Demo Prompts

- "Create an order for 100 GEL for my online store"
- "Check the status of order ord-12345"
- "Refund 50 GEL from order ord-67890"
- "Pre-authorize 200 GEL for a hotel reservation"
- "Set up a recurring payment of 30 GEL for customer cust-001"

## License

MIT
