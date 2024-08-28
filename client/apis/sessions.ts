import request from 'superagent'
import { Session, SessionData } from '../../models/sessions'

const rootUrl = '/api/v1/sessions'

export async function getAllSessions(): Promise<Session[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function getSessionById(id: number): Promise<SessionData> {
  const res = await request.get(`${rootUrl}/${id}`)
  return res.body
}

export async function addNewSession(session: Session) {
  await request.post(rootUrl).send(session)
}

export async function deleteSession(id: number) {
  await request.delete(`${rootUrl}/${id}`)
}

export async function getSessionsByActivity(activity_id: number) {
  const id = activity_id
  const res = await request.get(`${rootUrl}/activity/${id}`)
  return res.body
}

export async function addNote(id: number, notes: string) {
  const res = await request.patch(`${rootUrl}/${id}`).send({ notes })
  return res.body as Session
}
