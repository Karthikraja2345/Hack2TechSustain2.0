import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const LazyOrganizerSection = React.memo(({ title, organizers, renderCard, chunkSize = 3 }) => {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  })

  return (
    <section className="section section-white" ref={elementRef}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="organizers-grid">
          {hasBeenVisible ? (
            organizers.map((person, index) => renderCard(person, index))
          ) : (
            // Render placeholder cards to maintain layout
            Array.from({ length: Math.min(organizers.length, chunkSize) }).map((_, index) => (
              <div 
                key={index} 
                className="organizer-card-placeholder"
                style={{
                  height: '300px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888'
                }}
              >
                Loading...
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
})

LazyOrganizerSection.displayName = 'LazyOrganizerSection'

export default LazyOrganizerSection