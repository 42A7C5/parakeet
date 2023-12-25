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
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import 'atropos/css'
import { initializeApp } from 'firebase/app'
import Link from 'next/link'

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
	let [profilePicture, setProfilePicture] = useState<string>('/interface/default.png')
	let [user, setUser] = useState<any>()

	useMemo(async () => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
				if (user.photoURL) {
					setProfilePicture(user.photoURL)
				}
			}
		})
	}, [])

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
			<dialog className='modal'>
				<span className='material-symbols-outlined modalCloseButton' onClick={() => {
					let modal = document.querySelector('.modal') as HTMLDialogElement
					modal.close()
				}}>close</span>
				{!user && (
					<p>Loading...</p>
				)}
				{user && (
					<>
						<h1 style={{ fontSize: '1.4em', position: 'absolute', top: 0, left: '15px' }}>
							<img src={profilePicture} alt="User profile picture" style={{ borderRadius: '50%', height: '40px', verticalAlign: 'middle', marginRight: '10px' }} />
							{user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}
						</h1>
						<Link
							href={`/`}
							onClick={() => {
								let modal = document.querySelector('.modal') as HTMLDialogElement
								modal.close()
							}}
						>
							<span
								style={{
									color: "var(--text)",
									fontSize: '1.5rem',
									textDecoration: "underline",
									padding: "20px",
								}}
							>
								Return Home
							</span>
						</Link>
						<br />
						{user.isAnonymous && <Link
							href={"#"}
							onClick={async (e) => {
								e.preventDefault();
								let user = await signInWithPopup(
									getAuth(),
									new GoogleAuthProvider()
								);
								setUser(user.user);
							}}
						>
							<span
								style={{
									color: "var(--text)",
									textDecoration: "underline",
									fontSize: "1.5rem",
								}}
							>
								Sign in with Google
							</span>
						</Link>}
						{!user.isAnonymous && <>
							<Link
								href={`#`}
								onClick={(e) => {
									e.preventDefault();
									updateProfile(user, {
										displayName: prompt("Enter your new display name:"),
									});
								}}
							>
								<span
									style={{
										color: "var(--text)",
										textDecoration: "underline",
										padding: "20px",
									}}
								>
									Change Name
								</span>
							</Link>
							<Link
								href={`#`}
								onClick={(e) => {
									e.preventDefault();
									updateProfile(user, {
										photoURL: prompt("Enter your new profile picture URL:"),
									});
								}}
							>
								<span
									style={{
										color: "var(--text)",
										textDecoration: "underline",
										padding: "20px",
									}}
								>
									Change Profile Picture
								</span>
							</Link>
							<Link
								href={`#`}
								onClick={(e) => {
									e.preventDefault();
									signOut(getAuth())
									setUser(null)
								}}
							>
								<span
									style={{
										color: "var(--text)",
										textDecoration: "underline",
										padding: "20px",
									}}
								>
									Log Out
								</span>
							</Link>
						</>}
					</>
				)}
			</dialog>
			<div className='app'>
				<a className='navSettings' href={'#'} onClick={() => {
					let modal = document.querySelector('.modal') as HTMLDialogElement
					modal.showModal()
				}}>
					<span className='material-symbols-outlined'>menu</span>
				</a>
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
		</>
	)
}
