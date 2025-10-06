import React from 'react';

export default function CSE({ isSidebarOpen }) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingLeft: isSidebarOpen ? '250px' : '60px',
    boxSizing: 'border-box',
    transition: 'padding-left 0.3s ease',
    background: '#f3f8ff',
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
    background: '#ffffff',
    padding: '25px 20px',
    borderRadius: '10px',
    width: '240px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    fontWeight: 'bold',
    fontSize: '17px',
    transition: 'transform 0.2s ease',
  };

  const specializationList = [
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
    'Cyber Security',
    'Data Structures & Algorithms',
  ];

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>💻 CSE Specializations</h1>
        <div style={cardsContainerStyle}>
          {specializationList.map((item, index) => (
            <div key={index} style={cardStyle}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
