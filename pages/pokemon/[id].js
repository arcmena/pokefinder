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
    const filterVersion = filterLanguage.filter((version) => version.version.name === 'ultra-sun' || 'ultra-moon');
    return filterVersion[0].flavor_text;
};

const padId = (dexnum) => {
    if (dexnum <= 9) {
        return `#00${dexnum}`;
    }
    if (dexnum <= 99) {
        return `#0${dexnum}`;
    }
    return `#${dexnum}`;
};

const Pokemon = ({ specificDetails, generalDetails, evolutionTree }) => {
    // console.log(specificDetails);
    // console.log(generalDetails);
    console.log(evolutionTree);
    return (
        <div className="pokemon-info-container">
            <Head>
                <title>{capitalFirstLetter(specificDetails.name)}</title>
            </Head>

            <div className="top-bar">
                <Link as="/" href="/">
                    <a>
                        <img src={BackIcon} alt="back" />
                    </a>
                </Link>
                <span>{padId(specificDetails.id)}</span>
            </div>

            <main className="pokemon-info">
                <section className="principal">
                    <img src={`/images/pokemons/${specificDetails.name}.jpg`} alt={specificDetails.name} />
                    <h2>{specificDetails.name.toUpperCase()}</h2>
                    <h4 className={capitalFirstLetter(generalDetails.types[0].type.name)}>
                        {filterLegend(specificDetails.genera)}
                    </h4>
                    <div className="types">
                        {generalDetails.types.map(({ type }) => (
                            <span key={type.name} className={`${capitalFirstLetter(type.name)}-background`}>
                                {capitalFirstLetter(type.name)}
                            </span>
                        ))}
                    </div>
                </section>
                <section className="secondary">
                    <p>{filterDescription(specificDetails.flavor_text_entries)}</p>

                    <table>
                        <tr>
                            <td>Height</td>
                            <td>{generalDetails.height}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{generalDetails.weight}</td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <th>Abilities</th>
                            {generalDetails.abilities.map((ability) => (
                                <td>{capitalFirstLetter(ability.ability.name)}</td>
                            ))}
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <th>Status</th>
                            <th>Value</th>
                        </tr>
                        {generalDetails.stats.map((stat) => (
                            <tr key={stat.stat.name}>
                                <td>{stat.stat.name.toUpperCase()}</td>
                                <td> {stat.base_stat}</td>
                            </tr>
                        ))}
                    </table>
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
