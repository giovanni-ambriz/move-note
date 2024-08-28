import db from './connection.ts'
import { Session, SessionData } from '../../models/sessions.ts'
import { User } from '../../models/users.ts'
import { Activity } from '../../models/activity.ts'

export async function getAllSessions(): Promise<Session[]> {
  return db('sessions').select()
}

export async function getSessionById(id: number): Promise<SessionData> {
  const session = await db('sessions')
    .join('activity', 'sessions.activity_id', 'activity.id')
    .join('users', 'sessions.user_id', 'users.id')
    .where('sessions.id', id)
    .select(
      'sessions.id as session_id',
      'sessions.date',
      'sessions.time',
      'sessions.distance',
      'sessions.duration',
      'sessions.notes',
      'activity.id as activity_id',
      'activity.name as activity_name',
      'users.id as user_id',
      'users.name as user_name',
      'users.email as user_email',
    )
    .first()

  if (!session) {
    throw new Error('Session not found')
  }

  return {
    id: session.session_id,
    date: session.date,
    time: session.time,
    distance: session.distance,
    duration: session.duration,
    notes: session.notes,
    activity: {
      id: session.activity_id,
      name: session.activity_name,
    },
    user: {
      id: session.user_id,
      name: session.user_name,
      email: session.user_email,
    },
  }
}

export async function addNewSession(session: Session): Promise<number[]> {
  return db('sessions').insert(session)
}

export async function deleteSession(id: number) {
  return db('sessions').where('sessions.id', id).del()
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

export async function getAllUsers(): Promise<User[]> {
  return db('users').select()
}

export async function getUserById(id: number) {
  return db('users').where({ id }).first()
}

export async function getAllActivities(): Promise<Activity[]> {
  return db('activity').select()
}

export async function getActivityById(id: number) {
  return db('activity').where({ id }).first()
}
