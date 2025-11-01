import React, { useState, useCallback, useMemo } from 'react'

const OptimizedOrganizerCard = React.memo(({ person, delay = '0' }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true) // Still consider it "loaded" to remove skeleton
  }, [])

  // Memoize image src to prevent unnecessary re-renders
  const imageSrc = useMemo(() => {
    if (!person.image) return '/images/default-avatar.webp'
    
    // Convert to WebP if not already
    if (person.image.endsWith('.jpg') || person.image.endsWith('.jpeg') || person.image.endsWith('.png')) {
      return person.image.replace(/\.(jpg|jpeg|png)$/, '.webp')
    }
    return person.image
  }, [person.image])

  // Memoize contact elements to prevent re-renders
  const contactElements = useMemo(() => (
    <div className="organizer-contact">
      {person.email && (
        <a 
          href={`mailto:${person.email}`} 
          aria-label={`Email ${person.name}`}
        >
          <i className="fas fa-envelope"></i>
        </a>
      )}
      {person.phone && (
        <a 
          href={`tel:${person.phone}`} 
          aria-label={`Call ${person.name}`}
        >
          <i className="fas fa-phone"></i>
        </a>
      )}
      {person.linkedin && (
        <a 
          href={person.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={`${person.name} LinkedIn profile`}
        >
          <i className="fab fa-linkedin"></i>
        </a>
      )}
    </div>
  ), [person.email, person.phone, person.linkedin, person.name])

  return (
    <div className="organizer-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="organizer-aavatar">
        {!imageLoaded && (
          <div className="organizer-avatar-skeleton" />
        )}
        <img
          src={imageSrc}
          alt={person.name}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: imageError ? 'none' : 'block'
          }}
        />
        {imageError && (
          <div className="organizer-avatar-fallback">
            <i className="fas fa-user"></i>
          </div>
        )}
      </div>
      <h3>{person.name}</h3>
      <p className="organizer-role">{person.role}</p>
      <p className="organizer-dept">{person.dept}</p>
      {contactElements}
    </div>
  )
})

OptimizedOrganizerCard.displayName = 'OptimizedOrganizerCard'

export default OptimizedOrganizerCard