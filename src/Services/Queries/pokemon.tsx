import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      next
      results {
        id
        name
        image
        artwork
        dreamworld
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
        back_default
      }
      height
      weight
      stats {
        base_stat
        stat {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;
