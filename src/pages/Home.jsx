import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import GenreFilter from "../components/GenreFilter";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import useFetch from "../hooks/useFetch";

import {
  getPopularMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const {
    data: popularData,
    loading: popularLoading,
    error: popularError
  } = useFetch(getPopularMovies, []);

  const {
    data: genreData,
    loading: genreLoading,
    error: genreError
  } = useFetch(getGenres, []);

  useEffect(() => {
    if (popularData) {
      setMovies(popularData.results);
    }
  }, [popularData]);

  async function handleSearch(query) {
    try {
      setSearchLoading(true);
      setSearchError("");
      setSearchMode(true);
      setSelectedGenre(null);

      const data = await searchMovies(query);

      setMovies(data.results);
    } catch (error) {
      setSearchError("Could not find movies. Please try again.");
      setMovies([]);
    } finally {
      setSearchLoading(false);
    }
  }

  async function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
    setSearchError("");

    if (genreId === null) {
      setSearchMode(false);

      if (popularData) {
        setMovies(popularData.results);
      }

      return;
    }

    try {
      setSearchLoading(true);
      setSearchMode(false);

      const data = await getMoviesByGenre(genreId);

      setMovies(data.results);
    } catch (error) {
      setSearchError(
        "Could not load movies for this genre."
      );
      setMovies([]);
    } finally {
      setSearchLoading(false);
    }
  }

  const loading =
    popularLoading ||
    genreLoading ||
    searchLoading;

  const error =
    popularError ||
    genreError ||
    searchError;

  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">

            <span className="hero-label">
              YOUR NEXT FAVORITE MOVIE
            </span>

            <h1>
              Discover Movies
              <br />
              You'll Love 
            </h1>

            <p>
              Search thousands of movies, discover
              new favorites, and keep track of the
              ones you love.
            </p>

            <SearchBar onSearch={handleSearch} />

          </div>
        </section>

        <section className="movies-section">

          <div className="section-header">
            <span className="section-label">
              EXPLORE
            </span>

            <h2>
              {searchMode
                ? "Search Results"
                : "Popular Movies"}
            </h2>
          </div>

          {!genreLoading &&
            genreData?.genres && (
              <GenreFilter
                genres={genreData.genres}
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
              />
            )}

          {loading && <Loader />}

          {!loading && error && (
            <ErrorMessage message={error} />
          )}

          {!loading && !error && (
            <MovieGrid movies={movies} />
          )}

        </section>
      </main>
    </>
  );
}

export default Home;