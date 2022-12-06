import '../styles/globals.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Navbar.module.css'

export default function App({ Component, pageProps }: AppProps) {
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
