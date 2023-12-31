import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
});
client.connect();
export const db = drizzle(client);
