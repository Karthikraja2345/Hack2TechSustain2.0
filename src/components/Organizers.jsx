import React from 'react'
import LazyOrganizerSection from './LazyOrganizerSection'
import VirtualizedOrganizerGrid from './VirtualizedOrganizerGrid'
import OptimizedOrganizerCard from './OptimizedOrganizerCard'

const Organizers = React.memo(() => {
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
      email: 'kathiroli@mitindia.edu',
      phone: '+919940576212'
    },
    {
      name: 'Dr. T. Sudhakar',
      role: 'Faculty Coordinator',
      dept: 'Computer Technology',
      image: '/images/Sudhakar.webp', // You'll need to add this image
      email: 'sudhakart@mitindia.edu', // Update with actual email if available
      phone: '+919942290298' // Update with actual phone if available
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
      email: 'keerthanagb14@gmail.com',
      phone: '+919884802034',
      linkedin: 'https://in.linkedin.com/in/keerthana-gb-17722328b'
    },
    {
      name: 'Gokul K',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/gokul.jpg',
      email: 'gokulgk1905@gmail.com',
      phone: '+916374319224',
      linkedin: 'https://in.linkedin.com/in/arumuga-perumal-a0469b378'
    },
    {
      name: 'Arumuga Perumal G',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/perumal.jpg',
      email: 'perumalarumuga67@gmail.com',
      phone: '+919790074763',
      linkedin: 'https://in.linkedin.com/in/arumuga-perumal-a0469b378'
    },
    {
      name: 'Kavin K S',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/kavin.jpg',
      email: 'kskavin2004@gmail.com',
      phone: '+919345729298',
      linkedin: 'https://www.linkedin.com/in/kavin-k-s-8b132528a'
    },
    {
      name: 'Kishor M',
      role: 'Event Coordinator',
      dept: 'Computer Technology',
      image: '/images/kishore.png',
      email: 'kishorurc@gmail.com',
      phone: '+919345437285',
      linkedin: 'https://in.linkedin.com/in/kishor-m-b20561291'
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
    },
    {
      name: 'Lokesh R N',
      role: 'Web Developer',
      dept: 'Computer Technology',
      image: '/images/lokesh.jpg',
      phone: '+919344362544',
      linkedin: 'https://in.linkedin.com/in/lokesh-rn'
    }
  ]

  // Use the optimized organizer card
  const OrganizerCard = OptimizedOrganizerCard

  return (
    <>
      {/* Convenor Section */}
      <LazyOrganizerSection
        title="Meet the Convenor"
        organizers={[convenor]}
        renderCard={React.useCallback((person, index) => (
          <OrganizerCard key={index} person={person} delay="200" />
        ), [])}
        chunkSize={1}
      />

      {/* Faculty Coordinators Section */}
      <LazyOrganizerSection
        title="Meet the Faculty Coordinators"
        organizers={facultyCoordinators}
        renderCard={React.useCallback((person, index) => (
          <OrganizerCard key={index} person={person} delay={(index * 200 + 100).toString()} />
        ), [])}
        chunkSize={3}
      />

      {/* Event Coordinators Section - Use virtualized grid for better performance */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Meet the Event Coordinators</h2>
          {eventCoordinators.length > 6 ? (
            <VirtualizedOrganizerGrid
              organizers={eventCoordinators}
              containerHeight={800}
              cardWidth={300}
              cardHeight={320}
              gap={20}
            />
          ) : (
            <div className="organizers-grid">
              {eventCoordinators.map((person, index) => (
                <OrganizerCard key={index} person={person} delay={(index * 100 + 100).toString()} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Web Development Team Section */}
      <LazyOrganizerSection
        title="Meet the Web Development Team"
        organizers={webDevelopers}
        renderCard={React.useCallback((person, index) => (
          <OrganizerCard key={index} person={person} delay={(index * 200 + 100).toString()} />
        ), [])}
        chunkSize={3}
      >
        {webDevelopers.length > 6 ? (
          <VirtualizedOrganizerGrid
            organizers={webDevelopers}
            containerHeight={480}
            cardWidth={300}
            cardHeight={320}
            gap={20}
          />
        ) : null}
      </LazyOrganizerSection>
    </>
  )
})

export default Organizers