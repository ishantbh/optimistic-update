'use client'

import { startTransition, useOptimistic } from 'react'

import type { TodoType } from '@/lib/types'
import { deleteTodo, toggleTodo, updateTodo } from '@/lib/actions'
import { TodoItem } from '@/components/todo-item'

type Props = {
  todos: TodoType[]
}

export function TodoList({ todos }: Props) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<TodoType[]>(todos)

  function handleToggle(id: string) {
    const updatedTodos = optimisticTodos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    )

    startTransition(async () => {
      setOptimisticTodos(updatedTodos)

      const result = await toggleTodo(id)
      if (!result.success) return alert(result.error)
    })
  }

  function handleUpdate(id: string, title: string) {
    if (!title.trim()) return

    const updatedTodos = optimisticTodos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo,
    )

    startTransition(async () => {
      setOptimisticTodos(updatedTodos)

      const result = await updateTodo(id, title.trim())
      if (!result.success) return alert(result.error)
    })
  }

  function handleDelete(id: string) {
    const updatedTodos = optimisticTodos.filter((todo) => todo.id !== id)

    startTransition(async () => {
      setOptimisticTodos(updatedTodos)

      const result = await deleteTodo(id)
      if (!result.success) return alert(result.error)
    })
  }

  return (
    <>
      {optimisticTodos.length === 0 && (
        <p className='text-center text-xl text-gray-400'>No todos yet</p>
      )}

      <ul className='flex flex-col'>
        {optimisticTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  )
}
