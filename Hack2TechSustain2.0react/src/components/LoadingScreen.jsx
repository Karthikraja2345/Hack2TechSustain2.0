import React, { useState, useEffect } from 'react'

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div id="loading-screen" className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <div className="holographic">Sustainovate 2.0</div>
        </div>
        <div className="loading-animation">
          <div className="loading-bar"></div>
          <div className="loading-particles"></div>
        </div>
        <div className="loading-text">Initializing Future Technologies...</div>
      </div>
    </div>
  )
}

export default LoadingScreen