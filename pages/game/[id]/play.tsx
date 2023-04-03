/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from 'next/head'
import { readdirSync } from 'fs'
import { useMemo, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import Mousetrap from 'mousetrap'

function GamePage(props: any) {
	let [user, setUser] = useState<User>()
	let [userStateDetermined, setUserStateDetermined] = useState<boolean>(false)
	let [guideOpened, setGuideOpened] = useState<boolean>(false)

	useMemo(async () => {
		Mousetrap.bind('shift+p', () => {
			if (!guideOpened) {
				setGuideOpened(true)
			} else {
				((document.querySelector(`#frame-${props.game.id}`) as HTMLIFrameElement).contentWindow as any).focus()
				setGuideOpened(false)
			}
		})
		onAuthStateChanged(getAuth(), async (user) => {
			if (user) {
				setUser(user)
				if (typeof document.querySelector('#frame-' + props.game.id) !== 'undefined') {
					(document.querySelector('#frame-' + props.game.id) as HTMLIFrameElement).setAttribute('src', `${props.game.frame}?user=${await user.getIdToken()}`)
				}
			} else {
				if (typeof document.querySelector('#frame-' + props.game.id) !== 'undefined') {
					(document.querySelector('#frame-' + props.game.id) as HTMLIFrameElement).setAttribute('src', props.game.frame)
				}
			}
			setUserStateDetermined(true)
		})
	}, [])

	let router = useRouter()

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
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0
				}}
			>
				<img src="/logo.png" className='loadingIndicator' />
			</div>
			{guideOpened && <div className='guideBox'>
				<img src={props.game.art.logo} className='guideGameLogo' />
				<div className='guideMainContent'>
					{user && <div style={{ fontSize: '1.7rem', color: '#38dda1', borderColor: '#38dda1', background: 'linear-gradient(purple, #cc10ad)' }} className='guideMainButton' onClick={() => { }}>
						{user.displayName}
						<img src={user.photoURL?.toString()} height={40} style={{ borderRadius: '999999px' }} />
					</div>}
					{/* <div className='guideMainButton' onClick={() => { }}>
						Achievements
						<span className='material-symbols-outlined'>social_leaderboard</span>
					</div>
					<div className='guideMainButton' onClick={() => { }}>
						Friends
						<span className='material-symbols-outlined'>face</span>
					</div> */}
					<div className='guideMainButton' onClick={() => router.push('/')}>
						Exit game
						<span className='material-symbols-outlined'>logout</span>
					</div>
					<div className='guideMainButton' onClick={() => {
						((document.querySelector(`#frame-${props.game.id}`) as HTMLIFrameElement).contentWindow as any).focus()
						setGuideOpened(false)
					}}>
						Return to game
						<span className='material-symbols-outlined'>keyboard_return</span>
					</div>
				</div>
			</div>}
			<img src="/logo.png" className='guideTrigger' onClick={() => {
				if (!guideOpened) {
					setGuideOpened(true)
				} else {
					((document.querySelector(`#frame-${props.game.id}`) as HTMLIFrameElement).contentWindow as any).focus()
					setGuideOpened(false)
				}
			}} />
			<iframe
				id={`frame-${props.game.id}`}
				style={{
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					bottom: '0',
					border: 'none',
					zIndex: 1,
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
			game: { ...require(`../../../apps/${params.id}.json`), id: params.id },
		},
	}
}

export default GamePage
