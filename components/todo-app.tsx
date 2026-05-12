'use client'

import { useState } from 'react'

import { Todo } from '@/lib/types'
import { TodoForm } from '@/components/todo-form'
import { TodoList } from '@/components/todo-list'

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  function addTodo(title: string) {
    if (!title.trim()) return

    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), title, done: false },
    ])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  function updateTodo(id: string, title: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-svh gap-8'>
      <h1 className='text-4xl font-bold'>Todo App</h1>
      <div className='w-full max-w-md space-y-8'>
        <TodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  )
}
