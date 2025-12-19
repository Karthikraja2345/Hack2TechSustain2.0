import React, { useState, useEffect, useCallback, useMemo } from 'react'

const Hero = React.memo(() => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const targetDate = useMemo(() => new Date('December 19, 2025 09:00:00').getTime(), [])

  const updateCountdown = useCallback(() => {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    setTimeLeft({ days, hours, minutes, seconds })
  }, [targetDate])

  useEffect(() => {
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    // Cleanup on visibility change to save performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [updateCountdown])

  const formatTime = (time) => time.toString().padStart(2, '0')

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-particles"></div>
      </div>
      <div className="hero-geometric"></div>
      <div className="hero-scanlines"></div>
      <div className="digital-rain"></div>
      <div className="tech-grid"></div>
      <div className="floating-icons"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Hack2TechSustain 2.0</span>
            <span className="title-line accent">Sustainovate</span>
          </h1>
          <p className="hero-subtitle">Leveraging AI's Voice, Vision, and Values for a Better World</p>
          
          <div className="countdown-container">
            <div className="countdown-timer">
              <div className="countdown-card">
                <div className="countdown-number">{formatTime(timeLeft.days)}</div>
                <div className="countdown-label">Days</div>
              </div>
              <div className="countdown-card">
                <div className="countdown-number">{formatTime(timeLeft.hours)}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-card">
                <div className="countdown-number">{formatTime(timeLeft.minutes)}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-card">
                <div className="countdown-number">{formatTime(timeLeft.seconds)}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
          </div>

          {/* Unstop submit button removed per request */}
        </div>
      </div>
    </section>
  )
})

export default Hero