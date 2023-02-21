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
                        <h1>Change nameplate for {user.displayName || user.email || user.phoneNumber}</h1>
                        <button style={{ borderRadius: '10px', height: '70px', padding: '3px', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={
                            () => {
                                updateProfile(user, { photoURL: 'https://docs.google.com/drawings/d/e/2PACX-1vTuVUx_Ksmp9zo-fFB9jPw06DDOLOsI2ayvk1VvvJS-_oJR9_KZI9HKnmrXvsWug2hEwL-J_U34evw3/pub?w=700&amp;h=200' })
                                router.push('/account');
                            }
                        }><img src="https://docs.google.com/drawings/d/e/2PACX-1vTuVUx_Ksmp9zo-fFB9jPw06DDOLOsI2ayvk1VvvJS-_oJR9_KZI9HKnmrXvsWug2hEwL-J_U34evw3/pub?w=700&amp;h=200" style={{
                            height: '100%',
                            width: '100%',
                            padding: 'none',
                            margin: 'none',
                            borderRadius: '10px'
                        }} alt="Where It All Began" /></button>
                        <h3>Where It All Began</h3>
                        <p>Remember.</p>
                    </>
                )}
            </div>
        </>
    );
}
