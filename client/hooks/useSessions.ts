import { useQuery } from '@tanstack/react-query'
import { getAllSessions } from '../apis/sessions.ts'

export function useSessions() {
  const query = useQuery({
    queryKey: ['sessions'],
    queryFn: getAllSessions,
  })
  return {
    ...query,
  }
}
