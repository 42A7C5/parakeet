/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    getAuth,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function Account() {
    let [user, setUser] = useState<any>();

    useMemo(async () => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    let router = useRouter()

    return (
        <>
            <Head>
                <title>Account | Parakeet Games</title>
            </Head>
            <div style={{ textAlign: "center" }}>
                {!user && (
                    <Link
                        href={"/account"}
                    >
                        <span
                            style={{
                                color: "white",
                                textDecoration: "underline",
                                fontSize: "1.5rem",
                            }}
                        >
                            You must log in to change your profile.
                        </span>
                    </Link>
                )}
                {user && (
                    <>
                        <h1>Change picture for {user.displayName || user.email || user.phoneNumber}</h1>
                        <button style={{ borderRadius: '10px', height: '70px', padding: '3px', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={
                            () => {
                                updateProfile(user, { photoURL: 'https://docs.google.com/drawings/d/e/2PACX-1vTibkmEAleuRdJjh2XmHV9qU3nhotZsRRGa-0Gxdf8kF-kwFogdtrSFEU60y4lM0kDO7mNDpB6t4y7d/pub?w=512&h=512' })
                                router.push('/account');
                            }
                        }><img src="https://docs.google.com/drawings/d/e/2PACX-1vTibkmEAleuRdJjh2XmHV9qU3nhotZsRRGa-0Gxdf8kF-kwFogdtrSFEU60y4lM0kDO7mNDpB6t4y7d/pub?w=512&h=512" style={{
                            height: '100%',
                            width: '100%',
                            padding: 'none',
                            margin: 'none',
                            borderRadius: '500px'
                        }} /></button>
                    </>
                )}
            </div>
        </>
    );
}
