/****************************
© 2019-present Parakeet.Games. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import 'atropos/css'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export default function App({ Component, pageProps }: AppProps) {
	let { asPath } = useRouter()

	useMemo(() => {
		initializeApp({
			apiKey: 'AIzaSyCVRdvjxtTS5DV__if3-81t_fYp5GUod-U',
			authDomain: 'cloudark.parakeet.games',
			projectId: 'parakeetapi',
			storageBucket: 'parakeetapi.appspot.com',
			messagingSenderId: '163437557468',
			appId: '1:163437557468:web:ca1358397b5b9da133a619',
		})

		onAuthStateChanged(getAuth(), user => {
			if (!user) {
				signInAnonymously(getAuth())
			}
		})
	}, [])

	let router = useRouter()
	let [gameID, setGameID] = useState('wizards')

	return (
		<>
			<Script
				src='https://www.googletagmanager.com/gtag/js?id=G-SRKKML9PDX'
				strategy='afterInteractive'
			/>
			<Script id='google-analytics' strategy='afterInteractive'>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SRKKML9PDX');
        `}
			</Script>
			<Head>
				<title>Parakeet Games</title>
				<link rel='shortcut icon' href='/logo.png' type='image/x-icon' />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#cc10ad" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-title" content="Parakeet" />
				<meta name="msapplication-TileImage" content="/appicon.png" />
				<meta name="apple-touch-fullscreen" content="yes" />
				<meta name="description" content="Games that push the boundaries of the Web." />
				<meta name="title" content="Parakeet.Games" />
			</Head>
			<div className='app'>
				<div style={{
					position: 'absolute',
					top: '20px',
					left: '20px',
				}}>
					<img src="/logo.png" style={{ height: '80px', verticalAlign: 'middle' }} />
				</div>
				<AnimatePresence initial={false} mode="wait">
					<motion.div
						key={router.pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
					>
						<Component key={asPath} {...pageProps} />
					</motion.div>
				</AnimatePresence>
			</div>
			<svg width="0" height="0"><filter id="blur" width="300%" height="300%" x="-0.75" y="-0.75" colorInterpolationFilters="sRGB"><feOffset in="SourceGraphic" result="source-copy"></feOffset><feColorMatrix in="source-copy" type="saturate" values="3" result="saturated-copy"></feColorMatrix><feColorMatrix in="saturated-copy" type="matrix" values="1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     33 33 33 101 -132" result="bright-colors"></feColorMatrix><feMorphology in="bright-colors" operator="dilate" radius="10" result="spread"></feMorphology><feGaussianBlur in="spread" stdDeviation="30" result="ambilight-light"></feGaussianBlur><feOffset in="SourceGraphic" result="source"></feOffset><feComposite in="source" in2="ambilight-light" operator="over"></feComposite></filter></svg>
		</>
	)
}
