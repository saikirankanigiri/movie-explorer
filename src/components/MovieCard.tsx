import React from "react";
import { Movie } from "../types";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/images/default-movie.jpg";
    console.error(`Failed to load image: ${movie.posterUrl}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
      onClick={() => onClick(movie)}
      role="button"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Movie Poster */}
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        <img
          src={movie.posterUrl || "/images/default-movie.jpg"}
          alt={movie.title}
          className="w-full h-full object-cover rounded-t-xl"
          onError={handleImageError}
        />
        {/* Movie Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 text-center">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-yellow-500">
          <Star size={18} fill="currentColor" />
          <span className="text-sm font-semibold">
            {movie.rating ? movie.rating.toFixed(1) : "N/A"}/5
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
