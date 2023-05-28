/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { RWebShare } from 'react-web-share'
import { readdirSync } from 'fs'
import $ from 'jquery'

function GamePage(props: any) {
	let [user, setUser] = useState<User>()
	let [userStateDetermined, setUserStateDetermined] = useState<boolean>(false)

	useEffect(() => {
		window.addEventListener('message', (event) => {
			if (event.data === 'open-guide') {
				$('.guideBox').fadeIn(500)
			} else if (event.data === 'close-guide') {
				$('.guideBox').fadeOut(500)
			} else if (typeof event.data == 'object') {
				if (event.data.title && event.data.description && event.data.parakeetMessageType == 'achievement') {
					$('.popupTitle').text(event.data.title)
					$('.popupDescription').text(event.data.description)
					$('.popup').show()
					setTimeout(() => $('.popup').fadeOut(500), 2000)
				}
			}
		})
	})

	useMemo(async () => {
		onAuthStateChanged(getAuth(), async (user) => {
			if (user) {
				setUser(user)
				if (typeof document !== 'undefined') {
					(document.querySelector('#frame-' + props.game.id) as HTMLIFrameElement).setAttribute('src', `${props.game.frame}?user=${await user.getIdToken()}`)
				}
			} else {
				if (typeof document !== 'undefined') {
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
			<div className='guideBox'>
				<img src={props.game.art.logo} className='guideGameLogo' />
				<div className='guideMainContent'>
					{user && <div className='guideMainButton' onClick={() => { }}>
						<div className='guideButtonContent'>
							<span className='material-symbols-outlined'>face</span>
							{user.displayName}
						</div>
					</div>}
					{!user && <div style={{ fontSize: '1.7rem', color: '#38dda1', borderColor: '#38dda1', background: 'linear-gradient(purple, #cc10ad)' }} className='guideMainButton' onClick={() => {
						router.push('/account')
					}}>
						<div className='guideButtonContent'>
							<span className='material-symbols-outlined'>face</span>
							Log In
						</div>
					</div>}
					{/* <div className='guideMainButton' onClick={() => { }}>
						<div className='guideButtonContent'>
							<span className='material-symbols-outlined'>social_leaderboard</span>
							Achievements
						</div>
					</div> */}
					<RWebShare data={{
						title: props.game.name + ' on Parakeet',
						text: `I'm playing ${props.game.name} on Parakeet.Games! Come join me!`,
					}}>
						<div className='guideMainButton'>
							<div className='guideButtonContent'>
								<span className='material-symbols-outlined'>share</span>
								Share
							</div>
						</div>
					</RWebShare>
					<div className='guideMainButton' onClick={() => router.push('/')}>
						<div className='guideButtonContent'>
							<span className='material-symbols-outlined'>logout</span>
							Exit game
						</div>
					</div>
					{/* <div className='guideMainButton' onClick={() => {
						((document.querySelector(`#frame-${props.game.id}`) as HTMLIFrameElement).contentWindow as any).focus()
						setGuideOpened(false)
					}}>
						<div className='guideButtonContent'>
							<span className='material-symbols-outlined'>keyboard_return</span>
							Return to game
						</div>
					</div> */}
				</div>
			</div>
			<img src="/logo.png" className='guideTrigger' onClick={() => {
				$('.guideBox').fadeToggle(300)
			}} />
			<div className='popup'>
				<span className='material-symbols-outlined popupIcon'>social_leaderboard</span>
				<span className='popupContent'>
					<span className='popupTitle'></span>
					<br />
					<span className='popupDescription'></span>
					<br /><br />
					<i>This is a DEMO MODE achievement and will not save to your account.</i>
				</span>
			</div>
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
