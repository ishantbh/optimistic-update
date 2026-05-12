import { text, boolean, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core'

export const todoTable = pgTable('todos', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  done: boolean().default(false).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})

export type Todo = typeof todoTable.$inferSelect
export type NewTodo = typeof todoTable.$inferInsert
