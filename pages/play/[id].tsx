/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'
import { useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function GamePage(props: any) {
	const frame = useRef()

	useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        let token = await user.getIdToken()
        if (typeof frame.current == 'object') {
          ;(frame.current as unknown as HTMLIFrameElement).src = `${props.game.frame}?user=${token}`
        }
      }
    })
	})

	return (
		<>
			<Head>
				<title>{`Play ${props.game.name} | Parakeet Games`}</title>
			</Head>
			<iframe
				id={`frame-${props.game.id}`}
				style={{
					height: '100vh',
					width: '100vw',
					border: 'none',
					zIndex: 9,
					position: 'fixed',
				}}
				// @ts-expect-error
				ref={frame}
			></iframe>
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					borderRadius: '10px',
					backdropFilter: 'blur(10px)',
					zIndex: 10,
					background: 'rgba(0, 0, 0, 0.3)',
					border: '3px solid white',
					padding: '10px',
				}}
			>
				<Link
					href={'/'}
					onClick={() => {
						new Audio('/page.wav').play()
					}}
				>
					<span
						className='material-symbols-outlined'
						style={{ color: 'white', fontSize: '25pt', padding: '5px' }}
					>
						home
					</span>
				</Link>
				<Link
					href={'#'}
					onClick={(e) => {
						e.preventDefault()
						new Audio('/fullscreen.wav').play()
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
