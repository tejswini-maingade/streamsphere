import test from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../src/app.js'

async function withServer(fn) {
  const server = createApp().listen(0)
  try {
    const { port } = server.address()
    await fn(`http://127.0.0.1:${port}`)
  } finally {
    server.closeAllConnections()
    server.close()
  }
}

test('GET /health returns ok', async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/health`)
    assert.equal(res.status, 200)
    assert.equal((await res.json()).status, 'ok')
  })
})

test('unknown route returns 404 JSON', async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/nope`)
    assert.equal(res.status, 404)
    assert.equal((await res.json()).error, 'Not found')
  })
})