import request from 'superagent'
import { Session } from '../../models/sessions'

const rootUrl = '/api/v1'

export function getAllSessions(): Promise<Session[]> {
  return request.get(rootUrl + '/sessions').then((res) => {
    return res.body.sessions
  })
}
