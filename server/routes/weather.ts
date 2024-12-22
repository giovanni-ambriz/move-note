import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const router = express.Router()

const BASE_URL = 'https://api.weatherbit.io/v2.0/current'
const API_KEY = process.env.API_KEY

router.get('/', async (req, res) => {
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ message: 'City parameter required' })
  }

  if (!API_KEY) {
    return res.status(500).json({ message: 'Weather API not configured' })
  }

  try {
    const response = await request.get(BASE_URL).query({ city, key: API_KEY })

    res.json(response.body)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
