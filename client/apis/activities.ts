import request from 'superagent'
import { Activity } from '../../models/activity'

const rootUrl = '/api/v1/activity'

export async function getAllActivities(): Promise<Activity[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function getActivityById(id: number): Promise<Activity> {
  const res = await request.get(`${rootUrl}/${id}`)
  return res.body
}
