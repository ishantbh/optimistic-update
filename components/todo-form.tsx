'use client'

import { useState } from 'react'

type Props = {
  onSubmit: (text: string) => void
}

export function TodoForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('')

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim()) return

    onSubmit(title.trim())
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-4'>
      <input
        type='text'
        id='title'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Add a todo'
        className='w-full rounded-md border-2 border-gray-300 p-2'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Add
      </button>
    </form>
  )
}
