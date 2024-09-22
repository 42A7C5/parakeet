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
			<div>
				<Carousel
					showStatus={false}
					showArrows={true}
					infiniteLoop={true}
					showThumbs={false}
					autoPlay={true}
					transitionTime={700}
					interval={5000}
					className='my-8 rounded-lg w-full'
				>
					{props.picks.map((game: any) => (
						<div key={game.id} className='w-[92vw] ml-[4vw] md:w-[96vw] md:ml-[2vw]'>
							<Link href={`/game/${game.id}`}>
								<div
									className='feature flex rounded-lg w-full justify-center items-center !bg-cover cursor-pointer min-h-48 md:h-96'
									style={{
										background: `url(${game.art.background}) center center`,
									}}
								>
									<div>
										<Image
											className='transition-transform feature-logo max-h-20 md:max-h-48'
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
						</div>
					))}
				</Carousel>
				<div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 w-[92vw] ml-[4vw] md:w-[96vw] md:ml-[2vw]'}>
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
								<Link key={game.id} href={`/game/${game.id}`} className='card relative transition-transform h-[300px] shadow-xl flex items-center justify-center'>
									{game.art.logo && <div className='card-logo absolute transition-transform inset-0 flex items-center justify-center z-40'>
										<Image
											width={999}
											height={999}
											src={game.art.logo}
											alt={game.name}
											className='max-h-[50%] max-w-[50%] object-contain'
										/>
									</div>}
									{/* {game.art.emblem && <div className='absolute inset-0 flex items-center justify-center z-30'>
										<Image
											width={999}
											height={999}
											src={game.art.emblem}
											alt=''
											className='max-h-[80%] max-w-[80%] object-contain'
										/>
									</div>} */}
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
					...require('../apps/apocalypse-yesterday.json'),
					id: 'apocalypse-yesterday',
				},
				{
					...require('../apps/ai-lab-chat.json'),
					id: 'ai-lab-chat',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
				},
				{
					...require('../apps/house-of-cards.json'),
					id: 'house-of-cards',
				},
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
			],
		},
	}
}
