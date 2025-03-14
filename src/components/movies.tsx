// src/components/Movies.tsx
import React from "react";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination"; // ✅ Import Pagination component
import { Movie } from "../types";

const Movies: React.FC = () => {
  const { movies, currentPage, itemsPerPage, setCurrentPage } = useMovieStore();

  // ✅ Get total pages
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // ✅ Get the movies for the current page
  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 🎥 Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedMovies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => {}} />
        ))}
      </div>

      {/* 📜 Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default Movies;
