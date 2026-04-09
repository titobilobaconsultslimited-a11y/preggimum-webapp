import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Information from './pages/Information'
import Tips from './pages/Tips'
import Contact from './pages/Contact'
import useScrollAnimation from './hooks/useScrollAnimation'

function App() {
  useScrollAnimation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/information" element={<Information />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
