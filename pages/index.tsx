/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import Head from 'next/head'
import Atropos from 'atropos/react'
import { read, readdirSync } from 'fs'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

export default function Home(props: any) {
	let [searchTerm, setSearchTerm] = useState<string>('')
	let [searchTags, setSearchTags] = useState<string[]>([])

	return (
		<>
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
					{/* <a href={'#'}>
						<span className='material-symbols-outlined'>face</span>
					</a> */}
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
				<span className='material-symbols-outlined modalCloseButton' onClick={() => {
					let themeSelectModal = document.querySelector('.themeSelectModal') as HTMLDialogElement
					themeSelectModal.close()
				}}>close</span>
				<h1>
					<span className="material-symbols-outlined">palette</span>
					Select a Theme
				</h1>
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
									{game.features && <div className='game-features' data-atropos-offset='0'>
										{/* {game.features.includes('featured') && <span className='material-symbols-outlined'>workspace_premium</span>} */}
										{/* {game.features.includes('new') && <span className='material-symbols-outlined'>release_alert</span>} */}
										{game.features.includes('local') && <span className='material-symbols-outlined'>weekend</span>}
										{game.features.includes('online') && <span className='material-symbols-outlined'>group</span>}
										{game.features.includes('keyboard') && <span className='material-symbols-outlined'>laptop_chromebook</span>}
										{game.features.includes('gamepad') && <span className='material-symbols-outlined'>sports_esports</span>}
										{game.features.includes('touch') && <span className='material-symbols-outlined'>phone_iphone</span>}
										{game.features.includes('realmoney') && <span className='material-symbols-outlined'>attach_money</span>}
										<br />
										{game.features.includes('new') && <span className='smallBoxText'>New to Parakeet</span>}
										{game.features.includes('featured') && <span className='smallBoxText'>Featured game</span>}
										{game.features.includes('ads') && <span className='smallBoxText'>Contains ads</span>}
									</div>}
								</Atropos>
							</Link>
						)
				})}
			</div>
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
