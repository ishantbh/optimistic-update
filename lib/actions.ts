'use server'

import { revalidatePath } from 'next/cache'
import { eq, not } from 'drizzle-orm'

import { db } from '@/db'
import { todoTable } from '@/db/schema'

type ActionResult = { success: true } | { success: false; error: string }

export async function addTodo(title: string): Promise<ActionResult> {
  if (!title.trim()) return { success: false, error: 'Title cannot be empty' }

  try {
    await db.insert(todoTable).values({ title })

    revalidatePath('/')

    return { success: true }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error adding todo',
    }
  }
}

export async function toggleTodo(id: string) {
  await db
    .update(todoTable)
    .set({ done: not(todoTable.done) })
    .where(eq(todoTable.id, id))
}

export async function updateTodo({ id, title }: { id: string; title: string }) {
  if (!title.trim()) throw new Error('Title cannot be empty')

  await db.update(todoTable).set({ title }).where(eq(todoTable.id, id))
}

export async function deleteTodo(id: string) {
  await db.delete(todoTable).where(eq(todoTable.id, id))
}
