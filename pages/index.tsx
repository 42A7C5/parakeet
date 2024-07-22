/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import Image from 'next/image'
import { readdirSync } from 'fs'
import { v4 } from 'uuid'

import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	return (
		<>
			<div className='home'>
				<Head>
					<title>Parakeet</title>
				</Head>
				<Carousel
					showStatus={false}
					showArrows={true}
					infiniteLoop={true}
					showThumbs={false}
					autoPlay={true}
					transitionTime={700}
					interval={5000}
					className='gameotwcontainer hideMeOnMobile'
				>
					{props.picks.map((game: any) => (
						<Link key={game.id} href={`/game/${game.id}`}>
							<div
								className={'gameotw'}
								style={{
									background: `linear-gradient(var(--background), rgba(0, 0, 0, 0)), url(${game.art.background}) center center`,
								}}
							>
								<div>
									<Image
										src={game.art.logo}
										width={999}
										height={999}
										alt={game.name}
										priority
										quality={90}
									/>
								</div>
							</div>
						</Link>
					))}
				</Carousel>
				<div className={'flex flex-wrap justify-evenly flex-column'}>
					{props.games.map((game: any) => {
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
								<Link key={game.id} href={`/game/${game.id}`}>
									<Atropos key={game.id} className='game' shadow={false} highlight={true} rotate={false} rotateTouch={false}>
										<Image
											className='game-bgart'
											width={999}
											height={999}
											src={game.art.background}
											blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0WHhgEwAE3wJFOVmJuQAAAABJRU5ErkJggg=='
											placeholder='blur'
											alt=''
										/>
										{game.art.emblem && (
											<Image
												className='game-emblemart'
												width={999}
												height={999}
												src={game.art.emblem}
												alt=''
											/>
										)}
										{game.art.logo && (
											<Image
												className='game-logoart'
												width={999}
												height={999}
												src={game.art.logo}
												alt={game.name}
												data-atropos-offset='2'
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

	return {
		props: {
			games,
			tags: uniqueTags,
			picks: [
				{
					...require('../apps/tpscramble.json'),
					id: 'tpscramble',
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
