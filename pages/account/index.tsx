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

export default function Account() {
  let [user, setUser] = useState<any>();

  useMemo(async () => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Account | Parakeet Games</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {!user && (
            <Link
              href={"#"}
              onClick={async (e) => {
                e.preventDefault();
                let user = await signInWithPopup(
                  getAuth(),
                  new GoogleAuthProvider()
                );
                setUser(user.user);
              }}
            >
              <span
                style={{
                  color: "white",
                  textDecoration: "underline",
                  fontSize: "1.5rem",
                }}
              >
                Sign in with Google
              </span>
            </Link>
          )}
          {user && (
            <div>
              <h2 style={{ fontSize: '25pt' }}>
                <img src={user.photoURL} height="90px" style={{ borderRadius: '500px', verticalAlign: 'middle', marginRight: '20px' }} />
                {user.displayName || user.email || user.phoneNumber}
              </h2>
              <Link
                href={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  setUser(undefined);
                }}
              >
                <span style={{ color: "white", textDecoration: "underline" }}>
                  Switch Account
                </span>
              </Link>
              <Link
                href={`#`}
                onClick={(e) => {
                  e.preventDefault();
                  updateProfile(user, {
                    displayName: prompt("Enter your new display name:"),
                  });
                }}
              >
                <span
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    padding: "20px",
                  }}
                >
                  Change Name
                </span>
              </Link>
              <Link
                href={`/account/gamerpic`}
              >
                <span style={{ color: "white", textDecoration: "underline" }}>
                  Change Picture
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
