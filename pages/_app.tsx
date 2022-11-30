import '../styles/globals.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import styles from '../styles/Navbar.module.css'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <header>
      <span className={styles.navTitle}>Parakeet</span>
      <span className={styles.navLinks}>
        <Link href={'/store'} className={styles.navLink}>🏬</Link>
        <Link href={'/account'} className={styles.navLink}>👦</Link>
        <Link href={'/about'} className={styles.navLink}>ℹ️</Link>
      </span>
    </header>
    <Component {...pageProps} />
  </>
}
