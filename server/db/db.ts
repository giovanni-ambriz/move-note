import db from './connection.ts'
import { Session } from '../../models/sessions.ts'

export async function getAllSessions(): Promise<Session[]> {
  return db('sessions').select()
}

export async function getSessionById(id: number): Promise<Session> {
  return db('sessions').select().first().where('id', id)
}

export async function addNewSession(session: Session): Promise<Session[]> {
  return db('sessions').insert(session)
}

export async function deleteSession(id: number) {
  return db('sessions').where('id', id).del
}

export async function getSessionsByActivity() {
  const sessions = await db('sessions')
    .join('activity', 'sessions.activity_id', 'activity.id')
    .join('users', 'sessions.user_id', 'users.id')
    .select(
      'sessions.id as session_id',
      'users.name as user_name',
      'users.email as user_email',
      'activity.name as activity_name',
      'sessions.date',
      'sessions.time',
      'sessions.notes',
    )
    .orderBy('activity.name', 'asc')

  return sessions
}
