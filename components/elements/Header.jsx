import React from 'react';

import Logo from '../../public/images/logo.png';

export default () => (
    <header>
        <div className="logo">
            <img src={Logo} alt="logotype" />
            <h1>Pokéfinder</h1>
        </div>
        <nav>
            <span>Home</span>
            <span>Pokédex</span>
        </nav>
    </header>
);
