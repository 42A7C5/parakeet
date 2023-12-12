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
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk'
import { Avatar } from '@readyplayerme/visage'
import 'atropos/css'
import { initializeApp } from 'firebase/app'
import Link from 'next/link'

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
	let [avatarCreated, setAvatarCreated] = useState<string>('https://readyplayerme.github.io/visage/male.glb')
	let [user, setUser] = useState<any>()

	useMemo(async () => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
				if (user.photoURL) {
					setAvatarCreated(user.photoURL)
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
			<dialog className='settingsModal modal'>
				<span className='material-symbols-outlined modalCloseButton' onClick={() => {
					let settingsModal = document.querySelector('.settingsModal') as HTMLDialogElement
					settingsModal.close()
				}}>close</span>
				{!user && (
					<p>Loading...</p>
				)}
				{user && (
					<>
						<Avatar style={{ height: '300px' }} modelSrc={avatarCreated} animationSrc={'/male-idle.glb'} />
						<h1 style={{ fontSize: '2.0em' }}>{user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}</h1>
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
									let settingsModal = document.querySelector('.settingsModal') as HTMLDialogElement
									settingsModal.close()
									let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
									avatarModal.showModal()
								}}
							>
								<span
									style={{
										color: "var(--text)",
										textDecoration: "underline",
										padding: "20px",
									}}
								>
									Change Avatar
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
			<dialog className='avatarModal modal'>
				{!user && (
					<p>Loading...</p>
				)}
				{user && <div className='avatarBuilder'><AvatarCreator subdomain="parakeet" onAvatarExported={(url) => {
					setAvatarCreated(url)
					updateProfile(user, {
						photoURL: url,
					})
					let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
					avatarModal.close()
					let settingsModal = document.querySelector('.settingsModal') as HTMLDialogElement
					settingsModal.showModal()
				}} /></div>}
			</dialog>
			<div className='app'>
				<a className='navSettings' href={'#'} onClick={() => {
						let settingsModal = document.querySelector('.settingsModal') as HTMLDialogElement
						settingsModal.showModal()
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
