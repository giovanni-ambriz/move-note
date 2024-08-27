import request from 'superagent'
import { Affirmation } from '../../models/affirmation'

export async function getAffirmation(): Promise<Affirmation> {
  const res = await request.get('/api/v1/affirmations')
  return res.body as Affirmation
}
