import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VideoDetails from './pages/VideoDetails'

export default function App() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Typing in the search box from another page takes you back to the results.
  function handleQueryChange(value) {
    setQuery(value)
    if (pathname !== '/') navigate('/')
  }

  return (
    <>
      <Navbar query={query} onQueryChange={handleQueryChange} />
      <main>
        <Routes>
          <Route path="/" element={<Home query={query} />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="*" element={<VideoDetails />} />
        </Routes>
      </main>
      <footer className="footer">© StreamSphere demo project. All content is original sample data.</footer>
    </>
  )
}