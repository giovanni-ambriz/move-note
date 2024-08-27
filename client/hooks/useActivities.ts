import { useQuery } from '@tanstack/react-query'
import { getAllActivities } from '../apis/activities'
import { Activity } from '../../models/activity'

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: ['activities'],
    queryFn: getAllActivities,
  })
}
