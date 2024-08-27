import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addNote } from '../apis/sessions'

export function useAddNote(id: number, notes: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => addNote(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
