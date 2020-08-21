/* eslint-disable max-len */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
  const pad = (id) => {
    if (id <= 9) {
      return `#00${id}`;
    }
    if (id <= 99) {
      return `#0${id}`;
    }
    return `#${id}`;
  };

  // console.log(Dex.map((pokemon) => pokemon.name));

  return (
    <div className="container-index">
      <Head>
        <title>Pokéfinder</title>
      </Head>

      <main className="content">
        <h1>NATIONAL DEX</h1>

        <form>
          <div className="search-box">
            <input type="text" />
            <img src={SearchIcon} alt="search" />
          </div>
        </form>

        <section>
          {national.map((pokemon) => (
            <div key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.name.toLowerCase()}`}>
                <a className="pokemon">
                  <img src={`/images/pokemons/${pokemon.name.toLowerCase()}.jpg`} alt={pokemon.name} />
                  <span className="number">{pad(pokemon.id)}</span>
                  <span className="name">{pokemon.name}</span>
                  <div className="types">{pokemon.typeList.map((type) => type)}</div>
                </a>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
