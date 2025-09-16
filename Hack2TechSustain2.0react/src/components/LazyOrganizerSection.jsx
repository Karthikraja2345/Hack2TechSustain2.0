import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import OrganizerSkeleton from './OrganizerSkeleton'

const LazyOrganizerSection = React.memo(({ title, organizers, renderCard, chunkSize = 3 }) => {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.05, // Lower threshold for faster loading
    rootMargin: '200px' // Larger margin for earlier loading
  })

  return (
    <section className="section section-white" ref={elementRef}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="organizers-grid">
          {hasBeenVisible ? (
            organizers.map((person, index) => renderCard(person, index))
          ) : (
            // Render skeleton loaders to maintain layout and show loading state
            Array.from({ length: Math.min(organizers.length, chunkSize) }).map((_, index) => (
              <OrganizerSkeleton key={`skeleton-${index}`} />
            ))
          )}
        </div>
      </div>
    </section>
  )
})

LazyOrganizerSection.displayName = 'LazyOrganizerSection'

export default LazyOrganizerSection