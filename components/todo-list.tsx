'use client'

import { startTransition, useOptimistic } from 'react'

import type { TodoType } from '@/lib/types'
import { deleteTodo, toggleTodo, updateTodo } from '@/lib/actions'
import { TodoItem } from '@/components/todo-item'

type OptimisticAction =
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'update'; id: string; title: string }

type Props = {
  todos: TodoType[]
}

export function TodoList({ todos }: Props) {
  const [optimisticTodos, applyOptimistic] = useOptimistic<
    TodoType[],
    OptimisticAction
  >(todos, (state, action) => {
    switch (action.type) {
      case 'toggle':
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        )
      case 'update':
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, title: action.title } : todo,
        )
      case 'delete':
        return state.filter((todo) => todo.id !== action.id)
      default:
        return state
    }
  })

  function handleToggle(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'toggle', id })

      const result = await toggleTodo(id)
      if (!result.success) return alert(result.error)
    })
  }

  function handleUpdate(id: string, title: string) {
    if (!title.trim()) return

    startTransition(async () => {
      applyOptimistic({ type: 'update', id, title })

      const result = await updateTodo(id, title.trim())
      if (!result.success) return alert(result.error)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      applyOptimistic({ type: 'delete', id })

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
