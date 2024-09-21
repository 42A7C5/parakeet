/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import type { User } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AccountMgr() {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        onAuthStateChanged(getAuth(), user => {
            if (user) {
                setUser(user)
            }
        })
    })

    return (<>
        <div className='p-8'>
            <h1 className='text-3xl'>Account</h1>
            {user && <h2 className='text-2xl mt-1'>
                <img src={user.photoURL || '/assets/img/brand/default-user.png'} alt="User profile picture" className='rounded-full h-10 inline-block mr-2 align-middle' />
                Welcome, {user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}!
            </h2>}
            {!user && <h2 className='text-2xl'>Loading your account details...</h2>}
            <div className='mt-6'>
                {user?.isAnonymous && <>
                    <Link href='#' onClick={(e) => {
                        e.preventDefault()
                        signInWithPopup(getAuth(), new GoogleAuthProvider())
                    }} className='whitespace-nowrap p-3 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">password</span> Sign in with Google</Link>
                </>}
                {(user && !user?.isAnonymous) && <>
                    <Link href='#' onClick={(e) => {
                        e.preventDefault()
                        if (user) {
                            updateProfile(user, {
                                displayName: prompt("Enter your new display name:"),
                            }).then(() => {
                                window.location.reload()
                            });
                        }
                    }} className='whitespace-nowrap my-1 inline-block md:inline md:my-0 p-3 mr-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">person</span> Change Username</Link>
                    <Link href='#' onClick={(e) => {
                        e.preventDefault()
                        if (user) {
                            updateProfile(user, {
                                photoURL: prompt("Enter your new profile picture URL:"),
                            }).then(() => {
                                window.location.reload()
                            });
                        }
                    }} className='whitespace-nowrap my-1 inline-block md:inline md:my-0 p-3 mr-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">photo</span> Change Profile Picture</Link>
                    <Link href='#' onClick={(e) => {
                        e.preventDefault()
                        signOut(getAuth())
                        setUser(undefined)
                    }} className='whitespace-nowrap my-1 inline-block md:inline md:my-0 p-3 mr-1 bg-surface hover:text-primary transition-colors rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">logout</span> Log Out</Link>
                </>}
            </div>
        </div>
    </>)
}