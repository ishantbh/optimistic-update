import { desc } from 'drizzle-orm'

import { db } from '@/db'
import { todoTable } from '@/db/schema'
import { TodoForm } from '@/components/todo-form'
import { TodoList } from '@/components/todo-list'

export async function TodoApp() {
  const todos = await db.query.todoTable.findMany({
    orderBy: desc(todoTable.createdAt),
  })

  return (
    <div className='flex flex-col items-center justify-center min-h-svh gap-8'>
      <h1 className='text-4xl font-bold'>Todo App</h1>
      <div className='w-full max-w-md space-y-8'>
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </div>
  )
}
