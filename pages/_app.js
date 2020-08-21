import React from 'react';

import { Header } from '../components';

import '../styles/root.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
