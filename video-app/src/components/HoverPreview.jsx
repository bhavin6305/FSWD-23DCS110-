
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import video from '../assets/video.mp4'

const TMDB_API_KEY = "880cba2b766de6617e34ec7cc1e58294";

const HoverPreview = ({ movieData, position, onClose }) => {
  const navigate = useNavigate();
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${TMDB_API_KEY}`
        );

        const trailer = data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movieData?.id) {
      fetchTrailer();
    }
  }, [movieData]);

  return createPortal(
    <div
      className="fixed w-80 bg-[#181818] rounded shadow-lg z-[9999] transition duration-300"
      style={{
        top: position.top,
        left: position.left,
      }}
      onMouseLeave={onClose}
    >
      <div className="relative h-[140px]">
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            className="absolute top-0 left-0 w-full h-full object-cover rounded"
            onClick={() => navigate("/player", { state: { id: movieData.id } })}
          />
        ) : (
          <video src={video}
            autoPlay loop muted
            className='absolute top-0 left-0 w-full h-full object-cover rounded'
            onClick={() => navigate("/player", { state: { id: movieData.id } })} />
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3
          className="text-white font-semibold text-lg"
          onClick={() => navigate("/player", { state: { id: movieData.id } })}
        >
          {movieData.name}
        </h3>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-white">
            <IoPlayCircleSharp
              title="Play"
              size={24}
              className="hover:text-gray-400 cursor-pointer"
              onClick={() => navigate("/player")}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-1">
          {movieData.genres.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default HoverPreview;
