import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const LazySection = React.memo(({ children, className = '', minHeight = '200px' }) => {
  const { elementRef, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  })

  return (
    <div ref={elementRef} className={className} style={{ minHeight }}>
      {hasBeenVisible ? children : (
        <div style={{ 
          height: minHeight, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#888'
        }}>
          Loading...
        </div>
      )}
    </div>
  )
})

LazySection.displayName = 'LazySection'

export default LazySection