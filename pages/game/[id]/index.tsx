/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Head from 'next/head'
import { useMemo, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { readdirSync } from 'fs'
import Atropos from 'atropos/react'
import Image from 'next/image'
import Link from 'next/link'

function GamePage(props: any) {
    let [user, setUser] = useState<User>()
    let [userStateDetermined, setUserStateDetermined] = useState<boolean>(false)

    useMemo(async () => {
        onAuthStateChanged(getAuth(), async (user) => {
            try {
                if (user) {
                    setUser(user)
                }
                setUserStateDetermined(true)
            } catch { }
        })
    }, [])

    let game = props.game

    return (
        <>
            <Head>
                <title>{`${game.name} on Parakeet`}</title>
            </Head>

            <div className='gameOverview'>
                <div className='gameOverviewContent'>
                    <img
                        style={{ width: '100%' }}
                        src={game.art.logo}
                        alt={game.name}
                    />
                    <h2>{game.oneliner}</h2>
                    <h3>{game.dev}</h3>
                    {/* play button */}
                    <Link
                        href={`/game/${game.id}/play`}
                        rel='noopener noreferrer'
                        className='playButton material-symbols-outlined'
                    >
                        play_arrow
                    </Link>
                </div>
            </div>

            <Image
                fill
                style={{ objectFit: 'cover' }}
                src={game.art.background}
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0WHhgEwAE3wJFOVmJuQAAAABJRU5ErkJggg=='
                placeholder='blur'
                alt=''
            />

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
