import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVideos } from '../api'
import { gradientFor } from '../utils'
import { useAsync } from '../hooks/useAsync'
import CategoryRow from '../components/CategoryRow'
import VideoCard from '../components/VideoCard'
import { ErrorBox, Loading } from '../components/Status'

export default function Home({ query }) {
  const [category, setCategory] = useState('All')
  const { status, data, retry } = useAsync((signal) => getVideos({ limit: 50 }, signal), [])

  const videos = useMemo(() => data?.videos ?? [], [data])
  const categories = useMemo(() => ['All', ...new Set(videos.map((v) => v.category))], [videos])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return videos.filter((v) => {
      const matchesCategory = category === 'All' || v.category === category
      const matchesQuery =
        q === '' ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [videos, query, category])

  if (status === 'loading') return <Loading label="Loading videos" />
  if (status === 'error') {
    return <ErrorBox message="We could not load videos. Please try again." onRetry={retry} />
  }
  if (videos.length === 0) return <p className="status">No videos have been published yet.</p>

  const isFiltering = query.trim() !== '' || category !== 'All'
  const featured = videos[0]

  return (
    <>
      {!isFiltering && (
        <section
          className="hero"
          style={{ background: `linear-gradient(120deg, ${gradientFor(featured)[0]}, #0b0b0f 75%)` }}
        >
          <div className="hero-content">
            <p className="eyebrow">Featured</p>
            <h1>{featured.title}</h1>
            <p className="hero-desc">{featured.description}</p>
            <div className="hero-actions">
              <Link to={`/videos/${featured.id}`} className="btn-primary">▶ Play</Link>
              <Link to={`/videos/${featured.id}`} className="btn-secondary">More info</Link>
            </div>
          </div>
        </section>
      )}

      <div className="chips" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={c === category ? 'chip active' : 'chip'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {isFiltering ? (
        <section className="results">
          <h2>{filtered.length} result{filtered.length === 1 ? '' : 's'}</h2>
          {filtered.length === 0 ? (
            <p className="empty">No videos match your search.</p>
          ) : (
            <div className="grid">
              {filtered.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </section>
      ) : (
        categories
          .filter((c) => c !== 'All')
          .map((c) => (
            <CategoryRow
              key={c}
              title={c}
              videos={videos.filter((v) => v.category === c)}
            />
          ))
      )}
    </>
  )
}