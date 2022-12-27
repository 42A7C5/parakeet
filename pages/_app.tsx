/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import '../styles/globals.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Navbar.module.css'
import { useMemo } from 'react'
import { initializeApp } from 'firebase/app'

export default function App({ Component, pageProps }: AppProps) {
  useMemo(() => {
    initializeApp({
      apiKey: "AIzaSyCVRdvjxtTS5DV__if3-81t_fYp5GUod-U",
      authDomain: "parakeetapi.firebaseapp.com",
      projectId: "parakeetapi",
      storageBucket: "parakeetapi.appspot.com",
      messagingSenderId: "163437557468",
      appId: "1:163437557468:web:ca1358397b5b9da133a619"
    })
  }, [])

  return <>
    <Head>
      <title>Parakeet Games</title>
    </Head>
    <header>
      <span className={styles.navTitle}><Link href={'/'} className={styles.navTitleLink}>Parakeet</Link></span>
      <span className={styles.navLinks}>
        <Link href={'/store'} className={styles.navLink}><span className="material-symbols-outlined">storefront</span></Link>
        <Link href={'/account'} className={styles.navLink}><span className="material-symbols-outlined">person</span></Link>
        <Link href={'https://leaguexp.dev/parakeet'} className={styles.navLink}><span className="material-symbols-outlined">info</span></Link>
      </span>
    </header>
    <Component {...pageProps} />
  </>
}
