import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import useFetch from "../hooks/useFetch";
import { getMovieDetails } from "../services/movieApi";

import { useFavorites } from "../context/FavoritesContext";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";
const CAST_IMAGE_URL = "https://image.tmdb.org/t/p/w185";

function MovieDetails() {
  const { id } = useParams();

  const {
    data: movie,
    loading,
    error
  } = useFetch(
    () => getMovieDetails(id),
    [id]
  );

  const {
    isFavorite,
    toggleFavorite
  } = useFavorites();

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <ErrorMessage
          message={error || "Movie not found"}
        />
      </>
    );
  }

  const backdrop = movie.backdrop_path
    ? `${IMAGE_URL}${movie.backdrop_path}`
    : "";

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return (
    <>
      <Navbar />

      <main className="details-page">

        <section
          className="movie-hero"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(10,10,10,1),
                rgba(10,10,10,0.7),
                rgba(10,10,10,0.3)
              ),
              url(${backdrop})
            `
          }}
        >

          <div className="movie-details-content">

            <Link
              to="/"
              className="back-button"
            >
              ← Back
            </Link>

            <div className="details-layout">

              <img
                className="details-poster"
                src={
                  movie.poster_path
                    ? `${POSTER_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                alt={movie.title}
              />

              <div className="details-info">

                <h1>{movie.title}</h1>

                {movie.tagline && (
                  <p className="tagline">
                    "{movie.tagline}"
                  </p>
                )}

                <div className="details-meta">

                  <span>
                    ⭐{" "}
                    {movie.vote_average
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </span>

                  <span>
                    📅 {movie.release_date || "N/A"}
                  </span>

                  <span>
                    ⏱️ {movie.runtime || "N/A"} min
                  </span>

                </div>

                <div className="genres">

                  {movie.genres?.map((genre) => (
                    <span key={genre.id}>
                      {genre.name}
                    </span>
                  ))}

                </div>

                <p className="overview">
                  {movie.overview ||
                    "No overview available."}
                </p>

                <div className="details-actions">

                  <button
                    className="favorite-large"
                    onClick={() =>
                      toggleFavorite(movie)
                    }
                  >
                    {isFavorite(movie.id)
                      ? "❤️ Remove Favorite"
                      : "🤍 Add Favorite"}
                  </button>

                  {trailer && (
                    <a
                      className="trailer-button"
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      ▶ Watch Trailer
                    </a>
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>

        {movie.credits?.cast?.length > 0 && (
          <section className="cast-section">

            <span className="section-label">
              CAST
            </span>

            <h2>Top Cast</h2>

            <div className="cast-grid">

              {movie.credits.cast
                .slice(0, 8)
                .map((person) => (

                  <div
                    className="cast-card"
                    key={person.id}
                  >

                    <img
                      src={
                        person.profile_path
                          ? `${CAST_IMAGE_URL}${person.profile_path}`
                          : "https://via.placeholder.com/185x278?text=No+Photo"
                      }
                      alt={person.name}
                    />

                    <h3>{person.name}</h3>

                    <p>
                      {person.character}
                    </p>

                  </div>

                ))}

            </div>

          </section>
        )}

      </main>
    </>
  );
}

export default MovieDetails;