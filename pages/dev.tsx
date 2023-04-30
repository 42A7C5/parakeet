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
                    <video className="heroVideo" src="/hero.m4v" muted loop autoPlay style={{ width: '100vw', height: '60vh', objectFit: 'cover' }}></video>
                    <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSfSrzgt57xNIfZaDV2qgW89Y2vMvg1jiig9LvX9_2fxjuTkPw/viewform'} className="bigButton">Submit your game</Link>
                </>
            </div>
        </>
    );
}
