import React, { useState, useEffect } from 'react'
import { useThrottle } from '../hooks/useDebounce'

const VirtualizedOrganizerGrid = React.memo(({ organizers, renderItem, chunkSize = 6 }) => {
  const [visibleChunks, setVisibleChunks] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const chunks = []
  for (let i = 0; i < organizers.length; i += chunkSize) {
    chunks.push(organizers.slice(i, i + chunkSize))
  }

  const loadMoreChunks = () => {
    if (isLoading || visibleChunks >= chunks.length) return
    
    setIsLoading(true)
    setTimeout(() => {
      setVisibleChunks(prev => Math.min(prev + 1, chunks.length))
      setIsLoading(false)
    }, 100) // Small delay to prevent UI blocking
  }

  const throttledLoadMore = useThrottle(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      loadMoreChunks()
    }
  }, 200) // Throttle to 200ms

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return
      throttledLoadMore()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttledLoadMore, isLoading])

  const visibleOrganizers = chunks.slice(0, visibleChunks).flat()

  return (
    <div className="organizers-grid">
      {visibleOrganizers.map((organizer, index) =>
        renderItem(organizer, index)
      )}
      {isLoading && (
        <div className="loading-more" style={{ 
          gridColumn: '1 / -1', 
          textAlign: 'center', 
          padding: '2rem',
          color: '#888'
        }}>
          Loading more...
        </div>
      )}
    </div>
  )
})

VirtualizedOrganizerGrid.displayName = 'VirtualizedOrganizerGrid'

export default VirtualizedOrganizerGrid