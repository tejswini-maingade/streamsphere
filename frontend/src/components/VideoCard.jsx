import { Link } from 'react-router-dom'
import { formatDuration, gradientFor } from '../utils'

export default function VideoCard({ video }) {
  const [c1, c2] = gradientFor(video)
  return (
    <Link to={`/videos/${video.id}`} className="card-link">
      <article className="card">
        <div
          className="thumb"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          role="img"
          aria-label={`Thumbnail for ${video.title}`}
        >
          <span className="duration">{formatDuration(video.durationSeconds)}</span>
          <span className="play" aria-hidden="true">▶</span>
        </div>
        <div className="card-body">
          <h3>{video.title}</h3>
          <p className="meta">{video.creator.displayName} · {video.category}</p>
        </div>
      </article>
    </Link>
  )
}