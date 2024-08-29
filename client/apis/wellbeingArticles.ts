import request from 'superagent'

const API_BASE_URL = 'https://api.nhs.uk/live-well'
const API_VERSION = '1.0'

export async function fetchWellbeingArticles(): Promise<any> {
  const res = await request
    .get(`${API_BASE_URL}/`)
    .query({ 'api-version': API_VERSION })
    .set('subscription-key', 'b1541916e2324b8caf77e05d3ef6ced7')

  return res.body
}
