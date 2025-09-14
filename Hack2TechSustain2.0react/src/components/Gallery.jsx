import React, { useState, useEffect } from 'react'

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    { src: '/images/slide3.jpg', alt: 'Image 1' },
    { src: '/images/conference.jpg', alt: 'Image 2' },
    { src: '/images/slide2.jpeg', alt: 'Image 3' },
    { src: '/images/admin.png', alt: 'Image 4' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="gallery" className="py-5 bg-dark text-center">
      <div className="container">
        <h2 className="text-white mb-4">Gallery</h2>

        <div id="galleryCarousel" className="carousel slide">
          <div className="carousel-inner rounded-4 shadow-lg">
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                <img src={slide.src} className="d-block w-100" alt={slide.alt} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" onClick={prevSlide}>
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" onClick={nextSlide}>
            <span className="carousel-control-next-icon"></span>
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === currentSlide ? 'active' : ''}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery