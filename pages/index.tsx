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
	let [searchTag, setSearchTag] = useState<string>('')

	return (
		<>
			<Head>
				<title>Play | Parakeet Games</title>
			</Head>
			<Carousel showStatus={false} showThumbs={false} showArrows={true} autoPlay={true} className='gameotwcontainer hideMeOnMobile'>
				{props.picks.map((game: any) => (
					<Link key={game.id} href={`/game/${game.id}`}>
						<div
							className={'gameotw'}
							style={{
								background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${game.art.background}) center center no-repeat`,
							}}
						>
							<div>
								<img
									src={game.art.logo}
									style={{ maxHeight: '120px', width: 'auto' }}
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
			<div style={{ textAlign: 'center' }}>
				<input type="text" placeholder='Search' style={{ width: '30%', margin: '20px', padding: '10px', borderRadius: '16px', border: '3px solid white', boxShadow: '0 0 10px white' }} onChange={(e) => {
					setSearchTerm(e.target.value)
				}} />
				<br />
				<div style={{ margin: '20px' }}>
					{props.tags.map((tag: String) => {
						return <button onClick={() => {
							if (searchTag !== tag.toString()) {
								setSearchTag(tag.toString())
							} else {
								setSearchTag('')
							}
						}} key={tag.toString()} style={{ margin: '10px', padding: '12px', borderRadius: '12px', border: 'none', boxShadow: '0 0 10px white', cursor: "pointer", background: searchTag == tag ? '#00a1de' : 'white', color: searchTag == tag ? "white" : "black", transition: 'all 0.2s ease' }}>{tag}</button>
					})}
				</div>
			</div>
			<div className={'gameList'}>
				{props.games.map((game: any) => {
					if ((game.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == '') && (game.tags.includes(searchTag) || searchTag == '')) return <Link key={game.id} href={`/game/${game.id}`}>
						<Atropos
							key={game.id}
							className='game'
							highlight={false}
							shadow={false}
							rotateTouch={false}
						>
							<img className='game-bgart' src={game.art.background} alt='' />
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
					...require('../apps/eggsim.json'),
					id: 'eggsim',
					reason: 'New Release | Become an egg and evade the bacon in this fun take on jumping games!',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
					reason: 'Battle for control against other dragons in this fun multiplayer game!',
				},
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
					reason: 'Step into a world of wonder and adventure in this exciting tactical 2D shooter!',
				},
			],
		},
	}
}
