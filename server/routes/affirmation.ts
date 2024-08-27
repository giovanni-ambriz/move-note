// imports go here
import express from 'express'
import request from 'superagent'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request.get('https://www.affirmations.dev/')
    const affirmation = response.body
    res.json(affirmation)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching affirmation' })
  }
})

export default router
