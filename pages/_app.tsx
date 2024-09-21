/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import Link from 'next/link'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
	let { asPath } = useRouter()

	useMemo(() => {
		initializeApp({
			apiKey: "AIzaSyBq_GEsEXJMfG2K3DAehXSRiryfjs-zFKQ",
			authDomain: "parakeetdotgames.firebaseapp.com",
			projectId: "parakeetdotgames",
			storageBucket: "parakeetdotgames.appspot.com",
			messagingSenderId: "37719389159",
			appId: "1:37719389159:web:9fde7211661ab320488342",
			measurementId: "G-Z24FZ3HRR7"
		})

		onAuthStateChanged(getAuth(), user => {
			if (!user) {
				signInAnonymously(getAuth())
			}
		})
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
				<title>Parakeet</title>
				<link rel='shortcut icon' href='/logo.svg' type='image/svg+xml' />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#08CEEB" />
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
				<nav className='w-[92vw] mx-[4vw] md:w-[96vw] md:mx-[2vw] flex justify-space w-screen h-[6vh] items-center mt-6 sticky top-0'>
					<div className='flex-none'>
						<Link href='/'><Image height={50} width={50} src="/logo.svg" alt="Parakeet logo" className='mr-2 h-[50px] w-[50px] z-40 rounded-full object-cover inline' /></Link>
						<div className='md:hidden bg-surface rounded-full p-0.5 inline-block align-middle ml-2'>
							<Link href='/'><span style={{ color: router.asPath == '/' ? 'var(--primary)' : '' }} className="material-symbols-outlined p-2 hover:text-primary transition-colors md:hidden">near_me</span></Link>
							<Link href='/account'><span style={{ color: router.asPath == '/account' ? 'var(--primary)' : '' }} className="material-symbols-outlined p-2 hover:text-primary transition-colors md:hidden">person</span></Link>
							{/* <Link href='/developers'><span style={{ color: router.asPath == '/developers' ? 'var(--primary)' : '' }} className="material-symbols-outlined p-2 hover:text-primary transition-colors md:hidden">code</span></Link> */}
							<Link href='/about'><span style={{ color: router.asPath == '/about' ? 'var(--primary)' : '' }} className="material-symbols-outlined p-2 hover:text-primary transition-colors md:hidden">gamepad</span></Link>
						</div>
					</div>
					<div className="flex-auto hidden md:block"></div>
					<div className='hidden md:block'>
						<Link href='/' style={{ color: router.asPath == '/' ? 'var(--primary)' : '' }} className='p-3 m-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">near_me</span> Explore</Link>
						<Link href='/account' style={{ color: router.asPath == '/account' ? 'var(--primary)' : '' }} className='p-3 m-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">person</span> Account</Link>
						{/* <Link href='/developers' style={{ color: router.asPath == '/developers' ? 'var(--primary)' : '' }} className='p-3 m-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">code</span> Developers</Link> */}
						<Link href='/about' style={{ color: router.asPath == '/about' ? 'var(--primary)' : '' }} className='p-3 m-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">gamepad</span> About</Link>
					</div>
				</nav>
				<AnimatePresence initial={false} mode="wait">
					<motion.div
						key={router.pathname}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
					>
						<Component key={asPath} {...pageProps} />
					</motion.div>
				</AnimatePresence>
			</div>
		</>
	)
}
