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

export async function toggleTodo(id: string): Promise<ActionResult> {
  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 3000))

  try {
    await db
      .update(todoTable)
      .set({ done: not(todoTable.done) })
      .where(eq(todoTable.id, id))

    return { success: true }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error toggling todo',
    }
  }
}

export async function updateTodo(
  id: string,
  title: string,
): Promise<ActionResult> {
  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (!title.trim()) return { success: false, error: 'Title cannot be empty' }

  try {
    await db.update(todoTable).set({ title }).where(eq(todoTable.id, id))

    return { success: true }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error updating todo',
    }
  }
}

export async function deleteTodo(id: string): Promise<ActionResult> {
  try {
    await db.delete(todoTable).where(eq(todoTable.id, id))

    revalidatePath('/')

    return { success: true }
  } catch (err) {
    console.log(err)

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error deleting todo',
    }
  }
}
