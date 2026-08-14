const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
};

export async function getPopularMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?page=1",
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

export async function getGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}