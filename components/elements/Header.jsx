/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Logo from '../../public/images/logo.png';
import Menu from '../../public/images/icons/menu.svg';
import close from '../../public/images/icons/x.svg';

export default () => {
    const router = useRouter();
    const [menu, setMenu] = useState(router.pathid);
    const [sidebar, setSidebar] = useState(false);

    const setMenuClass = (e) => {
        const { id } = e.target;
        setSidebar(false);
        if (menu !== id) setMenu(id);
    };

    useEffect(() => {
        setMenu(router.pathname);
    }, [router.pathname]);

    const onSidebar = () => {
        if (sidebar) return setSidebar(false);
        return setSidebar(true);
    };

    return (
        <header>
            <div className="logo">
                <img src={Logo} alt="logotype" />
                <h1>Pokéfinder</h1>
            </div>
            <nav className="menu">
                <div className="navbar">
                    <span id="/" className={menu === '/' ? 'active' : ''} onClick={setMenuClass}>
                        Home
                    </span>
                    <span
                        id="/pokemon/[id]"
                        className={menu === '/pokemon/[id]' ? 'active' : ''}
                        onClick={setMenuClass}
                    >
                        Pokédex
                    </span>
                </div>

                <div className="sidebar">
                    <img src={Menu} alt="Menu" className="menu-icon" onClick={onSidebar} />
                </div>

                {sidebar ? (
                    <div className="side">
                        <img src={close} alt="close" onClick={onSidebar} />
                        <span id="/" className={menu === '/' ? 'active' : ''} onClick={setMenuClass}>
                            Home
                        </span>
                        <span
                            id="/pokemon/[id]"
                            className={menu === '/pokemon/[id]' ? 'active' : ''}
                            onClick={setMenuClass}
                        >
                            Pokédex
                        </span>
                    </div>
                ) : null}
            </nav>
        </header>
    );
};
