import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch';

import { Header } from '../../components';
import BackIcon from '../../public/images/icons/back.svg';

const Pokemon = ({ pokemon }) => (
  <div>
    <Head>
      <title>{pokemon.name}</title>
    </Head>
    <main className="pokemon-info">
      <Header />

      <Link href="/">
        <a>
          <img src={BackIcon} alt="back" />
        </a>
      </Link>
      <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={`/images/pokemons/${pokemon.name}.jpg`} alt={pokemon.name} />
    </main>
  </div>
);

export const getStaticProps = async ({ params }) => {
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
