import { BogClient } from "../client.js";

const client = new BogClient();

export async function handleGetAuthToken(): Promise<string> {
  const token = await client.authenticate();
  return JSON.stringify({ access_token: token, message: "Token obtained successfully" }, null, 2);
}
