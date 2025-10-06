import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HoverPreview from "./HoverPreview";

const Card = ({ movieData, isLiked = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({ top: rect.top - 90, left: rect.left });
    setIsHovered(true);
  };

  return (
    <div
      className="relative w-[220px] flex-shrink-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
        className="w-full h-full rounded"
        onClick={() => navigate("/player", { state: { id: movieData.id } })}
      />
      {isHovered && (
        <HoverPreview
          movieData={movieData}
          isLiked={isLiked}
          position={hoverPosition}
          onClose={() => setIsHovered(false)}
        />
      )}
    </div>
  );
};

export default Card;
