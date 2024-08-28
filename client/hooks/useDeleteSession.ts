import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteSession } from '../apis/sessions'
import { useNavigate } from 'react-router-dom'

export function useDeleteSession() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: number) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      navigate(-1)
    },
  })
}
