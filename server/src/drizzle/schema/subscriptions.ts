import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})