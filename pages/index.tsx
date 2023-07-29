/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { read, readdirSync } from 'fs'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	let [searchTerm, setSearchTerm] = useState<string>('')
	let [searchTags, setSearchTags] = useState<string[]>([])

	return (
		<>
			<Head>
				<title>Parakeet</title>
			</Head>
			<Carousel showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} className='gameotwcontainer hideMeOnMobile'>
				{props.picks.map((game: any) => (
					<Link key={game.id} href={`/game/${game.id}`}>
						<div
							className={'gameotw'}
							style={{
								background: `url(${game.art.background})`,
							}}
						>
							<div>
								<img
									src={game.art.logo}
									style={{ maxHeight: '120px', width: 'auto' }}
									alt={game.name}
								/>
							</div>
						</div>
					</Link>
				))}
			</Carousel>
			<br />
			<div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
				<input
					type='text'
					placeholder={'Search'}
					className='searchBar'
					onChange={(e) => {
						setSearchTerm(e.target.value.replace(/\s+/g, '').toLowerCase())
					}}
				/>
				<br />
				<div style={{ margin: '20px' }} className='hideMeOnMobile'>
					<button
						className='searchTag'
						onClick={() => {
							setSearchTags([])
						}}
						style={{
							backgroundColor:
								searchTags.length === 0 ? 'var(--secondary)' : 'var(--primary)',
						}}
					>
						all
					</button>
					{props.tags.map((tag: string) => {
						return (
							<button
								onClick={() => {
									let tagIndex = searchTags.indexOf(tag)
									if (tagIndex === -1) {
										setSearchTags([...searchTags, tag])
									} else {
										setSearchTags(searchTags.filter((tg) => tg !== tag))
									}
								}}
								key={tag.toString()}
								className='searchTag'
								style={{
									backgroundColor: searchTags.includes(tag)
										? 'var(--secondary)'
										: 'var(--primary)',
								}}
							>
								{tag}
							</button>
						)
					})}
				</div>
				<br />
			</div>
			<div className={'gameList'}>
				{props.games.map((game: any) => {
					if (
						(game.name.replace(/\s+/g, '').toLowerCase().includes(searchTerm) ||
							searchTerm == '') &&
						(searchTags.some((tag) => game.tags.includes(tag)) ||
							searchTags.length === 0)
					)
						return (
							<Link key={game.id} href={`/game/${game.id}`}>
								<Atropos
									key={game.id}
									className='game'
									highlight={false}
									shadow={false}
									rotateTouch={false}
								>
									<img
										className='game-bgart'
										src={game.art.background}
										alt=''
									/>
									{game.art.emblem && (
										<img
											className='game-emblemart'
											src={game.art.emblem}
											data-atropos-offset='5'
											alt=''
										/>
									)}
									{game.art.logo && (
										<img
											className='game-logoart'
											data-atropos-offset='10'
											src={game.art.logo}
											alt={game.name}
										/>
									)}
									{game.features && <div className='game-features' data-atropos-offset='0'>
										{/* {game.features.includes('featured') && <span className='material-symbols-outlined'>workspace_premium</span>} */}
										{/* {game.features.includes('new') && <span className='material-symbols-outlined'>release_alert</span>} */}
										{game.features.includes('local') && <span className='material-symbols-outlined'>weekend</span>}
										{game.features.includes('online') && <span className='material-symbols-outlined'>group</span>}
										{game.features.includes('keyboard') && <span className='material-symbols-outlined'>laptop_chromebook</span>}
										{game.features.includes('gamepad') && <span className='material-symbols-outlined'>sports_esports</span>}
										{game.features.includes('touch') && <span className='material-symbols-outlined'>phone_iphone</span>}
										{game.features.includes('realmoney') && <span className='material-symbols-outlined'>attach_money</span>}
										<br />
										{game.features.includes('new') && <span className='smallBoxText'>New to Parakeet</span>}
										{game.features.includes('featured') && <span className='smallBoxText'>Featured game</span>}
										{game.features.includes('ads') && <span className='smallBoxText'>Contains ads</span>}
									</div>}
								</Atropos>
							</Link>
						)
				})}
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
			featuredGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('new')) {
			newGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('ads')) {
			gamesWithAds.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('gamepad') && gameData.features.includes('touch')) {
			highSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('touch')) {
			mediumSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('keyboard')) {
			lowSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
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
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
				{
					...require('../apps/mazmorra.json'),
					id: 'mazmorra',
				},
				{
					...require('../apps/monstr.json'),
					id: 'monstr',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
				}
			],
		},
	}
}
