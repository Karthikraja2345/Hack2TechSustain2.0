import React, { useState, useEffect } from 'react';

const Sponsors = () => {
  const sponsors = [
    {
      name: 'StartupTN - Government of Tamil Nadu initiative supporting startups and innovation',
      logo: '/images/StartupTN.png',
      tier: 'platinum'
    },
    {
      name: 'Ragworks.AI Limited - Enabling advanced AI solutions through RAG and intelligent automation',
      logo: '/images/Rag.png',
      tier: 'gold'
    },
    {
      name: 'QbytX Private Limited - Empowering innovation through modern technology and digital solutions',
      logo: '/images/qbytx.png',
      tier: 'gold'
    },
    {
      name: 'ABT Maruti - Authorized Maruti Suzuki dealer supporting reliable mobility solutions',
      logo: '/images/abtmaruti.png',
      tier: 'silver'
    },
    {
      name: 'Ospectra AI - Delivering scalable and impactful artificial intelligence solutions',
      logo: '/images/ospectra.png',
      tier: 'silver'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 2000); // Change slide every 2 second

    return () => clearInterval(interval);
  }, [sponsors.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sponsors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  };

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-accent">Our Proud</span> Sponsors
          </h2>
        </div>

        <div className="sponsors-slideshow">
          <button className="sponsor-nav-btn prev" onClick={prevSlide} aria-label="Previous sponsor">
            ‹
          </button>

          <div className="sponsors-slider-wrapper">
            <div className="sponsors-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index} 
                  className={`sponsor-slide ${sponsor.tier} ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="sponsor-card-slideshow">
                    <div className="sponsor-logo-wrapper-slideshow">
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`}
                        className="sponsor-logo-slideshow"
                        loading="lazy"
                      />
                    </div>
                    <div className="sponsor-name-slideshow">{sponsor.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="sponsor-nav-btn next" onClick={nextSlide} aria-label="Next sponsor">
            ›
          </button>
        </div>

        <div className="sponsor-indicators">
          {sponsors.map((_, index) => (
            <button
              key={index}
              className={`sponsor-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to sponsor ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
