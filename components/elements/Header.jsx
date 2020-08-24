import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Logo from '../../public/images/logo.png';

export default () => {
    const router = useRouter();
    const [menu, setMenu] = useState(router.pathname);

    const setMenuClass = (e) => {
        const { id } = e.target;
        if (menu !== id) setMenu(id);
    };

    useEffect(() => {
        setMenu(router.pathname);
    }, [router.pathname]);

    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="logotype" />
                <h1>Pokéfinder</h1>
            </div>
            <nav>
                <span id="/" className={menu === '/' ? 'active' : ''} onClick={setMenuClass}>
                    Home
                </span>
                <span
                    id="/pokemon/[name]"
                    className={menu === '/pokemon/[name]' ? 'active' : ''}
                    onClick={setMenuClass}
                >
                    Pokédex
                </span>
            </nav>
        </header>
    );
};
