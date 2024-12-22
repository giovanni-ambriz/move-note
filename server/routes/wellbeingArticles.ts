import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const router = express.Router()

const API_BASE_URL =
  'https://int.api.service.nhs.uk/nhs-website-content/live-well'

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.NHS_API_KEY

    if (!apiKey) {
      throw new Error('NHS_API_KEY is not defined')
    }

    const response = await request.get(`${API_BASE_URL}/`).set('apikey', apiKey)
    res.json(response.body)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
