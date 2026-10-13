import { Link, useParams } from 'react-router-dom'
import { videos } from '../data/videos'
import VideoCard from '../components/VideoCard'

export default function VideoDetails() {
  const { id } = useParams()
  const video = videos.find((v) => String(v.id) === id)

  if (!video) {
    return (
      <section className="details">
        <h1>Video not found</h1>
        <p className="empty">This video does not exist or was removed.</p>
        <Link to="/" className="btn-primary">Back to home</Link>
      </section>
    )
  }

  const [c1, c2] = video.colors
  const related = videos.filter((v) => v.category === video.category && v.id !== video.id)

  return (
    <section className="details">
      <Link to="/" className="back">← Back</Link>

      <div className="player">
        {video.src ? (
          <video controls src={video.src} />
        ) : (
          <div
            className="player-placeholder"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            <span className="play-big" aria-hidden="true">▶</span>
            <p>Video playback is added in Phase 4.</p>
          </div>
        )}
      </div>

      <h1>{video.title}</h1>
      <p className="meta">{video.creator} · {video.category} · {video.duration}</p>
      <p className="details-desc">{video.description}</p>

      {related.length > 0 && (
        <>
          <h2>More in {video.category}</h2>
          <div className="grid">
            {related.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}