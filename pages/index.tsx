/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'
import { useMemo, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
			<header className={'nav'}>
				<h1>Parakeet</h1>
				{userStateDetermined && !user && (
					<h2 className={'navTitle'}>
						Why not{' '}
						<Link
							href={'/account'}
							onClick={() => new Audio('/page.wav').play()}
						>
							log in
						</Link>
						?
					</h2>
				)}
				{userStateDetermined && user && (
					<h2 className={'navTitle'}>
						Welcome back,{' '}
						<Link
							href={'/account'}
							onClick={() => new Audio('/page.wav').play()}
						>
							{user.displayName}
						</Link>
						!
					</h2>
				)}
			</header>
			<Carousel
				showThumbs={false}
				showStatus={false}
				showArrows={false}
				autoPlay={true}
			>
				{props.picks.map((game: any) => (
					<Link key={game.id} href={`/play/${game.id}`}>
						<div
							className={'gameotw'}
							onClick={() => {
								new Audio('/launch.wav').play()
							}}
							style={{
								background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${game.art.background}) center center no-repeat`,
							}}
						>
							<div>
								<img
									src={game.art.logo}
									style={{ height: '120px', width: 'auto' }}
									alt={game.name}
								/>
								<p
									style={{
										fontSize: '18pt',
										fontWeight: 'bold',
										color: 'white',
									}}
								>
									{game.reason}
								</p>
							</div>
						</div>
					</Link>
				))}
			</Carousel>
			<div className={'gameList'}>
				{props.games.map((game: any) => (
					<Link
						key={game.id}
						href={`/play/${game.id}`}
						style={{ flex: '300px' }}
					>
						<div
							className={'game'}
							onClick={() => {
								new Audio('/launch.wav').play()
							}}
							style={{
								background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.art.background}) center center no-repeat`,
								boxShadow: `0 0 30px ${game.color}`,
								border: `0px solid ${game.color}`,
							}}
						>
							<img src={game.art.logo} width={350} alt={game.name} />
						</div>
					</Link>
				))}
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
			games,
			picks: [
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
					reason: 'New spells make this magical arena shooter even more fun!',
				},
			],
		},
	}
}
