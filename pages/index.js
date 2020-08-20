/* eslint-disable max-len */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch';

import { Header } from '../components';

export const getStaticProps = async () => {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/1/')
    // eslint-disable-next-line consistent-return
    .then((data) => {
      if (data.ok) return data.json();
    })
    .then((object) => {
      const lenght = object.pokemon_entries;
      return lenght.slice(0, 15);
    })
    .catch((error) => console.error(error));

  return {
    props: {
      pokemons,
    },
  };
};

const Home = ({ pokemons }) => (
  <div className="container">
    <Head>
      <title>Pokedex - NextJS</title>
    </Head>

    <main>
      <Header />
      <h1>Pokedex - NextJS</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number} className="preview-pokemon">
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>
                {pokemon.pokemon_species.name[0].toUpperCase() + pokemon.pokemon_species.name.slice(1)}
                <img src={`/images/pokemons/${pokemon.pokemon_species.name}.jpg`} alt={pokemon.pokemon_species.name} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);

export default Home;
