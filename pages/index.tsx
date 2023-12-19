/****************************
© 2019-present Parakeet.Games. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { readdirSync } from 'fs'

import { Carousel } from 'react-responsive-carousel'
import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth'
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk'
import { Avatar } from '@readyplayerme/visage'
import promotion1 from '../public/promotions/fen-naloxone-400x840.webp'
import promotion2 from '../public/promotions/imm-alex-belonging-400x840.webp'
import promotion3 from '../public/promotions/luv-love-lives-on-eng-400x840.webp'

export default function Home(props: any) {
	return (
		<>
			<div className='home'>
				<Head>
					<title>Parakeet</title>
				</Head>
				<nav>
					{/* <Link href={'/'}> */}
					<h1
						style={{ verticalAlign: 'middle', color: 'var(--text)' }}
						className='navTitle'
					>
						<img
							src={'/logo.png'}
							alt='Parakeet logo'
							height={80}
							className='navLogo'
						/>{' '}
						<span className='navTitleText'>
							<span
								style={{
									color: 'white',
									fontFamily: 'Unbounded',
									fontSize: '1.6em',
								}}
							>
								Parakeet
							</span>
							.games
						</span>
					</h1>
				</nav>

				<Carousel
					showStatus={false}
					showArrows={true}
					infiniteLoop={true}
					showThumbs={false}
					showIndicators={false}
					autoPlay={true}
					transitionTime={700}
					interval={5000}
					className='gameotwcontainer hideMeOnMobile'
				>
					<div
						className={'gameotw'}
						style={{
							background: `linear-gradient(rgba(0, 0, 0, 0), var(--primary)), url(/worlds.png) center center `,
						}}
					>
						<div>
							<h1>Welcome to Parakeet!</h1>
							<p>
								We set out to create an awesome place to find and play games
								made for the Web. But it&apos;s not about us.
								<br />
								Let&apos;s build an awesome community together and make Web
								games better for everyone.
							</p>
							<h2>❤️ The Parakeet Team</h2>
						</div>
					</div>
					{props.picks.map((game: any) => (
						<Link key={game.id} href={`/play/${game.id}`}>
							<div
								className={'gameotw'}
								style={{
									background: `linear-gradient(rgba(0, 0, 0, 0), var(--primary)), url(${game.art.background})`,
								}}
							>
								<div>
									<img
										src={game.art.logo}
										style={{ width: 'auto' }}
										alt={game.name}
									/>
								</div>
							</div>
						</Link>
					))}
				</Carousel>
				<div className={'gameList'}>
					{props.games.map((game: any) => {
						if (game.id === 'promotion') {
							return (
								<div className='game' key={game.id}>
									<p style={{ position: 'absolute', transform: 'translateX(-20px) translateY(-20px)', background: '#f9e300', zIndex: 9999, padding: '5px', borderRadius: '50%', color: 'var(--primary)', fontSize: '1.7rem' }}>ad</p>
									<img src={game.src} />
								</div>
							)
						}
						if (
							// (game.name
							// 	.replace(/\s+/g, '')
							// 	.toLowerCase()
							// 	.includes(searchTerm) ||
							// 	searchTerm == '') &&
							// (searchTags.some((tag) => game.tags.includes(tag)) ||
							// 	searchTags.length === 0)
							true
						)
							return (
								<Link key={game.id} href={`/play/${game.id}`}>
									<Atropos key={game.id} className='game' rotate={false}>
										<img
											className='game-bgart'
											src={game.art.background}
											alt=''
										/>
										{game.art.emblem && (
											<img
												className='game-emblemart'
												src={game.art.emblem}
												alt=''
											/>
										)}
										{game.art.logo && (
											<img
												className='game-logoart'
												src={game.art.logo}
												alt={game.name}
											/>
										)}
									</Atropos>
								</Link>
							)
					})}
				</div>
			</div>
		</>
	)
}

export async function getStaticProps() {
	let games: any[] = []
	let uniqueTags: String[] = []

	let featuredGames: any[] = []
	let newGames: any[] = []

	let highSupportedGames: any[] = []
	let mediumSupportedGames: any[] = []
	let lowSupportedGames: any[] = []

	let gamesWithAds: any[] = []

	let allGames = readdirSync('apps')

	for (let gameIndex = 0; gameIndex < allGames.length; gameIndex++) {
		const gameData = require('../apps/' + allGames[gameIndex])

		gameData.tags.forEach((tag: String) => {
			if (!uniqueTags.includes(tag)) uniqueTags.push(tag)
		})

		if (gameData.features.includes('featured')) {
			featuredGames.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}

		if (gameData.features.includes('new')) {
			newGames.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}

		if (gameData.features.includes('ads')) {
			gamesWithAds.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}

		if (
			gameData.features.includes('gamepad') &&
			gameData.features.includes('touch')
		) {
			highSupportedGames.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}

		if (gameData.features.includes('touch')) {
			mediumSupportedGames.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}

		if (gameData.features.includes('keyboard')) {
			lowSupportedGames.push({
				...gameData,
				id: allGames[gameIndex].replace('.json', ''),
			})
			continue
		}
	}

	games.push(...featuredGames)
	games.push(...newGames)
	games.push(...highSupportedGames)
	games.push(...mediumSupportedGames)
	games.push(...lowSupportedGames)
	games.push(...gamesWithAds)

	const allPromotions = [promotion1, promotion2, promotion3]
	for (let promotion of allPromotions) {
		games.splice(((games.length + 1) * Math.random()) | 0, 0, {
			id: 'promotion',
			src: promotion.src,
		})
	}

	return {
		props: {
			games,
			tags: uniqueTags,
			picks: [
				{
					...require('../apps/bashball.json'),
					id: 'bashball',
				},
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
				},
			],
		},
	}
}
