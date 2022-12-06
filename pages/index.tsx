import styles from '../styles/Home.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Link from 'next/link'
import Head from 'next/head'
import { readdirSync } from 'fs'

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Explore | Parakeet Games</title>
      </Head>
      {/* <Link href={'/'}>
        <div style={{ textAlign: 'center', background: 'red', padding: '10px', color: 'white' }}>
          <h2>Played DragonDungeon on Lit.Games before November 2022?<br />Link your Lit.Games and Parakeet accounts to avoid losing data when Lit.Games login become unavailable.</h2>
        </div>
      </Link> */}
      <div className={styles.gameList}>
        <Carousel className={styles.carousel} showArrows={false} showThumbs={false} showStatus={false} autoPlay={true}>
          {props.picks.map((game: any) => (
            <Link href={`/play/${game.id}`}>
              <div key={game.id} className={styles.gameotw} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${game.art.background}) center center no-repeat`, boxShadow: `0 0 20px ${game.color}`, border: `0px solid ${game.color}` }}>
                <div>
                  <img src={game.art.logo} style={{ height: '120px', width: 'auto' }} alt={game.name} />
                  <p style={{ fontSize: '18pt', fontWeight: 'bold', color: 'white' }}>{game.reason}</p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        {props.games.map((game: any) => (
          <Link href={`/play/${game.id}`} style={{ flex: '300px' }}>
            <div key={game.id} className={styles.game} style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.art.background}) center center no-repeat`, boxShadow: `0 0 30px ${game.color}`, border: `0px solid ${game.color}` }}>
              <img src={game.art.logo} width={350} alt={game.name} />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  let games: any[] = []
  readdirSync('apps').forEach(game => {
    games.push({ ...require('../apps/' + game), id: game.replace('.json', '') });
  })
  return {
    props: {
      games,
      picks: [
        { ...require('../apps/dragondungeon.json'), id: 'dragondungeon', reason: "Play the exclusive Holiday Mayhem event through Jan 1." },
        { ...require('../apps/wizards.json'), id: 'wizards', reason: "New spells make this magical arena shooter even more fun!" }
      ]
    },
  }
}