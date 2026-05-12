import { desc } from 'drizzle-orm'

import { db } from '@/db'
import { TodoItem } from '@/components/todo-item'
import { todoTable } from '@/db/schema'

export async function TodoList() {
  const todos = await db.query.todoTable.findMany({
    orderBy: desc(todoTable.createdAt),
  })

  return (
    <>
      {todos.length === 0 && (
        <p className='text-center text-xl text-gray-400'>No todos yet</p>
      )}

      <ul className='flex flex-col'>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  )
}
