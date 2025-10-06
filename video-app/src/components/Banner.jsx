import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPlayCircleSharp } from 'react-icons/io5';

const Banner = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div
      className="relative h-[70vh] bg-cover bg-center flex items-center px-16"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-white max-w-lg">
        <h1 className="text-5xl font-bold mb-4">{movie.name}</h1>
        <p className="text-lg mb-6 line-clamp-3">
          {movie.genres.join(', ')} • Trending Now
        </p>
        <button
          onClick={() => navigate('/player', { state: { id: movie.id } })}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          <IoPlayCircleSharp size={24} />
          Play
        </button>
      </div>
    </div>
  );
};

export default Banner;
