import React, { useEffect } from "react";

const FavoritePokemons: React.FC = () => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (name: string) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon added.</p>
      ) : (
        <ul>
          {favorites.map((name, index) => (
            <li key={index}>
              {name}
              <span
                onClick={() => handleRemoveFavorite(name)}
                style={{ cursor: "pointer", marginLeft: "10px", color: "red" }}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritePokemons;
