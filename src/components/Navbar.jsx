import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
         Movie Explorer
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/favorites">
          ❤️ Favorites
          <span className="favorite-count">
            {favorites.length}
          </span>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;