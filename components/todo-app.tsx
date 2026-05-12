import { Suspense } from 'react'
import { desc } from 'drizzle-orm'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/app/get-query-client'
import { db } from '@/db'
import { todoTable } from '@/db/schema'
import { TodoForm } from '@/components/todo-form'
import { TodoList } from '@/components/todo-list'
import { TodoItemSkeleton } from '@/components/todo-item-skeleton'

export async function TodoApp() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: () =>
      db.query.todoTable.findMany({
        orderBy: desc(todoTable.createdAt),
      }),
  })

  return (
    <div className='flex flex-col items-center justify-center min-h-svh gap-8'>
      <h1 className='text-4xl font-bold'>Todo App</h1>
      <div className='w-full max-w-md space-y-8'>
        <TodoForm />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<TodoItemSkeleton />}>
            <TodoList />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  )
}
