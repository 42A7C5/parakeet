/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function Account() {
    let [user, setUser] = useState<any>()

    useMemo(async () => {
        if (typeof window == 'object') {
            try {
                let token = new URLSearchParams(window.location.search).get('user') || window.localStorage.authtoken
                let resp = await fetch(
                    `${window.localStorage.ddAuthServer || 'https://parakeetapi.netlify.app'}/Platform/VerifyUser?user=${token}`,
                )
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
                window.localStorage.authtoken = new URLSearchParams(window.location.search).get('user') || window.localStorage.authtoken
                let userd = await resp.json()
                setUser({ ...userd["Response"], token })
            } catch (error) {
                window.location.href = `https://api.parakeet.leaguexp.dev/Platform/BrandedLogin?redirect=${window.location.href}`
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>Account | Parakeet Games</title>
            </Head>
            <div style={{ textAlign: 'center' }}>
                {!user && <p>Loading...</p>}
                {user && <div>
                    <h1>
                        <img src={user.avatar} height={60} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                        {user.preferredIdentifier}
                    </h1>
                    <h2>{user.email}</h2>
                    <Link href={`https://api.parakeet.leaguexp.dev/Platform/BrandedLogin?redirect=${window.location.href}`}>
                        <span style={{ color: 'white', textDecoration: 'underline' }}>
                            Switch Account
                        </span>
                    </Link>
                </div>}
            </div>
        </>
    )
}
