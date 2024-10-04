import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { GET_ALL_POKEMONS } from "../graphql/queries";

interface PokemonSprite {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonsprites: PokemonSprite[];
}

interface Data {
  pokemon_v2_pokemon: Pokemon[];
}

const PokemonList: React.FC = () => {
  const { loading, error, data } = useQuery<Data>(GET_ALL_POKEMONS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredPokemons = data?.pokemon_v2_pokemon.filter(
    (pokemon) =>
      searchType === "name"
        ? pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        : pokemon.id.toString() === searchTerm 
  );

  return (
    <div className="bg-All-Container">
      <div className="header-pokedesk">
        <img
          src="https://i.ibb.co/8mKFxk1/Captura-de-pantalla-2024-10-04-a-la-s-10-39-56-a-m.png"
          alt="Pokédex Logo"
          className="pokedex-logo"
        />
        <h1>Pokédex</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setIsModalOpen(true)}>#</button>
      </div>

      {isModalOpen && (
        <div className="modal" ref={modalRef}>
          <h2 className="text-modal">Sort by:</h2>
          <div className="inputs_Container">
            <div className="number_Container">
              <label>
                <input
                  type="radio"
                  name="searchType"
                  value="number"
                  checked={searchType === "number"}
                  onChange={() => setSearchType("number")}
                />
                Number
              </label>
            </div>
            <div className="name_Container">
              <label>
                <input
                  type="radio"
                  name="searchType"
                  value="name"
                  checked={searchType === "name"}
                  onChange={() => setSearchType("name")}
                />
                Name
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="cont">
        <ul className="container_All_cards">
          {filteredPokemons?.map((pokemon) => (
            <li className="container_card" key={pokemon.id}>
              <div className="card">
                {" "}
                <Link className="link_style" to={`/pokemon/${pokemon.id}`}>
                  <h2 className="text_id">#{pokemon.id}</h2>

                  <img
                    src={
                      pokemon.pokemon_v2_pokemonsprites[0]?.sprites.other[
                        "official-artwork"
                      ].front_default
                    }
                    alt={pokemon.name}
                  />
                  <span className="pokemon_card_name">{pokemon.name}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
