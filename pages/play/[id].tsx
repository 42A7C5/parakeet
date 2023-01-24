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
			<iframe
				src={game.frame}
				id={`frame-${props.game.id}`}
				style={{
					width: '100vw',
					height: '100%',
					position: 'fixed',
					bottom: '0',
					border: 'none',
					zIndex: 999,
				}}
			></iframe>
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					borderRadius: '10px',
					backdropFilter: 'blur(10px)',
					zIndex: 99999,
					background: 'rgba(0, 0, 0, 0.3)',
					border: '1px solid white',
					padding: '15px',
					textAlign: 'center',
					boxShadow: '0 0 10px white'
				}}
			>
				<Link href={'/'}>
					<span
						className='material-symbols-outlined'
						style={{ color: 'white', fontSize: '25pt', padding: '5px' }}
					>
						home
					</span>
				</Link>
				<Link href={'#'}
					onClick={(e) => {
						e.preventDefault()
						document.querySelector('iframe')?.requestFullscreen()
						;(navigator as any).keyboard.lock()
					}}
				>
					<span
						className='material-symbols-outlined'
						style={{ color: 'white', fontSize: '25pt', padding: '5px' }}
					>
						fullscreen
					</span>
				</Link>
				<br />
				{/* <Link href={'/play/${props.game.id}/about'}><span className="material-symbols-outlined" style={{ color: 'white', padding: '10px', fontSize: '20pt' }}>info</span></Link> */}
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
			game: { ...require(`../../apps/${params.id}.json`), id: params.id },
		},
	}
}

export default GamePage
