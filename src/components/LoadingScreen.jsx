import React, { useState, useEffect } from 'react'

const LoadingScreen = React.memo(() => {
  // Shorter default timeout and allow dismiss on first user interaction to
  // avoid blocking touch/scroll on mobile.
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200)

    const dismiss = () => setIsVisible(false)
    // Dismiss early on any user interaction
    window.addEventListener('pointerdown', dismiss, { once: true, passive: true })
    window.addEventListener('touchstart', dismiss, { once: true, passive: true })
    window.addEventListener('keydown', dismiss, { once: true, passive: true })

    return () => {
      clearTimeout(timer)
      try {
        window.removeEventListener('pointerdown', dismiss)
        window.removeEventListener('touchstart', dismiss)
        window.removeEventListener('keydown', dismiss)
      } catch {}
    }
  }, [])

  if (!isVisible) return null

  return (
    <div id="loading-screen" className="loading-screen" aria-hidden={!isVisible}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="holographic">Sustainovate 2.0</div>
        </div>
        <div className="loading-animation">
          <div className="loading-bar" aria-hidden></div>
          <div className="loading-particles" aria-hidden></div>
        </div>
        <div className="loading-text">Initializing Future Technologies...</div>
      </div>
    </div>
  )
})

export default LoadingScreen