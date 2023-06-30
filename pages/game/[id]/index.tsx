/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'
import Atropos from 'atropos/react'

function GamePage(props: any) {

	let game = props.game

	return (
		<>
			<Head>
				<title>{`Play ${game.name} | Parakeet Games`}</title>
			</Head>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100vw',
					marginBottom: '30px'
				}}
			>
				<Atropos
					key={game.id}
					className='game hideMeOnMobile'
					highlight={false}
					shadow={false}
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
				</Atropos>
				<div style={{ textAlign: 'center' }}>
					{game.art.logo && <img src={game.art.logo} height={120} />}
					{!game.art.logo && <h1>{game.name}</h1>}
					<h2>{game.dev}</h2>
					<Link href={`/game/${game.id}/play`}>
						<button
							className='playbtn'
							style={{
								borderColor: `var(--text)`,
								boxShadow: `0 0 20px var(--text)`,
							}}
						>
							Play
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}

export async function getStaticPaths() {
	const allGames: any[] = []
	readdirSync('apps').forEach((game) => {
		allGames.push(game)
	})

	return {
		paths: allGames.map((game: any) => {
			return {
				params: {
					id: game.toString().replace('.json', ''),
				},
			}
		}),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: {
			game: { ...require(`../../../apps/${params.id}.json`), id: params.id },
		},
	}
}

export default GamePage
