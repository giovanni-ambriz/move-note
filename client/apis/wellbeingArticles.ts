import request from 'superagent'

const API_BASE_URL =
  'https://int.api.service.nhs.uk/nhs-website-content/live-well'

export async function fetchWellbeingArticles(): Promise<any> {
  const res = await request
    .get(`${API_BASE_URL}/`)
    .set('apikey', 'MkM6TY341thYlwlTbFGRparA6FrldrK4')

  return res.body
}
