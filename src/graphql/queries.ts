import { gql } from "@apollo/client";

//Consulta para obtener todos los Pokémon
const GET_ALL_POKEMONS = gql`
  query getAllPokemons {
    pokemon_v2_pokemon(order_by: { name: asc }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export { GET_ALL_POKEMONS };

// Consulta para obtener detalles del Pokémon
const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } }
        ) {
          flavor_text
        }
      }
    }
  }
`;

export default GET_POKEMON_DETAIL;