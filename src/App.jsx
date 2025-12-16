import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import LazySection from './components/LazySection'
import './critical.css'

// Lazy load components that are not immediately visible
const Sponsors = React.lazy(() => import('./components/Sponsors'))
const Problems = React.lazy(() => import('./components/Problems'))
const Timeline = React.lazy(() => import('./components/Timeline'))
const Prizes = React.lazy(() => import('./components/Prizes'))
const Gallery = React.lazy(() => import('./components/Gallery'))
const Organizers = React.lazy(() => import('./components/Organizers'))
const Contact = React.lazy(() => import('./components/Contact'))
const Footer = React.lazy(() => import('./components/Footer'))

function App() {
  // Load main CSS after initial render
  useEffect(() => {
    const loadMainCSS = () => {
      import('./style.css')
    }
    
    // Load main CSS after a short delay
    const timer = setTimeout(loadMainCSS, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <Navbar />
        <Hero />
        <LazySection minHeight="300px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Sponsors />
          </Suspense>
        </LazySection>
        <LazySection minHeight="300px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Problems />
          </Suspense>
        </LazySection>
        <LazySection minHeight="400px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Timeline />
          </Suspense>
        </LazySection>
        <LazySection minHeight="300px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Prizes />
          </Suspense>
        </LazySection>
        <LazySection minHeight="400px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Gallery />
          </Suspense>
        </LazySection>
        <LazySection minHeight="600px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Organizers />
          </Suspense>
        </LazySection>
        <LazySection minHeight="300px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Contact />
          </Suspense>
        </LazySection>
        <LazySection minHeight="200px">
          <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
            <Footer />
          </Suspense>
        </LazySection>
      </div>
    </Router>
  )
}

export default App
