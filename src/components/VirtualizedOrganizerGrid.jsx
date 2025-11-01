import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import OptimizedOrganizerCard from './OptimizedOrganizerCard'

const VirtualizedOrganizerGrid = React.memo(({ 
  organizers, 
  containerHeight = 640
}) => {
  const [visibleItems, setVisibleItems] = useState(6) // Start with 6 items
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)
  const loadingRef = useRef(false)

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (loadingRef.current || visibleItems >= organizers.length) return

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const threshold = scrollHeight - clientHeight - 800 // Load more when 800px from bottom

    if (scrollTop >= threshold) {
      loadingRef.current = true
      setIsLoading(true)
      
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        setTimeout(() => {
          setVisibleItems(prev => Math.min(prev + 6, organizers.length))
          setIsLoading(false)
          loadingRef.current = false
        }, 100)
      })
    }
  }, [visibleItems, organizers.length])

  // Optimized scroll listener with passive events
  useEffect(() => {
    let ticking = false
    
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', optimizedScrollHandler)
  }, [handleScroll])

  // Memoize visible organizers to prevent unnecessary re-renders
  const visibleOrganizers = useMemo(() => 
    organizers.slice(0, visibleItems), [organizers, visibleItems])

  return (
    <div 
      ref={containerRef}
      className="virtualized-organizer-grid" 
      style={{ width: '100%', minHeight: containerHeight }}
    >
      <div className="organizers-grid">
        {visibleOrganizers.map((person, index) => (
          <OptimizedOrganizerCard 
            key={`${person.name}-${index}`} 
            person={person} 
            delay={(index * 50).toString()} 
          />
        ))}
      </div>
      
      {isLoading && (
        <div className="loading-more" style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#ff8c00'
        }}>
          <i className="fas fa-spinner fa-spin"></i> Loading more...
        </div>
      )}
      
      {visibleItems >= organizers.length && organizers.length > 6 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem',
          color: '#888'
        }}>
          All organizers loaded
        </div>
      )}
    </div>
  )
})

VirtualizedOrganizerGrid.displayName = 'VirtualizedOrganizerGrid'

export default VirtualizedOrganizerGrid