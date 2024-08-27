import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()

// GET '/api/v1/users'

router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/users/:id'

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const users = await db.getUserById(id)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
