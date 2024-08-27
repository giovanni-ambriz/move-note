import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteSession } from '../apis/sessions'

export function useDeleteSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
