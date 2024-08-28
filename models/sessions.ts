import { User } from './users'
import { Activity } from './activity'
export interface Session {
  id?: number
  user_id?: number
  date: string
  time: string
  activity_id?: number
  distance: number
  duration: number
  notes: string
}

export interface SessionData extends Session {
  user: User
  activity: Activity
}
