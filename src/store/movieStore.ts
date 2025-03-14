import create from "zustand";
import { Movie } from "../types";

interface MovieState {
  movies: Movie[];
  loading: boolean;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  sortBy: "title" | "rating" | "releaseDate";
  selectedGenres: string[];
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: "title" | "rating" | "releaseDate") => void;
  setSelectedGenres: (genres: string[]) => void;
  setCurrentPage: (page: number) => void;
}

const movies: Movie[] = [
  { id: 1, title: "Avengers: Endgame", posterUrl: "/images/avengers download (1).jpg", rating: 4.9, releaseDate: "2019-04-26", overview: "The Avengers assemble for one final battle.", genre: ["Action", "Sci-Fi"] },
  { id: 2, title: "Pirates of the Caribbean", posterUrl: "/images/jack sparrow download (1).jpg", rating: 4.7, releaseDate: "2003-07-09", overview: "Captain Jack Sparrow's legendary adventure.", genre: ["Adventure", "Fantasy"] },
  { id: 3, title: "Parasite", posterUrl: "/images/parasite.jpg", rating: 4.8, releaseDate: "2019-05-30", overview: "A poor family infiltrates a wealthy household.", genre: ["Thriller", "Drama"] },
  { id: 4, title: "The Dark Knight", posterUrl: "/images/The Dark Knight.jpg", rating: 4.9, releaseDate: "2008-07-18", overview: "Batman vs The Joker in Gotham.", genre: ["Action", "Crime"] },
  { id: 5, title: "The Godfather", posterUrl: "/images/The god father.jpg", rating: 4.8, releaseDate: "1972-03-24", overview: "Rise of the Corleone crime family.", genre: ["Crime", "Drama"] },
  { id: 6, title: "The Lion King", posterUrl: "/images/the-lion-king.jpg", rating: 4.7, releaseDate: "2019-07-19", overview: "A young lion's journey to reclaim his throne.", genre: ["Animation", "Adventure"] },
  { id: 7, title: "Venom: Let There Be Carnage", posterUrl: "/images/Venom download (1).jpg", rating: 4.5, releaseDate: "2021-10-01", overview: "Venom and Eddie Brock face Carnage.", genre: ["Action", "Sci-Fi"] },
  { id: 8, title: "Inception", posterUrl: "/images/Inception.jpg", rating: 4.8, releaseDate: "2010-07-16", overview: "A dream-heist thriller by Christopher Nolan.", genre: ["Sci-Fi", "Action"] },
  { id: 9, title: "Interstellar", posterUrl: "/images/Interstellar.jpg", rating: 4.7, releaseDate: "2014-11-07", overview: "A journey through space and time.", genre: ["Sci-Fi", "Drama"] },
  { id: 10, title: "King Kong", posterUrl: "/images/King kong download (1).jpg", rating: 4.6, releaseDate: "2005-12-14", overview: "The giant ape returns.", genre: ["Action", "Adventure"] }
];

export const useMovieStore = create<MovieState>((set) => ({
  movies,
  loading: false,
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 8, // ✅ Set to 8 movies per page
  sortBy: "title",
  selectedGenres: [],
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSelectedGenres: (genres) => set({ selectedGenres: genres, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
