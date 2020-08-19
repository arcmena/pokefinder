import React from 'react';
import fetch from 'node-fetch';

const Pokemon = ({ pokemon }) => (
  <div>
    <h2>{pokemon.name}</h2>
    <img src={pokemon.sprites.front_default} alt="Pokemon" />
  </div>
);

export const getStaticProps = async ({ params }) => {
  console.log(params);
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    // eslint-disable-next-line consistent-return
    .then((data) => {
      if (data.ok) return data.json();
    })
    .then((object) => object)
    .catch((error) => console.error(error));
  return {
    props: {
      pokemon,
    },
  };
};

export const getStaticPaths = async () => {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/1')
    // eslint-disable-next-line consistent-return
    .then((data) => {
      if (data.ok) return data.json();
    })
    .then((object) => object.pokemon_entries)
    .catch((error) => console.error(error));
  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.entry_number.toString(),
      },
    })),
    fallback: false,
  };
};

export default Pokemon;
