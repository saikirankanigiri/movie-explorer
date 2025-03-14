// types.ts

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string; // ✅ Ensure URLs point to the correct images
  releaseDate: string;
  rating: number;
  genre: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  // Add any additional fields as needed
}
