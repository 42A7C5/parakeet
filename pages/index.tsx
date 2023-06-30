/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { readdirSync } from 'fs'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	let [searchTerm, setSearchTerm] = useState<string>('')
	let [searchTags, setSearchTags] = useState<string[]>([])

	return (
		<>
			<Head>
				<title>Play | Parakeet Games</title>
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
			<div style={{ textAlign: 'center' }}>
				<input
					type='text'
					placeholder='Search'
					className='searchBar'
					onChange={(e) => {
						setSearchTerm(e.target.value.replace(/\s+/g, '').toLowerCase())
					}}
				/>
				<br />
				<div style={{ margin: '20px' }}>
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
	readdirSync('apps').forEach((game) => {
		let gameData = require('../apps/' + game)
		games.push({
			...gameData,
			id: game.replace('.json', ''),
		})

		gameData.tags.forEach((tag: String) => {
			if (!uniqueTags.includes(tag)) uniqueTags.push(tag)
		})
	})
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
