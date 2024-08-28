import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteSession } from '../apis/sessions'

export function useDeleteSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
