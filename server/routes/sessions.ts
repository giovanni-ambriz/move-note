import { Router } from 'express'
import { Session } from '../../models/sessions.ts'
// // import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'

import * as db from '../db/db.ts'

const router = Router()

// GET '/api/v1/sessions'

router.get('/', async (req, res) => {
  try {
    const sessions = await db.getAllSessions()
    res.json(sessions)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/sessions/:id'

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const session = await db.getSessionById(id)
    const response = {
      id: session.session_id,
      date: session.date,
      time: session.time,
      distance: session.distance,
      duration: session.duration,
      notes: session.notes,
      activity: {
        name: session.activity_name,
      },
      user: {
        name: session.user_name,
      },
    }
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const session: Session = req.body
    const newSession = await db.addNewSession(session)
    res.status(201).json({ id: newSession[0], ...session })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
// GET '/api/v1/sessions/activity/:id'

router.get('/activity/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const sessions = await db.getSessionsByActivity(id)
    res.json(sessions)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/sessions/:id'

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { notes } = req.body
    const noteAdded = await db.addNote(Number(id), notes)
    res.json(noteAdded)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET '/api/v1/sessions/:id'

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteSession(id)
    res.status(200).json({ message: 'Session deleted sucessfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
//   if (!req.auth?.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { owner, name } = req.body
//     const id = await db.addFruit({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
