import React from 'react';
import { useMovieStore } from '../store/movieStore';
import { Search, SlidersHorizontal } from 'lucide-react';

export const SearchAndFilter: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedGenres,
    setSelectedGenres,
  } = useMovieStore();

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
          <option value="releaseDate">Sort by Release Date</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={20} className="text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                if (selectedGenres.includes(genre)) {
                  setSelectedGenres(selectedGenres.filter((g) => g !== genre));
                } else {
                  setSelectedGenres([...selectedGenres, genre]);
                }
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedGenres.includes(genre)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};