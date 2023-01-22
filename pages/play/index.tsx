/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { readdirSync } from 'fs'

export default function Home(props: any) {
	return (
		<>
			<Head>
				<title>Play | Parakeet Games</title>
			</Head>
			<div className={'gameList'}>
				{props.games.map((game: any) => (
					<Link key={game.id} href={`/play/${game.id}`}>
						<Atropos
							key={game.id}
							className='game'
							highlight={false}
							shadow={false}
							onClick={() => {
								new Audio('/launch.wav').play()
							}}
						>
							<img className='game-bgart' src={game.art.background} alt='' />
							{game.art.emblem && <img className='game-emblemart' src={game.art.emblem} data-atropos-offset='5' alt='' />}
							<img className='game-logoart' data-atropos-offset='10' src={game.art.logo} alt={game.name} />
						</Atropos>
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
			...require('../../apps/' + game),
			id: game.replace('.json', ''),
		})
	})
	return {
		props: {
			games,
		},
	}
}
