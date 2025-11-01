import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const Gallery = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = useMemo(() => [
    { src: '/images/slide3.webp', alt: 'Hackathon Event 1' },
    { src: '/images/conference.webp', alt: 'Conference Hall' },
    { src: '/images/slide2.webp', alt: 'Hackathon Event 2' },
    { src: '/images/admin.webp', alt: 'Administrative Building' }
  ], [])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Use intersection observer to pause/resume carousel
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3
  })

  useEffect(() => {
    if (!isVisible) return // Don't run carousel when not visible
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Smooth slideshow timing

    return () => clearInterval(interval)
  }, [slides.length, isVisible])

  return (
    <section id="gallery" className="section section-black" ref={elementRef}>
      <div className="container">
        <h2 className="section-title white">Gallery</h2>

        <div className="gallery-slideshow">
          <div className="gallery-slides-wrapper">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`gallery-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  loading="lazy"
                  decoding="async"
                  className="gallery-slide-image"
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button className="gallery-control prev" onClick={prevSlide} aria-label="Previous slide">
            <span className="gallery-control-icon">❮</span>
          </button>
          <button className="gallery-control next" onClick={nextSlide} aria-label="Next slide">
            <span className="gallery-control-icon">❯</span>
          </button>

          {/* Indicators */}
          <div className="gallery-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`gallery-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default Gallery