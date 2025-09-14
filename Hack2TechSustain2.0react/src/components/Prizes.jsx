import React, { useState, useEffect } from 'react'

const Prizes = () => {
  const [animatedValues, setAnimatedValues] = useState({
    total: 0,
    first: 0,
    second: 0,
    third: 0
  })

  const targetValues = {
    total: 90000,
    first: 50000,
    second: 25000,
    third: 15000
  }

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000 // 2 seconds
      const startTime = Date.now()

      const updateCounters = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setAnimatedValues({
          total: Math.floor(targetValues.total * easeOut),
          first: Math.floor(targetValues.first * easeOut),
          second: Math.floor(targetValues.second * easeOut),
          third: Math.floor(targetValues.third * easeOut)
        })

        if (progress < 1) {
          requestAnimationFrame(updateCounters)
        }
      }

      updateCounters()
    }

    // Start animation after component mounts
    const timer = setTimeout(animateCounters, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="prizes" className="section section-white">
      <div className="container">
        <h2 className="section-title">Prize Pool</h2>

        <div className="prize-card special" data-aos="zoom-in" data-aos-delay="1000000">
          <div className="prize-rank">💰</div>
          <div className="prize-amount">₹{animatedValues.total.toLocaleString()}</div>
          <div className="prize-title">Total Pool</div>
        </div>

        <br />
        <br />

        <div className="prizes-grid">
          <div className="prize-card first-prize" data-aos="zoom-in" data-aos-delay="300000">
            <div className="prize-rank">🥇</div>
            <div className="prize-amount">₹{animatedValues.first.toLocaleString()}</div>
            <div className="prize-title">First Prize</div>
          </div>

          <div className="prize-card second-prize" data-aos="zoom-in" data-aos-delay="500000">
            <div className="prize-rank">🥈</div>
            <div className="prize-amount">₹{animatedValues.second.toLocaleString()}</div>
            <div className="prize-title">Second Prize</div>
          </div>

          <div className="prize-card third-prize" data-aos="zoom-in" data-aos-delay="700000">
            <div className="prize-rank">🥉</div>
            <div className="prize-amount">₹{animatedValues.third.toLocaleString()}</div>
            <div className="prize-title">Third Prize</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Prizes