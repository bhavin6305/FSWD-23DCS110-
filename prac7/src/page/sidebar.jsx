import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css' // if you're using external CSS

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav className="menu">
        <Link to="/home"><button>Home</button></Link>
        <Link to="/cse"><button>CSE</button></Link>
        <Link to="/charusat"><button>Charusat</button></Link>
        <Link to="/depstar"><button>Depstar</button></Link>
      </nav>
    </div>
  )
}
