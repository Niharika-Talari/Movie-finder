import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { FavoritesProvider } from "./context/FavoritesContext";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <FavoritesProvider>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

        </Routes>

      </FavoritesProvider>

    </BrowserRouter>
  );
}

export default App;