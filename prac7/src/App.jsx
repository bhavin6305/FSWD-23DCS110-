import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './page/sidebar';
import Home from './page/home';
import CSE from './page/cse';
import Charusat from './page/charuset';
import Depstar from './page/depstar';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      
      {isOpen ? (
        <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
      ) : (
        <Sidebar isOpen={false} toggleSidebar={toggleSidebar} />
      )}
    
      <div
        style={{
          marginLeft: isOpen ? '250px' : '60px',
          transition: 'margin-left 0.3s ease',
          padding: '20px',
        }}
      >
        {/* <div>
          {/* <h1>    This is the Main page</h1>
          <p>     This is the main content</p>
        </div> */} 
        <Routes>
          <Route path="/home" element={<Home isSidebarOpen={isOpen} />} />
          <Route path="/cse" element={<CSE isSidebarOpen={isOpen} />} />
          <Route path="/charusat" element={<Charusat isSidebarOpen={isOpen} />} />
          <Route path="/depstar" element={<Depstar isSidebarOpen={isOpen} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
