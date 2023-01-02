/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { readdirSync } from 'fs'
import screenfull from 'screenfull';

function GamePage(props: any) {
    let router = useRouter()

    return (
        <>
            <Head>
                <title>{`Play ${props.game.name} | Parakeet Games`}</title>
            </Head>
            <img src={props.game.art.background} style={{ position: 'fixed', top: 0, left: 0, filter: 'brightness(0.5)', width: '100vw', height: '100vh', objectFit: 'cover' }} />
            <iframe src={props.game.frame} id={`frame-${props.game.id}`} style={{ height: '100vh', width: '100vw', border: 'none', zIndex: 9, position: 'fixed' }}></iframe>
            <div style={{ position: 'fixed', bottom: 0, right: 0, borderRadius: '10px 0 0 0', backdropFilter: 'blur(10px)', zIndex: 10, background: 'rgba(0, 0, 0, 0.3)', borderLeft: '3px solid white', borderTop: '3px solid white', padding: '15px' }}>
                <Link href={'#'} onClick={() => {
                    document.querySelector('iframe')?.requestFullscreen();
                    (navigator as any).keyboard.lock()
                }}><span className="material-symbols-outlined" style={{ color: 'white', fontSize: '25pt' }}>fullscreen</span></Link>
                {/* <Link href={'/play/${props.game.id}/about'}><span className="material-symbols-outlined" style={{ color: 'white', padding: '10px', fontSize: '20pt' }}>info</span></Link> */}
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