import React from 'react'

const Organizers = () => {
  const convenor = {
    name: 'Dr. Jayashree Padmanabhan',
    role: 'Dean of MIT',
    dept: 'Computer Technology',
    image: '/images/slide3.jpg',
    email: 'jayashree@mitindia.edu',
    phone: '+919444024463'
  }

  const facultyCoordinators = [
    {
      name: 'Dr. Kottilingam Kottursamy',
      role: 'Faculty Coordinator',
      dept: 'Computer Technology',
      image: '/images/kottilingam.jpg',
      email: 'kottilingam@mitindia.edu',
      phone: '+917358089612'
    },
    {
      name: 'Dr. Kathiroli Raja',
      role: 'Faculty Coordinator',
      dept: 'Computer Technology',
      image: '/images/kathiroli.jpeg',
      email: 'hack2techsustain@gmail.com',
      phone: '+919940576212'
    }
  ]

  const eventCoordinators = [
    {
      name: 'Duraisingh J',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/durai.jpg',
      email: 'duraisingh2005@gmail.com',
      phone: '+9197882 96415',
      linkedin: 'https://www.linkedin.com/in/duraisingh-j-sept012005'
    },
    {
      name: 'Sriram S',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/sriram.jpg',
      email: 'sriramzz.027@gmail.com',
      phone: '+918807072141'
    },
    {
      name: 'Natasha Azmi',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/natasha.jpg',
      email: 'natashanasim28@gmail.com',
      phone: '+918189963473',
      linkedin: 'https://in.linkedin.com/in/natasha-azmi-1a034b28b'
    },
    {
      name: 'Sivasankari M',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/sivasankari.jpg',
      email: 'sivasankarim2006@gmail.com',
      phone: '+916381039341',
      linkedin: 'https://www.linkedin.com/in/sivasankarim2006/'
    },
    {
      name: 'Keerthana Ganesh Babu',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/keerthana.jpg',
      phone: '+919884802034',
      linkedin: 'https://in.linkedin.com/in/keerthana-gb-17722328b'
    },
    {
      name: 'Lokesh R N',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/lokesh.jpg',
      phone: '+919344362544',
      linkedin: 'https://in.linkedin.com/in/lokesh-rn'
    }
  ]

  const webDevelopers = [
    {
      name: 'Karthik raja A',
      role: 'Web Developer',
      dept: 'Computer Technology',
      image: '/images/karhikraja.jpg',
      email: 'karthikrajaanand12@gmail.com',
      phone: '+919442143046',
      linkedin: 'https://www.linkedin.com/in/karthikraja2345/'
    },
    {
      name: 'Jaya Suriya S',
      role: 'Web Developer',
      dept: 'Computer Technology',
      image: '/images/m.jpg',
      email: 'jayasuriya77721@gmail.com',
      phone: '+917502737734',
      linkedin: 'https://www.linkedin.com/in/jayasuriya-s-39302b2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  ]

  const OrganizerCard = ({ person, delay = "0" }) => (
    <div className="organizer-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="organizer-aavatar">
        <img src={person.image} alt={person.name} loading="lazy" />
      </div>
      <h3>{person.name}</h3>
      <p className="organizer-role">{person.role}</p>
      <p className="organizer-dept">{person.dept}</p>
      <div className="organizer-contact">
        {person.email && (
          <a href={`mailto:${person.email}`}>
            <i className="fas fa-envelope"></i>
          </a>
        )}
        {person.linkedin && (
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        )}
        {person.phone && (
          <a href={`tel:${person.phone}`}>
            <i className="fas fa-phone"></i>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Convenor Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Meet the Convenor</h2>
          <div className="organizers-grid">
            <OrganizerCard person={convenor} delay="200" />
          </div>
        </div>
      </section>

      {/* Faculty Coordinators Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Meet the faculty Coordinators</h2>
          <div className="organizers-grid">
            {facultyCoordinators.map((person, index) => (
              <OrganizerCard key={index} person={person} delay={(index * 200 + 100).toString()} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Coordinators Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Meet the Event Coordinators</h2>
          <div className="organizers-grid">
            {eventCoordinators.map((person, index) => (
              <OrganizerCard key={index} person={person} delay={(index * 100 + 100).toString()} />
            ))}
          </div>
        </div>
      </section>

      {/* Web Development Team Section */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Meet the Web Development Team</h2>
          <div className="organizers-grid">
            {webDevelopers.map((person, index) => (
              <OrganizerCard key={index} person={person} delay={(index * 200 + 100).toString()} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Organizers