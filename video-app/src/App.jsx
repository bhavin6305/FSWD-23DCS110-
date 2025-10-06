import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/movies'
import TVShows from './pages/TvShows'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/TvShows' element={<TVShows />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
