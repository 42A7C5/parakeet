/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { readdirSync } from 'fs'
import { v4 } from 'uuid'

import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	return (
		<>
			<div className='home'>
				<Carousel
					showStatus={false}
					showArrows={true}
					infiniteLoop={true}
					showThumbs={false}
					autoPlay={true}
					transitionTime={700}
					interval={5000}
					className='border-b-4 border-primary mb-6 mt-2'
				>
					<div
						className='flex justify-center items-center bg-cover cursor-pointer h-52 md:h-96'
						style={{
							background: `linear-gradient(var(--background), rgba(0, 0, 0, 0)), url(/assets/img/tiles/dragondungeon/background.png) center center`,
						}}
					>
						<Link href={`/game/dragondungeon`}>
							<div>
								<Image
									className='max-h-28 md:max-h-48'
									src={"/assets/img/tiles/dragondungeon/logo.png"}
									width={999}
									height={999}
									alt={"DragonDungeon"}
									priority
									quality={90}
								/>
								<h1 className='text-3xl'>August 9th, 2024</h1>
								<h2 className='text-2xl'>Click to learn more</h2>
							</div>
						</Link>
					</div>
					{props.picks.map((game: any) => (
						<Link key={game.id} href={`/game/${game.id}`}>
							<div
								className='flex justify-center items-center bg-cover cursor-pointer h-52 md:h-96'
								style={{
									background: `linear-gradient(var(--background), rgba(0, 0, 0, 0)), url(${game.art.background}) center center`,
								}}
							>
								<div>
									<Image
										className='max-h-28 md:max-h-48'
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
				<div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'}>
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
								<Link key={game.id} href={`/game/${game.id}`} className='relative hover:scale-105 transition-transform h-[300px] shadow-xl flex items-center justify-center'>
									{game.art.logo && <div className='absolute inset-0 flex items-center justify-center z-40'>
										<Image
											width={999}
											height={999}
											src={game.art.logo}
											alt={game.name}
											className='max-h-[60%] max-w-[60%] object-contain'
										/>
									</div>}
									{game.art.emblem && <div className='absolute inset-0 flex items-center justify-center z-30'>
										<Image
											width={999}
											height={999}
											src={game.art.emblem}
											alt=''
											className='max-h-[80%] max-w-[80%] object-contain'
										/>
									</div>}
									<Image
										className='w-full h-full object-cover rounded-md'
										width={999}
										height={999}
										src={game.art.background}
										blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0WHhgEwAE3wJFOVmJuQAAAABJRU5ErkJggg=='
										placeholder='blur'
										alt=''
									/>
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
					...require('../apps/mazmorra.json'),
					id: 'mazmorra',
				},
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
				{
					...require('../apps/cards.json'),
					id: 'cards',
				},
			],
		},
	}
}
