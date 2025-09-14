import React, { useEffect, useRef } from 'react'

const Problems = () => {
  const sectionRef = useRef(null)

  const problemStatements = [
    {
      id: 'card1',
      title: 'Sustainability & Climate Action',
      description: 'Use generative AI to visualize and communicate climate impacts'
    },
    {
      id: 'card2',
      title: 'Technology for Social Good',
      description: 'Apply AI in building inclusive tools for communities and policies'
    },
    {
      id: 'card3',
      title: 'Equity, Inclusion & Education',
      description: 'Innovate using generative tools to deliver inclusive education'
    },
    {
      id: 'card4',
      title: 'Vision, Art & Expression',
      description: 'Inspire change through AI-generated narratives and media'
    },
    {
      id: 'card5',
      title: 'Data, Language & Impact',
      description: 'Transform data into impactful, accessible sustainability insights'
    }
  ]

  useEffect(() => {
    // Make cards visible when component mounts
    const cards = sectionRef.current?.querySelectorAll('.fade-in')
    cards?.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible')
      }, index * 200) // Stagger the animation
    })
  }, [])

  return (
    <section id="problems" className="section section-white" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in visible">Problem Statements</h2>
        <div className="card-container">
          {problemStatements.map((problem) => (
            <div key={problem.id} className="card-flip-container fade-in visible tech-card" id={problem.id}>
              <div className="card-flip">
                {/* Front side - Title only */}
                <div className="card-front">
                  <h3>{problem.title}</h3>
                </div>
                {/* Back side - Description */}
                <div className="card-back">
                  <p>{problem.description}</p>
                </div>
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problems