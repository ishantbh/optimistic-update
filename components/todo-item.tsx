'use client'

import { useEffect, useState } from 'react'

import type { TodoType } from '@/lib/types'
import { useToggleTodo } from '@/hooks/use-toggle-todo'
import { useUpdateTodo } from '@/hooks/use-update-todo'
import { useDeleteTodo } from '@/hooks/use-delete-todo'

type Props = {
  todo: TodoType
}

export function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const { mutate: toggleTodo, error: toggleError } = useToggleTodo()
  const { mutate: updateTodo, error: updateError } = useUpdateTodo()
  const { mutate: deleteTodo, error: deleteError } = useDeleteTodo()

  useEffect(() => {
    if (toggleError) alert(toggleError)
  }, [toggleError])

  useEffect(() => {
    if (updateError) alert(updateError)
  }, [updateError])

  useEffect(() => {
    if (deleteError) alert(deleteError)
  }, [deleteError])

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
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
            className='size-4'
          />
          <span
            className={`text-lg ${todo.done ? 'line-through text-gray-400' : ''}`}
          >
            {todo.title}
          </span>
        </label>
      )}
      <button
        onClick={() => {
          if (isEditing) updateTodo({ id: todo.id, title })
          setIsEditing(!isEditing)
        }}
        className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className='bg-red-500 text-white px-2 py-1 rounded-md text-sm'
      >
        Delete
      </button>
    </li>
  )
}
