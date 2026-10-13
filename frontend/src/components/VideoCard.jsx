import { Link } from 'react-router-dom'

export default function VideoCard({ video }) {
  const [c1, c2] = video.colors
  return (
    <Link to={`/videos/${video.id}`} className="card-link">
      <article className="card">
        <div
          className="thumb"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          role="img"
          aria-label={`Thumbnail for ${video.title}`}
        >
          <span className="duration">{video.duration}</span>
          <span className="play" aria-hidden="true">▶</span>
        </div>
        <div className="card-body">
          <h3>{video.title}</h3>
          <p className="meta">{video.creator} · {video.category}</p>
        </div>
      </article>
    </Link>
  )
}