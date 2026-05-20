import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Detailspage from './pages/Detailspage'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'

function App() {

  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <main className='pt-2'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<Detailspage mediaType="movie" />} />
          <Route path="/tv/:id" element={<Detailspage mediaType="tv" />} />
          <Route path="/search" element={<Searchbar />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
