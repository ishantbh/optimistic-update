import type { Todo } from '@/lib/types'
import { TodoItem } from '@/components/todo-item'

type Props = {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: Props) {
  return (
    <ul className='flex flex-col'>
      {todos.length === 0 && (
        <li className='text-center text-xl'>
          <span className='text-gray-400'>No todos yet</span>
        </li>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
