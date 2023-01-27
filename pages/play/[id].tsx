/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'
import { useMemo, useState } from 'react'
import Atropos from 'atropos/react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function GamePage(props: any) {
	let [user, setUser] = useState<any>()
	let [userStateDetermined, setUserStateDetermined] = useState<any>()

	useMemo(async () => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
			}
			setUserStateDetermined(true)
		})
	}, [])

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
					<img src={game.art.logo} height={120} />
					<h2>{game.dev}</h2>
					<button
						className='playbtn'
						style={{
							borderColor: game.color,
							boxShadow: `0 0 10px ${game.color}`,
						}}
						onClick={() => {
							if (document.fullscreenEnabled) {
								// ;(
								// 	document.querySelector(`#frame-${props.game.id}`) as any
								// ).style.display = 'block'
								document
									.querySelector(`#frame-${props.game.id}`)
									?.requestFullscreen()
								;(navigator as any).keyboard.lock()
							} else {
								window.location.href = game.frame
							}
						}}
					>
						Play
					</button>
				</div>
			</div>
			<iframe
				src={game.frame}
				id={`frame-${props.game.id}`}
				style={{
					width: '0',
					height: '0',
					position: 'fixed',
					bottom: '0',
					border: 'none',
					zIndex: 999,
				}}
			></iframe>
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
			game: { ...require(`../../apps/${params.id}.json`), id: params.id },
		},
	}
}

export default GamePage
