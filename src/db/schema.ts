import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";

// users,products,orders,cart,reviews
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: varchar("password", { length: 100 }).notNull(),
});


export type Users = InferModel<typeof users, "select">;
export type NewUsers = InferModel<typeof users, "insert">;