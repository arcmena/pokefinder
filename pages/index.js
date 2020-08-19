import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch';

export const getStaticProps = async () => {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/1/')
    // eslint-disable-next-line consistent-return
    .then((data) => {
      if (data.ok) return data.json();
    })
    .then((object) => object.pokemon_entries)
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
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>Pokedex - NextJS</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            <Link href={`/pokemon/${pokemon.entry_number}`}>
              <a>{pokemon.pokemon_species.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
);

export default Home;
