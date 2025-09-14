import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Timeline from './components/Timeline'
import Prizes from './components/Prizes'
import Gallery from './components/Gallery'
import Organizers from './components/Organizers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import './style.css'

function App() {
  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <Navbar />
        <Hero />
        <Problems />
        <Timeline />
        <Prizes />
        <Gallery />
        <Organizers />
        <Contact />
        <Footer />
      </div>
    </Router>
  )
}

export default App
