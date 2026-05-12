'use client'

import { useState } from 'react'

import type { Todo } from '@/lib/types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

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
            onChange={() => onToggle(todo.id)}
            className='size-4'
          />
          <span className='text-lg'>{todo.title}</span>
        </label>
      )}
      <button
        onClick={() => {
          if (isEditing) onUpdate(todo.id, title)
          setIsEditing(!isEditing)
        }}
        className='bg-blue-500 text-white px-2 py-1 rounded-md text-sm'
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className='bg-red-500 text-white px-2 py-1 rounded-md text-sm'
      >
        Delete
      </button>
    </li>
  )
}
