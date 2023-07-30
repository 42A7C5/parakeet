/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Particles from 'react-tsparticles'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import Script from 'next/script'
import 'atropos/css'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import $ from 'jquery'

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

	useEffect(() => {
		if (typeof window !== 'undefined') {
			var r = document.querySelector(':root') as any

			if (window.localStorage.customThemeWhite) {
				r.style.setProperty('--text', window.localStorage.customThemeWhite)
			}

			if (window.localStorage.customThemePrimary) {
				r.style.setProperty('--primary', window.localStorage.customThemePrimary)
			}

			if (window.localStorage.customThemeSecondary) {
				r.style.setProperty('--secondary', window.localStorage.customThemeSecondary)
			}

			if (window.localStorage.customThemeBackground) {
				r.style.setProperty('--background', window.localStorage.customThemeBackground)
			}
		}
	})

	const particlesInit = useCallback(async (engine: any) => {
		await loadStarsPreset(engine)
	}, [])

	let router = useRouter()
	let [gameID, setGameID] = useState('wizards')

	useEffect(() => {
		if (typeof window !== 'undefined' && router.pathname.includes('/play')) {
			setGameID(window.location.href.split('/play/')[1])
			setTimeout(() => {
				$('.app').fadeIn(1000)
				$('.loading').fadeOut(2000)
			}, 1000)
		} else {
			setTimeout(() => {
				$('.app').fadeIn(1000)
				$('.loading').fadeOut(500)
			}, 1000)
		}
	})

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
			<Particles
				id='tsparticles'
				options={{ preset: 'stars', background: { opacity: 0 }, zLayers: 1 }}
				init={particlesInit}
			/>
			<div
				className='loading'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					background: router.pathname.includes('/play') ? `url(${require(`../apps/${gameID}.json`).art.background}) center center fixed no-repeat` : 'url(/worlds.png), linear-gradient(#91EED7, #2AD1D9)',
					// linear-gradient(#91EED7, #2AD1D9)
					backgroundSize: 'cover',
					color: 'white',
					top: 0,
					left: 0,
					zIndex: 0
				}}
			>
				{!router.pathname.includes('/play') && <img className='spin' src="/logo.png" style={{ height: '370px', width: '370px' }} />}
				{router.pathname.includes('/play') && <img src={require(`../apps/${gameID}.json`).art.logo} style={{ width: '370px' }} />}
				{router.pathname.includes('/play') && <div style={{
					position: 'fixed',
					top: '20px',
					left: '20px',
				}}>
					<img src="/logo.png" className='spin' style={{ height: '80px', verticalAlign: 'middle' }} />
				</div>}
			</div>
			<div className='app' style={{ display: 'none' }}>
				<Component {...pageProps} />
			</div>
			<svg width="0" height="0"><filter id="blur" width="300%" height="300%" x="-0.75" y="-0.75" colorInterpolationFilters="sRGB"><feOffset in="SourceGraphic" result="source-copy"></feOffset><feColorMatrix in="source-copy" type="saturate" values="3" result="saturated-copy"></feColorMatrix><feColorMatrix in="saturated-copy" type="matrix" values="1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     33 33 33 101 -132" result="bright-colors"></feColorMatrix><feMorphology in="bright-colors" operator="dilate" radius="10" result="spread"></feMorphology><feGaussianBlur in="spread" stdDeviation="30" result="ambilight-light"></feGaussianBlur><feOffset in="SourceGraphic" result="source"></feOffset><feComposite in="source" in2="ambilight-light" operator="over"></feComposite></filter></svg>
		</>
	)
}
