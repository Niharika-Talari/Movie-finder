import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const favorite = isFavorite(movie.id);

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <article className="movie-card">

      <div className="poster-container">

        <img
          src={poster}
          alt={movie.title}
        />

        <button
          className={`favorite-button ${favorite ? "active" : ""}`}
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          {favorite ? "❤️" : "🤍"}
        </button>

      </div>

      <div className="movie-card-content">

        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>
            ⭐{" "}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>

          <span>{year}</span>
        </div>

        <Link
          to={`/movie/${movie.id}`}
          className="details-button"
        >
          View Details →
        </Link>

      </div>

    </article>
  );
}

export default MovieCard;