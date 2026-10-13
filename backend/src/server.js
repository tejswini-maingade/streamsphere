import { createApp } from './app.js'

const port = Number(process.env.PORT) || 4000
const server = createApp().listen(port, () => {
  console.log(JSON.stringify({ level: 'info', message: `API listening on port ${port}` }))
})

// Kubernetes sends SIGTERM before replacing a pod: stop accepting
// new connections, let in-flight requests finish, then exit.
function shutdown(signal) {
  console.log(JSON.stringify({ level: 'info', message: `${signal} received, shutting down` }))
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 10_000).unref()
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))