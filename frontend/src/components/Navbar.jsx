export default function Navbar({ query, onQueryChange }) {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="StreamSphere home">
        Stream<span>Sphere</span>
      </a>

      <nav className="nav-links" aria-label="Main">
        <a href="/" className="active">Home</a>
        <a href="/">My List</a>
        <a href="/">Creator Studio</a>
      </nav>

      <div className="nav-right">
        <input
          type="search"
          className="search"
          placeholder="Search videos"
          aria-label="Search videos"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button type="button" className="btn-signin">Sign in</button>
      </div>
    </header>
  )
}