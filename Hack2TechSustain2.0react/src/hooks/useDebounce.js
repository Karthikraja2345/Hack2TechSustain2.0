import { useCallback, useRef } from 'react'

export const useDebounce = (func, delay) => {
  const timeoutRef = useRef(null)

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        func(...args)
      }, delay)
    },
    [func, delay]
  )
}

export const useThrottle = (func, delay) => {
  const lastRan = useRef(Date.now())

  return useCallback(
    (...args) => {
      if (Date.now() - lastRan.current >= delay) {
        func(...args)
        lastRan.current = Date.now()
      }
    },
    [func, delay]
  )
}