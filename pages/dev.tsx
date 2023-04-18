/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from "next/head";
import Link from "next/link";

import { useRouter } from 'next/router'

export default function Account() {
    let router = useRouter()

    return (
        <>
            <Head>
                <title>Developers | Parakeet Games</title>
            </Head>
            <div style={{ textAlign: "center" }}>
                <>
                    <h1>The web&apos;s best experiences are on Parakeet.</h1>
                    <video src="/hero.m4v" muted loop autoPlay style={{ width: '100vw', height: '60vh', objectFit: 'cover' }}></video>
                    <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSfSrzgt57xNIfZaDV2qgW89Y2vMvg1jiig9LvX9_2fxjuTkPw/viewform'} style={{ background: 'linear-gradient(160deg, rgba(44,180,131,1) 0%, rgba(151,24,129,1) 100%)', padding: '30px', color: 'white', border: '3px solid white', borderRadius: '10px', fontSize: '1.6rem' }}>Submit your game</Link>
                </>
            </div>
        </>
    );
}
