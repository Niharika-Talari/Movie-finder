import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <h2> No movies found</h2>
        <p>Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}

export default MovieGrid;