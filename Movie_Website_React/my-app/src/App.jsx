import Navbar from './components/Navbar'
import { Route ,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Detailspage from './pages/Detailspage'
import Footer from './components/Footer'
import GradualBlur from './components/Blur';
import Searchbar from './components/Searchbar'

function App() {

  return (
    <>
    <section style={{position: 'relative',height: '100vh',overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto' }}>
    <Navbar/>
    <main className='main-content'>
    <Routes>
      <Route path = "/" element={<Homepage/>}/>
      <Route path = "/movie/:id" element={<Detailspage/>}/>
      <Route path="/search" element={<Searchbar />} />
    </Routes>
   </main>
   <Footer/>
  </div>

  <GradualBlur
    target="page"
    position="bottom"
    height="2rem"
    strength={1}
    divCount={1}
    curve="bezier"
    exponential={true}
    opacity={0.5}
  />
</section>
    </>
  )
}

export default App
