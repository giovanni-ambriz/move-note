import request from 'superagent'
import { User } from '../../models/users'

const rootUrl = '/api/v1/users'

export async function getAllUsers(): Promise<User[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function getUserById(id: number): Promise<User> {
  const res = await request.get(`${rootUrl}/${id}`)
  return res.body
}
