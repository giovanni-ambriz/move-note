import { useQuery } from '@tanstack/react-query'
import { Affirmation } from '../../models/affirmation'
import { getAffirmation } from '../apis/affirmation'

export function useAffirmation() {
  return useQuery<Affirmation>({
    queryKey: ['affirmation'],
    queryFn: getAffirmation,
  })
}
