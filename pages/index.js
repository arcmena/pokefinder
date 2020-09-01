/* eslint-disable max-len */
import React, { useState } from 'react';
import Head from 'next/head';

import { Pokemon } from '../components';

import Dex from '../pokemons.json';

import SearchIcon from '../public/images/icons/search.svg';

const Home = ({ initialDex, fullDex }) => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        // setSearchResult(fullDex.filter((pokemon) => pokemon.name.toLowerCase().match(value)));
        setSearchResult(fullDex.filter((pokemon) => pokemon.name.toLowerCase().indexOf(value) !== -1));
    };

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

                <form onSubmit={handleSubmit} onChange={handleSearch}>
                    <div className="search-box">
                        <input type="text" placeholder="Search" />
                        <img src={SearchIcon} alt="search" value={search} />
                    </div>
                </form>

                <section>
                    {search !== ''
                        ? searchResult.map((pokemon) => (
                              <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.typeList} />
                          ))
                        : initialDex.map((pokemon) => (
                              <Pokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.typeList} />
                          ))}
                </section>
            </main>
        </div>
    );
};

export const getStaticProps = async () => {
    const initialDex = Dex.slice(0, 15);
    const fullDex = Dex;

    return {
        props: {
            initialDex,
            fullDex,
        },
    };
};

export default Home;
