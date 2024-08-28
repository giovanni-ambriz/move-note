import { useQuery } from '@tanstack/react-query'
import { getSessionById } from '../apis/sessions.ts'

export function useSessionDetails(id: number) {
  return useQuery({
    queryKey: ['sessions', id],
    queryFn: () => getSessionById(id),
  })
}
