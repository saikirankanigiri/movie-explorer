import React from 'react';
import { Movie } from '../types';
import { X, Calendar, Star } from 'lucide-react';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <div className="flex items-center gap-4 mb-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span>{movie.rating}/5</span>
            </div>
          </div>
          <div className="mb-4">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};