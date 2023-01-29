/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { readdirSync } from 'fs'
import { useState } from 'react'

export default function Home(props: any) {
	let [searchTerm, setSearchTerm] = useState<string>('')

	return (
		<>
			<Head>
				<title>Play | Parakeet Games</title>
			</Head>
			<input type="text" placeholder='Search' style={{ width: '30%', margin: '20px', padding: '10px', borderRadius: '16px', border: '3px solid white', boxShadow: '0 0 10px white' }} onChange={(e) => {
				setSearchTerm(e.target.value)
			}} />
			<div className={'gameList'}>
				{props.games.map((game: any) => {
					if (game.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == '') return <Link key={game.id} href={`/play/${game.id}`}>
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
							{game.art.emblem && (
								<img
									className='game-emblemart'
									src={game.art.emblem}
									data-atropos-offset='5'
									alt=''
								/>
							)}
							<img
								className='game-logoart'
								data-atropos-offset='10'
								src={game.art.logo}
								alt={game.name}
							/>
						</Atropos>
					</Link>
				})}
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
