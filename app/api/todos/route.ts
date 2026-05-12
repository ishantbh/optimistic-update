import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'

import { db } from '@/db'
import { todoTable } from '@/db/schema'

export async function GET() {
  const todos = await db.query.todoTable.findMany({
    orderBy: desc(todoTable.createdAt),
  })

  return NextResponse.json(todos)
}
