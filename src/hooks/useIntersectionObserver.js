import { useEffect, useRef, useState, useCallback } from 'react'

// High-performance IntersectionObserver hook optimized for smooth scrolling
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef(null)
  const observerRef = useRef(null)
  
  // Stable options to prevent observer recreation
  const stableOptions = useRef({
    threshold: options.threshold ?? 0.1,
    rootMargin: options.rootMargin ?? '100px', // Increased for earlier loading
    unobserveOnVisible: options.unobserveOnVisible ?? true
  })

  // Optimize callback with useCallback to prevent unnecessary observer updates
  const handleIntersection = useCallback(([entry]) => {
    const isIntersecting = entry.isIntersecting
    
    if (isIntersecting) {
      setIsVisible(true)
      setHasBeenVisible(true)
      
      // Unobserve for performance if configured to do so
      if (stableOptions.current.unobserveOnVisible && observerRef.current) {
        observerRef.current.unobserve(entry.target)
      }
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Create observer with optimized settings
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: stableOptions.current.threshold,
      rootMargin: stableOptions.current.rootMargin
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        try {
          observerRef.current.disconnect()
        } catch {
          // Silently handle any errors
        }
        observerRef.current = null
      }
    }
  }, [handleIntersection])

  return { elementRef, isVisible, hasBeenVisible }
}