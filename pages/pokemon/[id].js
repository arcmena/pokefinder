/* eslint-disable consistent-return */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import fetch from 'node-fetch';

import Dex from '../../pokemons.json';

import BackIcon from '../../public/images/icons/back.svg';

const capitalFirstLetter = (name) => {
    return name[0].toUpperCase() + name.slice(1);
};

const filterLegend = (titles) => {
    const filtered = titles.filter((legend) => legend.language.name === 'en');
    return filtered[0].genus;
};

const filterDescription = (description) => {
    const filterLanguage = description.filter((language) => language.language.name === 'en');
    const filterVersion = filterLanguage.filter((version) => version.version.name === 'alpha-sapphire');
    return filterVersion[0].flavor_text;
};

const Pokemon = ({ specificDetails, generalDetails, evolutionTree }) => {
    console.log(specificDetails);
    console.log(generalDetails);
    console.log(evolutionTree);
    return (
        <div className="pokemon-info-container">
            <Head>
                <title>{capitalFirstLetter(specificDetails.name)}</title>
            </Head>

            <main className="pokemon-info">
                <Link href="/">
                    <a>
                        <img src={BackIcon} alt="back" />
                    </a>
                </Link>
                <section>
                    <img src={`/images/pokemons/${specificDetails.name}.jpg`} alt={specificDetails.name} />
                    <h2>{capitalFirstLetter(specificDetails.name)}</h2>
                    <div>
                        {generalDetails.types.map(({ type }) => (
                            <span key={type.name}>{capitalFirstLetter(type.name)}</span>
                        ))}
                    </div>
                </section>
                <section>
                    <h2>{filterLegend(specificDetails.genera)}</h2>
                    <p>{filterDescription(specificDetails.flavor_text_entries)}</p>
                    <span>{capitalFirstLetter(specificDetails.generation.name)} Pokémon</span>

                    <ul>
                        <li>
                            <span>Height </span>
                            {generalDetails.height}
                        </li>
                        <li>
                            <span>Weight </span>
                            {generalDetails.weight}
                        </li>
                        <li>
                            <span>Abilities</span>
                            {generalDetails.abilities.map((ability) => capitalFirstLetter(ability.ability.name))}
                        </li>
                    </ul>

                    <ul>
                        {generalDetails.stats.map((stat) => (
                            <li key={stat.stat.name}>
                                <span>
                                    {stat.stat.name.toUpperCase()}: {stat.base_stat}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export const getStaticProps = async ({ params }) => {
    const specific = encodeURI(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`);
    const general = encodeURI(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

    const specificDetails = await fetch(specific)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
        })
        // eslint-disable-next-line camelcase
        .then(({ id, name, generation, genera, evolution_chain, flavor_text_entries }) => {
            return { id, name, generation, genera, evolution_chain, flavor_text_entries };
        })
        .catch((error) => console.error(error));

    const generalDetails = await fetch(general)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
        })
        .then(({ abilities, height, weight, moves, types, stats }) => {
            return { abilities, height, weight, moves, types, stats };
        })
        .catch((error) => console.error(error));

    const evolutionTree = await fetch(specificDetails.evolution_chain.url)
        .then((data) => {
            if (data.ok) {
                return data.json();
            }
        })
        .then((object) => object)
        .catch((error) => console.error(error));
    return {
        props: {
            specificDetails,
            generalDetails,
            evolutionTree,
        },
    };
};

export const getStaticPaths = async () => ({
    paths: Dex.map((pokemon) => ({
        params: {
            id: pokemon.id.toString(),
        },
    })),
    fallback: false,
});

export default Pokemon;
