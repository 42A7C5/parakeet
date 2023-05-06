/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useCallback, useMemo } from 'react'
import Particles from 'react-tsparticles'
import { initializeApp } from 'firebase/app'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import Script from 'next/script'
import 'atropos/css'

export default function App({ Component, pageProps }: AppProps) {
	let { asPath } = useRouter()

	useMemo(() => {
		initializeApp({
			apiKey: 'AIzaSyCVRdvjxtTS5DV__if3-81t_fYp5GUod-U',
			authDomain: 'parakeetapi.firebaseapp.com',
			projectId: 'parakeetapi',
			storageBucket: 'parakeetapi.appspot.com',
			messagingSenderId: '163437557468',
			appId: '1:163437557468:web:ca1358397b5b9da133a619',
		})
	}, [])

	const particlesInit = useCallback(async (engine: any) => {
		await loadStarsPreset(engine)
	}, [])

	let router = useRouter()

	return (
		<>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-SRKKML9PDX"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SRKKML9PDX');
        `}
			</Script>
			<Head>
				<title>Parakeet Games</title>
				<link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
			</Head>
			<Particles
				id='tsparticles'
				options={{ preset: 'stars', background: { opacity: 0 } }}
				init={particlesInit}
			/>
			{!(router.pathname.endsWith('/play/') || router.pathname.endsWith('/play')) && <header className={'nav'}>
				<Link href={'/'}><h1 style={{ verticalAlign: 'middle', color: 'white' }}><img src="/logo.png" alt="Parakeet logo" height={70} style={{ verticalAlign: 'middle', marginRight: '20px' }} /> Parakeet</h1></Link>
				<h2
					className='navLinks'
					style={{
						paddingRight: '20px',
						verticalAlign: 'middle',
						color: 'white',
					}}
				>
					<Link href={'/'}>Play</Link>
					<Link href={'/account'}>Account</Link>
					<Link href={'/dev'}>Publish</Link>
				</h2>
			</header>}
			<AnimatePresence initial={false} mode={'wait'}>
				<motion.div
					key={asPath}
					variants={{
						out: {
							opacity: 0.3,
							transition: {
								duration: 0.2,
							},
						},
						in: {
							opacity: 1,
							transition: {
								duration: 0.2,
							},
						},
					}}
					animate='in'
					initial='out'
					exit='out'
				>
					<Component {...pageProps} />
				</motion.div>
			</AnimatePresence>
			<svg width="0" height="0"><filter id="blur" width="300%" height="300%" x="-0.75" y="-0.75" color-interpolation-filters="sRGB"><feOffset in="SourceGraphic" result="source-copy"></feOffset><feColorMatrix in="source-copy" type="saturate" values="3" result="saturated-copy"></feColorMatrix><feColorMatrix in="saturated-copy" type="matrix" values="1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     33 33 33 101 -132" result="bright-colors"></feColorMatrix><feMorphology in="bright-colors" operator="dilate" radius="10" result="spread"></feMorphology><feGaussianBlur in="spread" stdDeviation="30" result="ambilight-light"></feGaussianBlur><feOffset in="SourceGraphic" result="source"></feOffset><feComposite in="source" in2="ambilight-light" operator="over"></feComposite></filter></svg>
		</>
	)
}
