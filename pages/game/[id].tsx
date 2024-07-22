/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Head from 'next/head'
import { useMemo, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { readdirSync } from 'fs'
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
            <Image src={game.art.background} alt={game.name} width={1920} height={1080} className='w-full h-[30vh] object-cover mt-5' />
            <div className='p-8'>
                {game.art.logo && <Image src={game.art.logo} alt={game.name} width={300} height={300} className='h-[14vh] w-auto' />}
                {!game.art.logo && <h1 className='text-3xl'>{game.name}</h1>}
                <h2 className='text-3xl mt-3'>{game.oneliner}</h2>
                <h3 className='text-2xl mt-1 mb-5'>{game.dev}</h3>
                <Link href='#' onClick={(e) => {
                    e.preventDefault()
                    const iframe = document.querySelector('iframe')
                    const closeGame = document.querySelector('#closeGame')
                    if (iframe && closeGame) {
                        iframe.classList.toggle('hidden')
                        closeGame.classList.toggle('hidden')
                    }
                }} className='whitespace-nowrap mr-2 py-3 px-5 border-primary border-2 bg-gradient-to-r from-surface to-background rounded-md text-xl'><span className="material-symbols-outlined translate-y-2 text-3xl mr-2">play_arrow</span> Play</Link>
                <Link href='#' onClick={(e) => {
                    e.preventDefault()
                    const iframe = document.querySelector('iframe')
                    if (iframe) {
                        iframe.classList.toggle('hidden')
                        iframe.requestFullscreen()
                        // @ts-expect-error
                        navigator.keyboard.lock()
                        iframe.onfullscreenchange = () => {
                            if (!document.fullscreenElement) {
                                iframe.classList.toggle('hidden')
                                // @ts-expect-error
                                navigator.keyboard.unlock()
                            }
                        }
                    }
                }} className='p-3 bg-surface to-background rounded-md text-xl'><span className="material-symbols-outlined translate-y-2 text-3xl mr-2">fullscreen</span> Play in fullscreen</Link>
            </div>
            <Link href='#' className='hidden' id='closeGame' onClick={(e) => {
                e.preventDefault()
                const iframe = document.querySelector('iframe')
                const closeGame = document.querySelector('#closeGame')
                if (iframe && closeGame) {
                    iframe.classList.toggle('hidden')
                    closeGame.classList.toggle('hidden')
                }
            }}><span className="material-symbols-outlined p-2 hover:text-primary bg-surface rounded-full border-2 fixed top-3 left-3 z-40">close</span></Link>
            <iframe src={game.frame} className='fixed top-0 left-0 w-screen h-screen hidden'></iframe>
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
