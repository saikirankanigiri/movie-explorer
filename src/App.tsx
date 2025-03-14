import React, { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Film, ArrowUp } from "lucide-react";
import { useMovieStore } from "./store/movieStore";
import { Auth } from "./components/Auth";
import { SearchAndFilter } from "./components/SearchAndFilter";
import MovieCard from "./components/MovieCard"; // ✅ Corrected Import
import { MovieModal } from "./components/MovieModal";
import Pagination from "./components/Pagination"; // ✅ Default export
import { Movie } from "./types";

const App: React.FC = () => {
  const {
    movies,
    searchQuery,
    currentPage,
    itemsPerPage,
    sortBy,
    selectedGenres,
    setCurrentPage,
  } = useMovieStore();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle Scroll-To-Top Button Visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Memoized Filtering & Sorting for Performance Optimization
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        const matchesSearch = movie.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesGenres =
          selectedGenres.length === 0 ||
          selectedGenres.some((genre) => movie.genre.includes(genre));
        return matchesSearch && matchesGenres;
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "rating") return b.rating - a.rating;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });
  }, [movies, searchQuery, selectedGenres, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = useMemo(
    () =>
      filteredMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredMovies, currentPage, itemsPerPage]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notifications */}
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film size={24} className="text-blue-500" />
            <h1 className="text-2xl font-bold">Movie Explorer</h1>
          </div>
          <Auth />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchAndFilter />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)} // ✅ Corrected Type
            />
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;
