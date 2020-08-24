import React from 'react';
import Link from 'next/link';

export default ({ id, name, types }) => {
    const pad = (dexnum) => {
        if (dexnum <= 9) {
            return `#00${dexnum}`;
        }
        if (dexnum <= 99) {
            return `#0${dexnum}`;
        }
        return `#${dexnum}`;
    };

    const serializeName = (pokename) => {
        return pokename.toLowerCase().replace('.', '').replace(' ', '-').replace("'", '');
    };

    return (
        <div>
            <Link href={`/pokemon/${serializeName(name)}`}>
                <a className="pokemon">
                    <img src={`/images/pokemons/${serializeName(name)}.jpg`} alt={name} />
                    <small className="number">{pad(id)}</small>
                    <span className="name">{name}</span>
                    <div className="types">
                        {types.map((type) => (
                            <small className={`${type}`} key={type}>
                                {type}
                            </small>
                        ))}
                    </div>
                </a>
            </Link>
        </div>
    );
};
