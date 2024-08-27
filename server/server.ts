import express from 'express'
import * as Path from 'node:path'

import sessionRoutes from './routes/sessions.ts'
import affirmationRoutes from './routes/affirmation.ts'
import usersRoutes from './routes/users.ts'
import activityRoutes from './routes/activities.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/sessions', sessionRoutes)
server.use('/api/v1/affirmations', affirmationRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/activity', activityRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
