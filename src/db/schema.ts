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
  name: text("name").notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createAt: timestamp("create_at").defaultNow(),
});


export type Users = InferModel<typeof users, "select">;
export type NewUsers = InferModel<typeof users, "insert">;