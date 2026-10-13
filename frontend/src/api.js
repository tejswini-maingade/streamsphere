async function request(path, signal) {
  const res = await fetch(path, { signal })
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  return res.json()
}

export function getVideos(params = {}, signal) {
  const qs = new URLSearchParams(params).toString()
  return request(`/api/videos${qs ? `?${qs}` : ''}`, signal)
}

export function getVideo(id, signal) {
  return request(`/api/videos/${encodeURIComponent(id)}`, signal)
}