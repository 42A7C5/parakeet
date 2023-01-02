/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth'

export default function Account() {
    let [user, setUser] = useState<any>()

    useMemo(async () => {
        onAuthStateChanged(getAuth(), user => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>Account | Parakeet Games</title>
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <div style={{ textAlign: 'center' }}>
                    {!user && <button onClick={async () => {
                        let user = await signInWithPopup(getAuth(), new GoogleAuthProvider())
                        setUser(user.user)
                    }}>Sign In with Google</button>}
                    {user && <div>
                        <Link href={`/`}>
                        <span style={{ color: 'white', textDecoration: 'underline', fontSize: '1.5rem' }}>
                                &larr; Back
                            </span>
                        </Link>
                        <h1>
                            <img src={`https://avatars.dicebear.com/api/bottts/${user.uid}.svg`} height={60} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            {user.displayName || user.email || user.phoneNumber}
                        </h1>
                        <h2>{user.email}</h2>
                        <Link href={`#`} onClick={(e) => {
                            e.preventDefault()
                            setUser(undefined)
                        }}>
                            <span style={{ color: 'white', textDecoration: 'underline' }}>
                                Switch Account
                            </span>
                        </Link>
                        <Link href={`#`} onClick={(e) => {
                            e.preventDefault()
                            updateProfile(user, { displayName: prompt('Enter your new display name:') })
                        }}>
                            <span style={{ color: 'white', textDecoration: 'underline', padding: '20px' }}>
                                Change Name
                            </span>
                        </Link>
                        <Link href={`/account/avatar`}>
                            <span style={{ color: 'white', textDecoration: 'underline' }}>
                                Change Avatar
                            </span>
                        </Link>
                    </div>}
                </div>
            </div>
        </>
    )
}
