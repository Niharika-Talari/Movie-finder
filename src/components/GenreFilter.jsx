function GenreFilter({
  genres,
  selectedGenre,
  onGenreChange
}) {
  return (
    <div className="genre-filter">

      <button
        className={
          selectedGenre === null
            ? "genre active"
            : "genre"
        }
        onClick={() => onGenreChange(null)}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          className={
            selectedGenre === genre.id
              ? "genre active"
              : "genre"
          }
          onClick={() => onGenreChange(genre.id)}
        >
          {genre.name}
        </button>
      ))}

    </div>
  );
}

export default GenreFilter;