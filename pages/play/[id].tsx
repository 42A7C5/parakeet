/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { readdirSync } from 'fs'

function GamePage(props: any) {
    let router = useRouter()

    return (
        <>
            <Head>
                <title>{`Play ${props.game.name} | Parakeet Games`}</title>
            </Head>
            <img src={props.game.art.background} style={{ position: 'fixed', top: 0, left: 0, filter: 'brightness(0.5)', width: '100vw', height: '100vh' }} />
            <div style={{ height: '90vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', bottom: 0, left: 0 }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={props.game.art.logo} alt={props.game.name} />
                    <br />
                    <Link href={'#'} onClick={() => {
                        // @ts-ignore
                        navigator.keyboard.lock()
                        // @ts-ignore
                        document.querySelector(`#frame-${props.game.id}`).requestFullscreen()
                    }}>
                        <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '100pt' }}>play_circle</span>
                    </Link>
                </div>
                <iframe src={props.game.frame} id={`frame-${props.game.id}`} style={{ height: 0, width: 0, border: 'none' }}></iframe>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const allGames: any[] = [];
    readdirSync('apps').forEach(game => {
        allGames.push(game);
    })

    return {
        paths: allGames.map((game: any) => {
            return {
                params: {
                    id: game.toString().replace('.json', '')
                }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    return {
        props: {
            game: { ...require(`../../apps/${params.id}.json`), id: params.id }
        },
    }
}

export default GamePage