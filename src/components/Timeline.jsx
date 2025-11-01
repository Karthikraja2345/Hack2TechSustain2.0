import React from 'react'

const Timeline = () => {
  const timelineSteps = [
    {
      date: 'Sept 30, 2025',
      title: 'Submit Ideas',
      badge: 'Round 1',
      badgeClass: 'round-1',
      location: 'Online',
      icon: 'fas fa-lightbulb',
      description: 'Submit your innovative AI solutions (PPT, max 7 slides)',
      delay: '100'
    },
    {
      date: 'Oct 30, 2025',
      title: 'Qualifier',
      badge: 'Round 2',
      badgeClass: 'round-2',
      location: 'Notification',
      icon: 'fas fa-users',
      description: 'Shortlisted teams will qualify for the Grand Finale at Anna University, MIT Campus',
      delay: '200'
    },
    {
      date: 'Dec 19, 2025',
      title: 'Grand Finale',
      badge: 'Final Round',
      badgeClass: 'final-round',
      location: 'DCT, MIT Campus',
      icon: 'fas fa-trophy',
      description: '24-hour hackathon, final pitches & awards',
      delay: '300',
      isFinal: true
    }
  ]

  return (
    <section id="timeline" className="section section-black">
      <div className="container">
        <h2 className="section-title white">Timeline</h2>
        
        <div className="horizontal-timeline">
          <div className="timeline-line-horizontal"></div>
          
          <div className="timeline-steps">
            {timelineSteps.map((step, index) => (
              <div key={index} className="timeline-step" data-aos="fade-up" data-aos-delay={step.delay}>
                <div className={`timeline-dot-horizontal ${step.isFinal ? 'timeline-final' : ''}`}>
                  <i className={step.icon}></i>
                </div>
                <div className="timeline-content-horizontal">
                  <div className="timeline-date">{step.date}</div>
                  <h3>{step.title}</h3>
                  <span className={`timeline-badge ${step.badgeClass}`}>{step.badge}</span>
                  <div className="timeline-location">
                    <i className={step.location === 'Online' ? 'fas fa-globe' : 
                                 step.location === 'Notification' ? 'fas fa-bell' : 'fas fa-map-marker-alt'}></i> {step.location}
                  </div>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
