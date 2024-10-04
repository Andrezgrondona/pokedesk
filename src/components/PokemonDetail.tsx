import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightHanging,
  faRulerVertical,
  faArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import GET_POKEMON_DETAIL from "../graphql/queries";

// Mapeo de colores por tipo de Pokémon
const typeColors: { [key: string]: string } = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#78C850",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
};

// Función para obtener color basado en el tipo de Pokémon
const getColorByType = (type: string) => {
  return typeColors[type.toLowerCase()] || "#A8A878";
};

// Remplazo de nombres del base states
const statAbbreviations: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

// Función para obtener la abreviación de las estadísticas
const getStatAbbreviation = (statName: string) => {
  return statAbbreviations[statName.toLowerCase()] || statName.toUpperCase();
};

interface PokemonSprite {
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface FlavorText {
  flavor_text: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: FlavorText[];
  };
}

interface Data {
  pokemon_v2_pokemon_by_pk: Pokemon;
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<Data>(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id!) },
  });

  const navigate = useNavigate();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data?.pokemon_v2_pokemon_by_pk;

  const flavorText =
    pokemon?.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0]
      ?.flavor_text;

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.includes(pokemon?.name)) {
      favorites.push(pokemon?.name);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${pokemon?.name} has been added to favorites!`);
    } else {
      alert(`${pokemon?.name} is already in favorites.`);
    }
  };

  return (
    <div
      className="pokemon-detail-container"
      style={{
        backgroundColor: getColorByType(
          pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name || "normal"
        ),
      }}
    >
      <div className="pokemon-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <text className="title_detail">{pokemon?.name}</text>
        <span className="pokemon-id">
          #{pokemon?.id.toString().padStart(3, "0")}
        </span>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleAddToFavorites}
          style={{ cursor: "pointer", color: "white" }}
        />
      </div>

      <div className="pokemon-image">
        <img
          className="pokemon-img"
          src={
            pokemon?.pokemon_v2_pokemonsprites[0]?.sprites.other[
              "official-artwork"
            ].front_default
          }
          alt={pokemon?.name}
        />
      </div>

      <div className="container_info_details">
        <div className="container_details">
          <div className="pokemon-types">
            {pokemon?.pokemon_v2_pokemontypes.map((type) => (
              <span
                key={type.pokemon_v2_type.name}
                className={`type-badge ${type.pokemon_v2_type.name.toLowerCase()}`}
              >
                {type.pokemon_v2_type.name}
              </span>
            ))}
          </div>

          <div className="pokemon-about">
            <h2
              style={{
                color: getColorByType(
                  pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name ||
                    "normal"
                ),
              }}
            >
              About
            </h2>
            <div className="about-info">
              <div className="about-item">
                <p className="text_weight">
                  <FontAwesomeIcon icon={faWeightHanging} /> {pokemon?.weight}{" "}
                  kg
                </p>
                <p className="title_weight">
                  <strong>Weight</strong>
                </p>
              </div>
              <div className="about-item">
                <p className="text_weight">
                  <FontAwesomeIcon icon={faRulerVertical} /> {pokemon?.height} m
                </p>
                <p className="title_weight">
                  <strong>Height</strong>
                </p>
              </div>
              <div className="about-item">
                <p className="text_weight">
                  {pokemon?.pokemon_v2_pokemonabilities
                    .map((ability) => ability.pokemon_v2_ability.name)
                    .join(", ")}
                </p>
                <p className="title_weight">
                  <strong>Moves</strong>
                </p>
              </div>
            </div>
          </div>

          {flavorText && (
            <div className="pokemon-description">
              <p>{flavorText}</p>
            </div>
          )}

          <div className="pokemon-stats">
            <h2
              style={{
                color: getColorByType(
                  pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name ||
                    "normal"
                ),
              }}
            >
              Base Stats
            </h2>
            <div className="stats-list">
              {pokemon?.pokemon_v2_pokemonstats.map((stat) => (
                <div key={stat.pokemon_v2_stat.name} className="stat-item">
                  <span
                    style={{
                      width: "100px",
                      background: "none",
                      fontSize: "10px",
                      color: getColorByType(
                        pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type
                          .name || "normal"
                      ),
                    }}
                  >
                    {getStatAbbreviation(stat.pokemon_v2_stat.name)}
                  </span>
                  <span className="stat-number">
                    {stat.base_stat.toString().padStart(3, "0")}
                  </span>
                  <div className="stat-bar">
                    <div
                      className="stat-progress"
                      style={{
                        width: `${stat.base_stat}%`,
                        backgroundColor: getColorByType(
                          pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type
                            .name || "normal"
                        ),
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
