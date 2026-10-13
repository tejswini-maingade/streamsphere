import { Link, useParams } from 'react-router-dom'
import { getVideo, getVideos } from '../api'
import { formatDuration, gradientFor } from '../utils'
import { useAsync } from '../hooks/useAsync'
import VideoCard from '../components/VideoCard'
import { ErrorBox, Loading } from '../components/Status'

export default function VideoDetails() {
  const { id } = useParams()
  const { status, data: video, error, retry } = useAsync((signal) => getVideo(id, signal), [id])

  const category = video?.category
  const related = useAsync(
    (signal) =>
      category ? getVideos({ category, limit: 12 }, signal) : Promise.resolve({ items: [] }),
    [category],
  )

  if (status === 'loading') return <Loading label="Loading video" />

  if (status === 'error') {
    // 400 (bad id) and 404 (missing or unpublished) both mean "no such video".
    if (error.status === 400 || error.status === 404) {
      return (
        <section className="details">
          <h1>Video not found</h1>
          <p className="empty">This video does not exist or was removed.</p>
          <Link to="/" className="btn-primary">Back to home</Link>
        </section>
      )
    }
    return <ErrorBox message="We could not load this video. Please try again." onRetry={retry} />
  }

  const [c1, c2] = gradientFor(video)
  const others = (related.data?.items ?? []).filter((v) => v.id !== video.id)

  return (
    <section className="details">
      <Link to="/" className="back">← Back</Link>

      <div className="player">
        <div
          className="player-placeholder"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <span className="play-big" aria-hidden="true">▶</span>
          <p>Video playback is added in Phase 4.</p>
        </div>
      </div>

      <h1>{video.title}</h1>
      <p className="meta">
        {video.creator.displayName} · {video.category} · {formatDuration(video.durationSeconds)}
      </p>
      <p className="details-desc">{video.description}</p>

      {others.length > 0 && (
        <>
          <h2>More in {video.category}</h2>
          <div className="grid">
            {others.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}