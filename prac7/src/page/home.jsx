import React from 'react';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Dashboard</h1>
      <p style={styles.subtext}>
        Navigate through the sidebar to explore different departments and
        sections of the application.
      </p>
      <div style={styles.card}>
        <h2>✨ Features:</h2>
        <ul>
          <li>View department details</li>
          <li>Explore CSE, Charusat, and Depstar info</li>
          <li>Clean sidebar navigation</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    paddingLeft: '20px',
    paddingRight: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
};
