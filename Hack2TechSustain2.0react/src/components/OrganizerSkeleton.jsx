import React from 'react'

const OrganizerSkeleton = () => {
  const skeletonStyles = {
    container: {
      height: '320px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #e9ecef',
      animation: 'skeleton-pulse 1.5s ease-in-out infinite alternate'
    },
    avatar: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#e9ecef',
      marginBottom: '1rem'
    },
    nameLine: {
      width: '80%',
      height: '20px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      marginBottom: '0.5rem'
    },
    roleLine: {
      width: '60%',
      height: '16px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      marginBottom: '0.5rem'
    },
    deptLine: {
      width: '70%',
      height: '14px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px'
    }
  }

  return (
    <div className="organizer-card-skeleton" style={skeletonStyles.container}>
      <div style={skeletonStyles.avatar}></div>
      <div style={skeletonStyles.nameLine}></div>
      <div style={skeletonStyles.roleLine}></div>
      <div style={skeletonStyles.deptLine}></div>
    </div>
  )
}

export default OrganizerSkeleton