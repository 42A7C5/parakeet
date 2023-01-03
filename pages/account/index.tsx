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
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {!user && (
            <Link
              href={"#"}
              onClick={async (e) => {
                e.preventDefault();
                new Audio("/page.wav").play();
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
                onClick={() => new Audio("/page.wav").play()}
              >
                Sign in with Google
              </span>
            </Link>
          )}
          {user && (
            <div>
              <Link href={`/`}>
                <span
                  style={{
                    color: "white",
                    textDecoration: "underline",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => new Audio("/page.wav").play()}
                >
                  &larr; Back
                </span>
              </Link>
              <h1
                style={{
                  background: "white",
                  color: "black",
                  borderRadius: "40px",
                }}
              >
                {user.photoURL && !user.photoURL.startsWith("http") && (
                  <img
                    src={`https://api.readyplayer.me/v1/avatars/${user.photoURL}.png`}
                    height={90}
                    style={{ verticalAlign: "middle", marginRight: "10px" }}
                  />
                )}
                {user.displayName || user.email || user.phoneNumber}
              </h1>
              <h2>{user.email}</h2>
              <Link
                href={`#`}
                onClick={(e) => {
                  new Audio("/page.wav").play();
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
                  new Audio("/page.wav").play();
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
                href={`/account/avatar`}
                onClick={() => new Audio("/page.wav").play()}
              >
                <span style={{ color: "white", textDecoration: "underline" }}>
                  Change Avatar
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
