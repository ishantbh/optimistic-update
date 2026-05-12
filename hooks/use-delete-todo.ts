import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TodoType } from '@/lib/types'
import { deleteTodo } from '@/lib/actions'

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      // stop outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // snapshot previous value
      const previousTodos = queryClient.getQueryData<TodoType[]>(['todos'])

      let deleted: { index: number; todo: TodoType } | undefined

      //   deletedTodo = queryClient
      //     .getQueryData<TodoType[]>(['todos'])
      //     ?.find((todo) => todo.id === id)

      //   deletedIndex = queryClient
      //     .getQueryData<TodoType[]>(['todos'])
      //     ?.findIndex((todo) => todo.id === id)

      if (previousTodos) {
        for (const [index, todo] of previousTodos.entries()) {
          if (todo.id === id) {
            deleted = { index, todo }
            break
          }
        }
      }

      // optimistic update
      queryClient.setQueryData<TodoType[]>(['todos'], (old = []) =>
        old.filter((todo) => todo.id !== id),
      )

      // returned context for rollback
      return { deleted }
    },

    onError: (_err, _id, context) => {
      if (!context?.deleted) return

      const { index, todo } = context.deleted

      // rollback
      queryClient.setQueryData<TodoType[]>(['todos'], (old = []) => {
        const newTodos = [...old]
        newTodos.splice(index, 0, todo)
        return newTodos
      })

      alert('Failed to update todo')
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
}
