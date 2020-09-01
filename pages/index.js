/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Select from 'react-select';

import { Pokemon } from '../components';

import Dex from '../pokemons.json';

import SearchIcon from '../public/images/icons/search.svg';

const options = [
    { value: 1, from: 0, to: 151, label: 'Generation I' },
    { value: 2, from: 151, to: 251, label: 'Generation II' },
    { value: 3, from: 251, to: 386, label: 'Generation III' },
    { value: 4, from: 386, to: 493, label: 'Generation IV' },
    { value: 5, from: 493, to: 649, label: 'Generation V' },
    { value: 6, from: 649, to: 721, label: 'Generation VI' },
    { value: 7, from: 721, to: 807, label: 'Generation VII' },
];

const Home = ({ initialDex, fullDex }) => {
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [selectedGen, setSelectedGen] = useState(null);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        // setSearchResult(fullDex.filter((pokemon) => pokemon.name.toLowerCase().match(value)));
        setSearchResult(fullDex.filter((pokemon) => pokemon.name.toLowerCase().indexOf(value) !== -1));
        setSearch(true);
    };

    useEffect(() => {
        if (!selectedGen) {
            return setSelectedGen(null);
        }
        setSearchResult(fullDex.slice(selectedGen.from, selectedGen.to));
        setSearch(true);
    }, [selectedGen]);

    return (
        <div className="container-index">
            <Head>
                <title>Pokéfinder</title>
            </Head>

            <main className="content">
                <h1>{selectedGen ? selectedGen.label : 'NATIONAL DEX'}</h1>

                <section className="inputs">
                    <div className="search-box">
                        <input type="text" placeholder="Search" value={searchValue} onChange={handleSearch} />
                        <img src={SearchIcon} alt="search" />
                    </div>

                    <Select
                        options={options}
                        id="select"
                        instanceId="select"
                        placeholder="Gen"
                        onChange={setSelectedGen}
                    />
                </section>

                <section className="pokemon-grid">
                    {search
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
