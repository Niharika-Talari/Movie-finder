import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch(trimmedQuery);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">
         Search
      </button>
    </form>
  );
}

export default SearchBar;