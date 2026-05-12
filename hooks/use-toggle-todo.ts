import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TodoType } from '@/lib/types'
import { toggleTodo } from '@/lib/actions'

export function useToggleTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleTodo,
    onMutate: async (id) => {
      // stop outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // snapshot previous value
      const previousTodo = queryClient
        .getQueryData<TodoType[]>(['todos'])
        ?.find((todo) => todo.id === id)

      // optimistic update
      queryClient.setQueryData<TodoType[]>(['todos'], (old = []) =>
        old.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo,
        ),
      )

      // returned context for rollback
      return { previousTodo }
    },

    onError: (_err, id, context) => {
      if (!context?.previousTodo) return

      const { previousTodo } = context

      // rollback
      queryClient.setQueryData<TodoType[]>(['todos'], (old = []) =>
        old.map((todo) => (todo.id === id ? previousTodo : todo)),
      )

      alert('Failed to toggle todo')
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
}
