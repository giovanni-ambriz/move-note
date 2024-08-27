import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewSession } from '../apis/sessions.ts'

export function useAddSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addNewSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
