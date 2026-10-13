import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ query, onQueryChange }) {
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="StreamSphere home">
        Stream<span>Sphere</span>
      </Link>

      <nav className="nav-links" aria-label="Main">
        <NavLink to="/" end>Home</NavLink>
        <span className="soon">My List</span>
        <span className="soon">Creator Studio</span>
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