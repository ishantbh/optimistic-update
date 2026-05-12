'use client'

import { startTransition, useOptimistic, useState } from 'react'

import type { Todo } from '@/db/schema'
import { deleteTodo, toggleTodo, updateTodo } from '@/lib/actions'

type Props = {
  todo: Todo
}

export function TodoItem({ todo }: Props) {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(todo)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(optimisticTodo.title)

  function handleToggle() {
    const updatedTodo: Todo = { ...optimisticTodo, done: !optimisticTodo.done }

    startTransition(async () => {
      setOptimisticTodo(updatedTodo)

      const result = await toggleTodo(todo.id)
      if (!result.success) return alert(result.error)
    })
  }

  function handleUpdate() {
    if (!title.trim()) return

    const updatedTodo: Todo = { ...optimisticTodo, title: title.trim() }

    startTransition(async () => {
      setOptimisticTodo(updatedTodo)

      const result = await updateTodo(todo.id, title.trim())
      if (!result.success) return alert(result.error)
    })
  }

  async function handleDelete() {
    const result = await deleteTodo(todo.id)

    if (!result.success) return alert(result.error)
  }

  return (
    <li className='flex items-center gap-4 px-4 rounded-md hover:bg-gray-700 even:bg-gray-800'>
      {isEditing ? (
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full rounded-md border-2 border-gray-300 p-2'
        />
      ) : (
        <label className='flex-1 flex items-center py-4 gap-4'>
          <input
            type='checkbox'
            checked={optimisticTodo.done}
            onChange={handleToggle}
            className='size-4'
          />
          <span
            className={`text-lg ${optimisticTodo.done ? 'line-through text-gray-400' : ''}`}
          >
            {optimisticTodo.title}
          </span>
        </label>
      )}
      <button
        onClick={() => {
          if (isEditing) handleUpdate()
          setIsEditing(!isEditing)
        }}
        className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        onClick={handleDelete}
        className='bg-red-500 text-white px-2 py-1 rounded-md text-sm'
      >
        Delete
      </button>
    </li>
  )
}
