import VideoCard from './VideoCard'

export default function CategoryRow({ title, videos }) {
  if (videos.length === 0) return null
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="row-scroll">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </section>
  )
}