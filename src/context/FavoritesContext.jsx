import {
  createContext,
  useContext,
  useState
} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");

    return saved ? JSON.parse(saved) : [];
  });

  function addFavorite(movie) {
    setFavorites((previous) => {
      if (previous.some((item) => item.id === movie.id)) {
        return previous;
      }

      const updated = [...previous, movie];

      localStorage.setItem(
        "movieFavorites",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function removeFavorite(movieId) {
    setFavorites((previous) => {
      const updated = previous.filter(
        (movie) => movie.id !== movieId
      );

      localStorage.setItem(
        "movieFavorites",
        JSON.stringify(updated)
      );

      return updated;
    });
  }

  function isFavorite(movieId) {
    return favorites.some(
      (movie) => movie.id === movieId
    );
  }

  function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}