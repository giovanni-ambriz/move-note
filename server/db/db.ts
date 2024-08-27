import db from './connection.ts'
import { Session } from '../../models/sessions.ts'

export async function getAllSessions(): Promise<Session[]> {
  return db('sessions').select()
}

export async function getSessionById(id: number): Promise<Session> {
  return db('sessions').select().where('id', id).first()
}

export async function addNewSession(session: Session): Promise<Session[]> {
  return db('sessions').insert(session)
}

export async function deleteSession(id: number) {
  return db('sessions').where('id', id).del()
}

export async function getSessionsByActivity(activity_id: number) {
  const sessions = await db('sessions')
    .join('activity', 'sessions.activity_id', 'activity.id')
    .join('users', 'sessions.user_id', 'users.id')
    .select(
      'sessions.id',
      'users.name',
      'activity.name',
      'sessions.date',
      'sessions.time',
      'sessions.duration',
      'sessions.distance',
      'sessions.notes',
    )
    .where({ activity_id })
    .orderBy('activity.name', 'asc')

  return sessions
}

export async function addNote(id: number, notes: string) {
  return db('sessions').where('id', id).update({ notes })
}
