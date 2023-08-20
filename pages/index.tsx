/****************************
© 2019-present LeagueXP. All rights reserved.
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

	useMemo(async () => { onAuthStateChanged(getAuth(), (user) => { if (user) {
		setUser(user)
		if (user.photoURL) {
			setAvatarCreated(user.photoURL)
		}
	} }) }, [])

	return (
		<>
			<div className='home'>
				<Head>
					<title>Parakeet</title>
				</Head>
				<nav>
					{/* <Link href={'/'}> */}
					<h1 style={{ verticalAlign: 'middle', color: 'var(--text)' }} className='navTitle'>
						<img src={'/logo.png'} alt="Parakeet logo" height={80} className='navLogo' /> <span className='navTitleText'>Parakeet</span>
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
						<a href={'#'} onClick={() => {
							let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
							avatarModal.showModal()
						}}>
							<span className='material-symbols-outlined'>face</span>
						</a>
						<a href={'#'} onClick={() => {
							let themeSelectModal = document.querySelector('.themeSelectModal') as HTMLDialogElement
							themeSelectModal.showModal()
						}}>
							<span className='material-symbols-outlined'>palette</span>
						</a>

						{/* <a href={'#'}>
						<span className='material-symbols-outlined'>code</span>
					</a> */}
					</h2>
				</nav>
				<dialog className='themeSelectModal modal'>
					<span className="material-symbols-outlined modalIdentifier">palette</span>
					<span className='material-symbols-outlined modalCloseButton' onClick={() => {
						let themeSelectModal = document.querySelector('.themeSelectModal') as HTMLDialogElement
						themeSelectModal.close()
					}}>close</span>
					<h1>Appearance</h1>
					<button style={{
						background: 'white',
						color: 'black',
						boxShadow: '0 0 10px white',
						borderColor: 'white'
					}} className="searchTag" onClick={() => {
						window.localStorage.removeItem('customThemeWhite')
						window.localStorage.removeItem('customThemePrimary')
						window.localStorage.removeItem('customThemeSecondary')
						window.localStorage.removeItem('customThemeBackground')
						window.localStorage.removeItem('customThemeLogo')
						window.location.reload()
					}}>Worlds (default)</button>
					<ThemeOption name="DragonDungeon" text="#fff9c4" primary="#afb42b" secondary="gold" background="linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://dragondungeon.netlify.app/assets/img/game/tile.png')" />
					<ThemeOption name="WizardWars" text="#acfef6" primary="#bf5fff" secondary="#03dac4" background="linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/gameassets/wizards/background.jpg') center center fixed no-repeat" />
					<br />
					<ThemeOption name="Contrast" text="white" primary="#00a1de" secondary="#c60c30" background="linear-gradient(45deg, red, blue)" />
					<ThemeOption name="Pride" text="black" primary="#e49ad8" secondary="#44ffbb" background="linear-gradient(90deg, #ff1313, #ff9007, #feee0c, #08f850, #3c68e2, #c745e1)" />
					<ThemeOption name="Neon" text="white" primary="#cc10ad" secondary="#38dda1" background="linear-gradient(-45deg, #cc10ad, #38dda1)" />
					<ThemeOption name="Forest" text="#e6ffe9" primary="#0a4713" secondary="#009b3a" background="linear-gradient(-45deg, #0a4713, #009b3a)" />
					<ThemeOption name="Snow" text="#bfcdf5" primary="#00a1de" secondary="#05206b" background="linear-gradient(-45deg, #00a1de, #05206b)" />
					<ThemeOption name="Rapture" text="#e6ffe9" primary="#c60c30" secondary="#960505" background="linear-gradient(45deg, #ff0000, #000000)" />
					<ThemeOption name="Rust" text="#794c0b" primary="#fcedd8" secondary="#d28512" background="linear-gradient(-45deg, #fcedd8, #d28512)" />
					<ThemeOption name="Seafloor" text="white" primary="#0000ff" secondary="#00a1de" background="linear-gradient(0deg, black, #0000dd)" />
					<ThemeOption name="Void" text="white" primary="purple" secondary="#cc10ad" background="linear-gradient(0deg, black, black)" />
				</dialog>
				<dialog className='accountModal modal'>
					<span className="material-symbols-outlined modalIdentifier">account_circle</span>
					<span className='material-symbols-outlined modalCloseButton' onClick={() => {
						let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
						accountModal.close()
					}}>close</span>
					<h1>
						Parakeet Account
					</h1>
					{!user && (
						<p>Loading...</p>
					)}
					{user && (
						<>
							<h3 style={{ fontSize: '2.0em' }}>
								<Avatar modelSrc={avatarCreated} />
								{user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}
							</h3>
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
						let avatarModal = document.querySelector('.avatarModal') as HTMLDialogElement
						avatarModal.close()
						let accountModal = document.querySelector('.accountModal') as HTMLDialogElement
						accountModal.showModal()
					}} /></div>}
				</dialog>
				<dialog className='termsModal modal'>
					<span className="material-symbols-outlined modalIdentifier">gavel</span>
					<span className='material-symbols-outlined modalCloseButton' onClick={() => {
						let termsModal = document.querySelector('.termsModal') as HTMLDialogElement
						termsModal.close()
					}}>close</span>
					<h1>Terms of Service</h1>
					<iframe src='/terms.html' className='policyframe'></iframe>
				</dialog>
				<dialog className='privacyModal modal'>
					<span className="material-symbols-outlined modalIdentifier">policy</span>
					<span className='material-symbols-outlined modalCloseButton' onClick={() => {
						let privacyModal = document.querySelector('.privacyModal') as HTMLDialogElement
						privacyModal.close()
					}}>close</span>
					<h1>Privacy Policy</h1>
					<iframe src='/privacy.html' className='policyframe'></iframe>
				</dialog>
				<Carousel showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} className='gameotwcontainer hideMeOnMobile'>
					{props.picks.map((game: any) => (
						<Link key={game.id} href={`/play/${game.id}`}>
							<div
								className={'gameotw'}
								style={{
									background: `url(${game.art.background})`,
								}}
							>
								<div>
									<img
										src={game.art.logo}
										style={{ maxHeight: '120px', width: 'auto' }}
										alt={game.name}
									/>
								</div>
							</div>
						</Link>
					))}
				</Carousel>
				<br />
				<div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
					<input
						type='text'
						placeholder={'Search'}
						className='searchBar'
						onChange={(e) => {
							setSearchTerm(e.target.value.replace(/\s+/g, '').toLowerCase())
						}}
					/>
					<br />
					<div style={{ margin: '20px' }} className='hideMeOnMobile'>
						<button
							className='searchTag'
							onClick={() => {
								setSearchTags([])
							}}
							style={{
								backgroundColor:
									searchTags.length === 0 ? 'var(--secondary)' : 'var(--primary)',
							}}
						>
							all
						</button>
						{props.tags.map((tag: string) => {
							return (
								<button
									onClick={() => {
										let tagIndex = searchTags.indexOf(tag)
										if (tagIndex === -1) {
											setSearchTags([...searchTags, tag])
										} else {
											setSearchTags(searchTags.filter((tg) => tg !== tag))
										}
									}}
									key={tag.toString()}
									className='searchTag'
									style={{
										backgroundColor: searchTags.includes(tag)
											? 'var(--secondary)'
											: 'var(--primary)',
									}}
								>
									{tag}
								</button>
							)
						})}
					</div>
					<br />
				</div>
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
									>
										<img
											className='game-bgart'
											src={game.art.background}
											alt=''
										/>
										{game.features && <div className='game-features' data-atropos-offset='10'>
											{game.oneliner && <b className='smallBoxText'>{game.oneliner}<br /></b>}
											{game.features.includes('keyboard') && <span className='material-symbols-outlined'>laptop_chromebook</span>}
											{game.features.includes('gamepad') && <span className='material-symbols-outlined'>sports_esports</span>}
											{game.features.includes('touch') && <span className='material-symbols-outlined'>phone_iphone</span>}
											{game.features.includes('ads') && <span className='material-symbols-outlined'>attach_money</span>}
										</div>}
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
			<p style={{ textAlign: 'center' }}>
				&copy; {new Date().getFullYear()} LeagueXP. All rights reserved.
				<br />
				Games may be covered by their own open-source licenses.
				<br />
				<Link style={{ color: 'white', textDecoration: 'underline' }} href='#' onClick={() => {
					let termsModal = document.querySelector('.termsModal') as HTMLDialogElement
					termsModal.showModal()
				}}>Terms Of Service</Link> | <Link style={{ color: 'white', textDecoration: 'underline' }} href='#' onClick={() => {
					let privacyModal = document.querySelector('.privacyModal') as HTMLDialogElement
					privacyModal.showModal()
				}}>Privacy Policy</Link>
				<br /><br />
				<img src="/logomark.png" alt="Parakeet logo" style={{ height: '60px' }} />
			</p>
		</>
	)
}

function ThemeOption(props: {
	name: string,
	text: string,
	primary: string,
	secondary: string,
	background: string,
}) {
	return (
		<button style={{
			background: props.primary,
			color: props.text,
			boxShadow: `0 0 15px ${props.secondary}`,
			borderColor: props.secondary
		}} className="searchTag" onClick={() => {
			window.localStorage.setItem('customThemeWhite', props.text)
			window.localStorage.setItem('customThemePrimary', props.primary)
			window.localStorage.setItem('customThemeSecondary', props.secondary)
			window.localStorage.setItem('customThemeBackground', props.background)
			var r = document.querySelector(':root') as any
			r.style.setProperty('--text', props.text)
			r.style.setProperty('--primary', props.primary)
			r.style.setProperty('--secondary', props.secondary)
			r.style.setProperty('--background', props.background)
		}}>{props.name}</button>
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
					...require('../apps/wizards.json'),
					id: 'wizards',
				},
				{
					...require('../apps/mazmorra.json'),
					id: 'mazmorra',
				},
				{
					...require('../apps/monstr.json'),
					id: 'monstr',
				},
				{
					...require('../apps/dragondungeon.json'),
					id: 'dragondungeon',
				}
			],
		},
	}
}
