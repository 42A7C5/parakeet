/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { initializeApp } from 'firebase/app'

export default function App({ Component, pageProps }: AppProps) {
	const { asPath } = useRouter()

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
		await loadFull(engine)
	}, [])

	return (
		<>
			<Head>
				<title>Parakeet Games</title>
			</Head>
			<Particles id='tsparticles' url='/particles.json' init={particlesInit} />
			<Component {...pageProps} />
		</>
	)
}
