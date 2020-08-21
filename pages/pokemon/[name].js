import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch';

import Dex from '../../pokemons.json';

import BackIcon from '../../public/images/icons/back.svg';

const Pokemon = ({ pokemon }) => (
    <div className="container">
        <Head>
            <title>{pokemon.name}</title>
        </Head>

        <main className="pokemon-info">
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
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
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

export const getStaticPaths = async () => ({
    paths: Dex.map((pokemon) => ({
        params: {
            name: pokemon.name.toLowerCase(),
        },
    })),
    fallback: false,
});

export default Pokemon;
