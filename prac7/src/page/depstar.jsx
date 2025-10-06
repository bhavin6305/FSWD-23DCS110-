import React from 'react';

export default function Depstar({ isSidebarOpen }) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingLeft: isSidebarOpen ? '250px' : '60px',
    boxSizing: 'border-box',
    transition: 'padding-left 0.3s ease',
    background: '#eef3f7',
  };

  const contentStyle = {
    textAlign: 'center',
    maxWidth: '1000px',
    padding: '30px',
  };

  const headingStyle = {
    marginBottom: '30px',
  };

  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const cardStyle = {
    background: '#fff',
    padding: '30px 20px',
    borderRadius: '10px',
    width: '220px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'transform 0.2s',
  };

  const departments = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & Machine Learning (AI-ML)',
    'Cyber Security',
    'Data Science'
  ];

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>🏫 DEPSTAR Departments</h1>
        <div style={cardsContainerStyle}>
          {departments.map((dept, index) => (
            <div key={index} style={cardStyle}>
              {dept}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
