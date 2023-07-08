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
    signOut,
    getIdToken
} from "firebase/auth"

export default function Account() {
    let [user, setUser] = useState<any>();
    let [redirectURL, setRedirectURL] = useState<string | null>(null);
    let [token, setToken] = useState<string | null>(null);

    useMemo(async () => {
        if (typeof window !== 'undefined') {
            setRedirectURL(new URLSearchParams(window.location.search)?.get('redirect'))
        }

        onAuthStateChanged(getAuth(), async (newUser) => {
            if (newUser) {
                setUser(newUser);
                setToken(await getIdToken(newUser))
            }
        });
    }, []);

    return (
        <>
            <Head>
                <title>SSO | Parakeet Games</title>
            </Head>
            <div style={{ textAlign: "center" }}>
                <h1>Developer Auth Tool</h1>
                <h2>The application you are about to send your credentials to is <u>NOT</u> verified by Parakeet!</h2>
                {!user && <p>You must be logged in to Parakeet in order to use the Developer Authentication Tool.</p>}
                {user && (
                    <>
                        <br /><br />
                        <h3 style={{ fontSize: '25pt' }}>
                            <img src={user.photoURL || 'https://api.parakeet.games/Content/Avatars/DefaultBird.png'} height="90px" style={{ borderRadius: '500px', verticalAlign: 'middle', marginRight: '20px' }} />
                            {user.displayName || user.email || user.phoneNumber}
                        </h3>
                        <br /><br /><br />
                        {redirectURL && <Link href={redirectURL + `?user=${token}`} className="bigButton">Send credentials to {redirectURL}</Link>}
                        {!redirectURL && <a className="bigButton">No redirect URL provided</a>}
                    </>
                )}
            </div>
        </>
    );
}