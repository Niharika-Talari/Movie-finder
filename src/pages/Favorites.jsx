import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";

import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <Navbar />

      <main className="favorites-page">

        <div className="favorites-header">

          <span className="section-label">
            YOUR COLLECTION
          </span>

          <h1>❤️ My Favorites</h1>

          <p>
            {favorites.length} movie
            {favorites.length !== 1 ? "s" : ""} saved
          </p>

        </div>

        <MovieGrid movies={favorites} />

      </main>
    </>
  );
}

export default Favorites;