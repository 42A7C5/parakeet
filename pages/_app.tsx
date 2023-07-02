/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import Link from 'next/link'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import { loadStarsPreset } from 'tsparticles-preset-stars'
import Script from 'next/script'
import 'atropos/css'

export default function App({ Component, pageProps }: AppProps) {
	let { asPath } = useRouter()
	let [logoSrc, setLogoSrc] = useState('/logo.png')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			var r = document.querySelector(':root') as any

			if (window.localStorage.customThemeWhite) {
				r.style.setProperty('--text', window.localStorage.customThemeWhite)
			}

			if (window.localStorage.customThemePrimary) {
				r.style.setProperty('--primary', window.localStorage.customThemePrimary)
				r.style.setProperty(
					'--gradientPrimary',
					window.localStorage.customThemePrimary
				)
			}

			if (window.localStorage.customThemeSecondary) {
				r.style.setProperty(
					'--secondary',
					window.localStorage.customThemeSecondary
				)
				r.style.setProperty(
					'--gradientSecondary',
					window.localStorage.customThemeSecondary
				)
			}

			if (window.localStorage.customThemeBackground) {
				r.style.setProperty(
					'--background',
					window.localStorage.customThemeBackground
				)
			}

			if (window.localStorage.customThemeLogo) {
				setLogoSrc(window.localStorage.customThemeLogo)
			}
		}
	})

	const particlesInit = useCallback(async (engine: any) => {
		await loadStarsPreset(engine)
	}, [])

	let router = useRouter()

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
				options={{ preset: 'stars', background: { opacity: 0 } }}
				init={particlesInit}
			/>
			{!(router.pathname.endsWith('/play/') || router.pathname.endsWith('/play')) && <nav>
				<Link href={'/'}>
					<h1 style={{ verticalAlign: 'middle', color: 'var(--text)' }} className='navTitle'>
						<img src={logoSrc} alt="Parakeet logo" height={70} className='navLogo' /> <span className='navTitleText'>Parakeet</span>
					</h1>
				</Link>
				<h2
					className='navLinks'
					style={{
						paddingRight: '20px',
						verticalAlign: 'middle',
						color: 'var(--text)',
					}}
				>
					<Link href={'/'}>
						<span className='material-symbols-outlined'>play_circle</span>
					</Link>
					<Link href={'/settings'}>
						<span className='material-symbols-outlined'>settings</span>
					</Link>
					<Link href={'/dev'}>
						<span className='material-symbols-outlined'>code</span>
					</Link>
				</h2>
			</nav>}
			<Component {...pageProps} />
			<svg width="0" height="0"><filter id="blur" width="300%" height="300%" x="-0.75" y="-0.75" colorInterpolationFilters="sRGB"><feOffset in="SourceGraphic" result="source-copy"></feOffset><feColorMatrix in="source-copy" type="saturate" values="3" result="saturated-copy"></feColorMatrix><feColorMatrix in="saturated-copy" type="matrix" values="1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     33 33 33 101 -132" result="bright-colors"></feColorMatrix><feMorphology in="bright-colors" operator="dilate" radius="10" result="spread"></feMorphology><feGaussianBlur in="spread" stdDeviation="30" result="ambilight-light"></feGaussianBlur><feOffset in="SourceGraphic" result="source"></feOffset><feComposite in="source" in2="ambilight-light" operator="over"></feComposite></filter></svg>
		</>
	)
}
