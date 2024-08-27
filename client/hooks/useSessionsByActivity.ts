import { useQuery } from '@tanstack/react-query'
import { getSessionsByActivity } from '../apis/sessions'

export function useSessionsByActivity(activity_id: number) {
  return useQuery({
    queryKey: ['sessions', 'activity', activity_id],
    queryFn: () => getSessionsByActivity(activity_id),
  })
}
