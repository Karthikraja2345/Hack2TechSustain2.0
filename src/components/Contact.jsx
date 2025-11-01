import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="section section-black">
      <div className="container">
        <h2 className="section-title white">Contact & Location</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-content">
                <h4>Address</h4>
                <p>Department of Computer Technology<br />MIT Campus, Anna University<br />Tamil Nadu, India<br/>📞 04422516266</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-content">
                <h4>Email</h4>
                <p><a href="mailto:hack2techsustain@gmail.com">hack2techsustain@gmail.com</a></p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-content">
                <h4>Phone</h4>
                <p><a href="tel:+917358089612">+917358089612</a></p>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe 
              src="https://maps.google.com/maps?q=MIT+Campus+Anna+University+Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="400" 
              style={{border: 0, borderRadius: '12px'}} 
              allowFullScreen="" 
              loading="lazy"
              title="MIT Campus Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact