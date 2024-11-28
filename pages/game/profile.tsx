/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Head from 'next/head'
import { useMemo, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { readdirSync } from 'fs'
import Image from 'next/image'
import Link from 'next/link'

function GamePage() {
    return (
        <>
            <Head>
                <title>{`Coming soon: >_profile | Parakeet`}</title>
            </Head>
            <div style={{ background: `url(/img/tiles/profile/background.svg) center center`, backgroundSize: 'cover' }} className='md:w-[96vw] md:ml-[2vw] md:rounded-lg min-h-[20vh] mt-8 flex justify-center items-center'>
                <div className='text-center'>
                    <h1 className="text-5xl">who are you?</h1>
                </div>
            </div>
            <div className='p-6 text-center'>
                <h2 className="text-3xl mb-2">&rarr; profile is a new visual novel from Parakeet Studios about finding your place</h2>
            </div>
            <div className='text-center'>
                <h2 className="text-2xl mb-2">coming feb 2025</h2>
            </div>
        </>
    )
}

export default GamePage
