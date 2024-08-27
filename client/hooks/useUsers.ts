import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../apis/users'
import { User } from '../../models/users'

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })
}
