'use client'

import type { TodoType } from '@/lib/types'
import { useTodos } from '@/hooks/use-todos'
import { TodoItem } from '@/components/todo-item'

type Props = {
  initialTodos: TodoType[]
}

export function TodoList({ initialTodos }: Props) {
  const { data: todos = [] } = useTodos(initialTodos)

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
