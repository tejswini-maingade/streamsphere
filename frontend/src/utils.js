// Placeholder thumbnail colours until real thumbnails exist (Phase 4).
const palette = [
  ['#1e3a8a', '#06b6d4'], ['#4c1d95', '#ec4899'], ['#0f766e', '#84cc16'],
  ['#14532d', '#22c55e'], ['#0c4a6e', '#38bdf8'], ['#7c2d12', '#f59e0b'],
  ['#312e81', '#a78bfa'], ['#7f1d1d', '#fb7185'], ['#164e63', '#22d3ee'],
]

export function gradientFor(video) {
  return palette[video.id % palette.length]
}

export function formatDuration(totalSeconds) {
  if (totalSeconds == null) return ''
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}