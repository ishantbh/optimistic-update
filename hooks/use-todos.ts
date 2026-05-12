import { useQuery } from '@tanstack/react-query'

import { TodoType } from '@/lib/types'

async function getTodos() {
  const res = await fetch('/api/todos')

  if (!res.ok) throw new Error('Failed to fetch todos')

  return res.json()
}

export function useTodos(initialTodos: TodoType[]) {
  return useQuery<TodoType[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
    initialData: initialTodos,
  })
}
