/****************************
© 2019-present Parakeet.Games. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { readdirSync } from 'fs'
import { useMemo, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { AvatarCreator } from '@readyplayerme/rpm-react-sdk'
import { Avatar } from '@readyplayerme/visage'

export default function Home(props: any) {
	let [searchTerm, setSearchTerm] = useState<string>('')
	let [searchTags, setSearchTags] = useState<string[]>([])
	let [avatarCreated, setAvatarCreated] = useState<string>('https://readyplayerme.github.io/visage/male.glb')
	let [user, setUser] = useState<any>()

	useMemo(async () => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				setUser(user)
				if (user.photoURL) {
					setAvatarCreated(user.photoURL)
				}
			}
		})
	}, [])

	return (
		<>
			<div className='home'>
				<Head>
					<title>Parakeet</title>
				</Head>
				<nav>
					{/* <Link href={'/'}> */}
					<h1 style={{ verticalAlign: 'middle', color: 'var(--text)' }} className='navTitle'>
						<img src={'/logo.png'} alt="Parakeet logo" height={80} className='navLogo' /> <span className='navTitleText'><span style={{ color: 'white', fontFamily: 'Unbounded', fontSize: '1.6em' }}>Parakeet</span>.games</span>
					</h1>
					{/* </Link> */}
					<h2
						className='navLinks'
						style={{
							paddingRight: '20px',
							verticalAlign: 'middle',
							color: 'var(--text)',
						}}
					>
						<a href={'#'} onClick={() => {
							let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
							accountModal.showModal()
						}}>
							<span className='material-symbols-outlined'>account_circle</span>
						</a>

						{/* <a href={'#'}>
						<span className='material-symbols-outlined'>code</span>
					</a> */}
					</h2>
				</nav>
				<dialog className='accountModal modal'>
					<span className='material-symbols-outlined modalCloseButton' onClick={() => {
						let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
						accountModal.close()
					}}>close</span>
					{!user && (
						<p>Loading...</p>
					)}
					{user && (
						<>
							<Avatar style={{ height: '300px' }} modelSrc={avatarCreated} animationSrc={'/male-idle.glb'} />
							<h1 style={{ fontSize: '2.0em' }}>{user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}</h1>
							{user.isAnonymous && <Link
								href={"#"}
								onClick={async (e) => {
									e.preventDefault();
									let user = await signInWithPopup(
										getAuth(),
										new GoogleAuthProvider()
									);
									setUser(user.user);
								}}
							>
								<span
									style={{
										color: "var(--text)",
										textDecoration: "underline",
										fontSize: "1.5rem",
									}}
								>
									Sign in with Google
								</span>
								<br /><br />
								<i>By signing in, you agree to our Privacy Policy and Terms of Service.</i>
							</Link>}
							{!user.isAnonymous && <>
								<Link
									href={`#`}
									onClick={(e) => {
										e.preventDefault();
										updateProfile(user, {
											displayName: prompt("Enter your new display name:"),
										});
									}}
								>
									<span
										style={{
											color: "var(--text)",
											textDecoration: "underline",
											padding: "20px",
										}}
									>
										Change Name
									</span>
								</Link>
								<Link
									href={`#`}
									onClick={(e) => {
										e.preventDefault();
										let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
										accountModal.close()
										let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
										avatarModal.showModal()
									}}
								>
									<span
										style={{
											color: "var(--text)",
											textDecoration: "underline",
											padding: "20px",
										}}
									>
										Change Avatar
									</span>
								</Link>
								<Link
									href={`#`}
									onClick={(e) => {
										e.preventDefault();
										signOut(getAuth())
										setUser(null)
									}}
								>
									<span
										style={{
											color: "var(--text)",
											textDecoration: "underline",
											padding: "20px",
										}}
									>
										Log Out
									</span>
								</Link>
							</>}
						</>
					)}
				</dialog>
				<dialog className='avatarModal modal'>
					{!user && (
						<p>Loading...</p>
					)}
					{user && <div className='avatarBuilder'><AvatarCreator subdomain="parakeet" onAvatarExported={(url) => {
						setAvatarCreated(url)
						updateProfile(user, {
							photoURL: url,
						})
						let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
						avatarModal.close()
						let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
						accountModal.showModal()
					}} /></div>}
				</dialog>
				<Carousel showStatus={false} showArrows={true} infiniteLoop={true} showThumbs={false} showIndicators={false} autoPlay={true} transitionTime={700} interval={5000} className='gameotwcontainer hideMeOnMobile'>
					<div
						className={'gameotw'}
						style={{
							background: `linear-gradient(rgba(0, 0, 0, 0), var(--primary)), url(/worlds.png) center center `,
						}}
					>
						<div>
							<h1>Welcome to Parakeet!</h1>
							<p>We set out to create an awesome place to find and play games made for the Web. But it&apos;s not about us.
								<br />Let&apos;s build an awesome community together and make Web games better for everyone.
							</p>
							<h2>❤️ The Parakeet Team</h2>
						</div>
					</div>
					{props.picks.map((game: any) => (
						<Link key={game.id} href={`/play/${game.id}`}>
							<div
								className={'gameotw'}
								style={{
									background: `linear-gradient(rgba(0, 0, 0, 0), var(--primary)), url(${game.art.background})`,
								}}
							>
								<div>
									<img
										src={game.art.logo}
										style={{ width: 'auto' }}
										alt={game.name}
									/>
								</div>
							</div>
						</Link>
					))}
				</Carousel>
				<div className={'gameList'}>
					{props.games.map((game: any) => {
						if (
							(game.name.replace(/\s+/g, '').toLowerCase().includes(searchTerm) ||
								searchTerm == '') &&
							(searchTags.some((tag) => game.tags.includes(tag)) ||
								searchTags.length === 0)
						)
							return (
								<Link key={game.id} href={`/play/${game.id}`}>
									<Atropos
										key={game.id}
										className='game'
										highlight={false}
										shadow={false}
										rotateTouch={false}
										rotate={false}
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
			</div>
		</>
	)
}

export async function getStaticProps() {
	let games: any[] = []
	let uniqueTags: String[] = []

	let featuredGames: any[] = []
	let newGames: any[] = []

	let highSupportedGames: any[] = []
	let mediumSupportedGames: any[] = []
	let lowSupportedGames: any[] = []

	let gamesWithAds: any[] = []

	let allGames = readdirSync('apps')

	for (let gameIndex = 0; gameIndex < allGames.length; gameIndex++) {
		const gameData = require('../apps/' + allGames[gameIndex])

		gameData.tags.forEach((tag: String) => {
			if (!uniqueTags.includes(tag)) uniqueTags.push(tag)
		})

		if (gameData.features.includes('featured')) {
			featuredGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('new')) {
			newGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('ads')) {
			gamesWithAds.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('gamepad') && gameData.features.includes('touch')) {
			highSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('touch')) {
			mediumSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}

		if (gameData.features.includes('keyboard')) {
			lowSupportedGames.push({ ...gameData, id: allGames[gameIndex].replace('.json', '') })
			continue;
		}
	}

	games.push(...featuredGames)
	games.push(...newGames)
	games.push(...highSupportedGames)
	games.push(...mediumSupportedGames)
	games.push(...lowSupportedGames)
	games.push(...gamesWithAds)

	return {
		props: {
			games,
			tags: uniqueTags,
			picks: [
				{
					...require('../apps/bashball.json'),
					id: 'bashball',
				},
				{
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
				}
			],
		},
	}
}
