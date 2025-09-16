import { useEffect, useRef, useState } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasBeenVisible(true)
          // Once visible, we can stop observing for performance
          if (options.unobserveOnVisible !== false) {
            observer.unobserve(element)
          }
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options.threshold, options.rootMargin, options.unobserveOnVisible])

  return { elementRef, isVisible, hasBeenVisible }
}