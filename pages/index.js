/* eslint-disable max-len */
import React from 'react';
import Head from 'next/head';

import { Pokemon } from '../components';

import Dex from '../pokemons.json';

import SearchIcon from '../public/images/icons/search.svg';

export const getStaticProps = async () => {
  const national = Dex.slice(0, 15);

  return {
    props: {
      national,
    },
  };
};

const Home = ({ national }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-index">
      <Head>
        <title>Pokéfinder</title>
      </Head>

      <main className="content">
        <h1>NATIONAL DEX</h1>

        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <input type="text" />
            <img src={SearchIcon} alt="search" />
          </div>
        </form>

        <section>
          {national.map((pokemon) => (
            <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.typeList} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
