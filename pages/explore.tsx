/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'
import { useMemo, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	let [user, setUser] = useState<any>()
	let [userStateDetermined, setUserStateDetermined] = useState<any>()

	useMemo(async () => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
			}
			setUserStateDetermined(true)
		})
	}, [])

	return (
		<>
			<Head>
				<title>Explore | Parakeet Games</title>
			</Head>
			<div style={{ textAlign: 'center' }}>
			
			<br /><br />
			<Link href='/explore'>
				<button style={{ padding: '16px', borderRadius: '16px', border: '3px solid #00a1de', boxShadow: '0 0 20px #00a1de', fontWeight: 'bold', fontSize: '18pt', cursor: 'pointer' }}>See More Games</button>
			</Link>
			</div>
		</>
	)
}

export async function getStaticProps() {
	let games: any[] = []
	readdirSync('apps').forEach((game) => {
		games.push({
			...require('../apps/' + game),
			id: game.replace('.json', ''),
		})
	})
	return {
		props: {
			picks: [
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
					reason: 'New spells make this magical arena shooter even more fun!',
				},
				{
					...require('../apps/mapple.json'),
					id: 'mapple',
					reason: 'Can you guess the country?',
				},
				{
					...require('../apps/openttd.json'),
					id: 'openttd',
					reason: 'Classic transit sim comes to Parakeet, better than ever.',
				},
			],
		},
	}
}
