import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
  app.use(express.json({ limit: '100kb' }))

  // Liveness: the process is up.
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptimeSeconds: Math.round(process.uptime()) })
  })

  // Readiness: the app can serve traffic. A database check is added in the next task.
  app.get('/ready', (req, res) => {
    res.json({ status: 'ready' })
  })

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  // Express identifies error handlers by their four arguments.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(JSON.stringify({ level: 'error', message: err.message }))
    res.status(500).json({ error: 'Internal server error' })
  })

  return app
}