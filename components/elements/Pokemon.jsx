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

    return (
        <div>
            <Link href={`/pokemon/${name.toLowerCase()}`}>
                <a className="pokemon">
                    <img src={`/images/pokemons/${name.toLowerCase()}.jpg`} alt={name} />
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
