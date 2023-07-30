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
  signOut
} from "firebase/auth"

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
        <title>Settings | Parakeet</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Settings</h1>
        {!user && (
          <p>Loading...</p>
        )}
        {user && (
          <>
            <h2>My Account</h2>
            <div>
              <h3 style={{ fontSize: '25pt' }}>
                <img src={user.photoURL || 'https://api.parakeet.games/Content/Avatars/DefaultBird.png'} height="90px" style={{ borderRadius: '500px', verticalAlign: 'middle', marginRight: '20px' }} />
                {user.displayName || user.email || user.phoneNumber || 'Anonymous Parakeet'}
              </h3>
              {user.isAnonymous && <Link
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
                    color: "var(--text)",
                    textDecoration: "underline",
                    fontSize: "1.5rem",
                  }}
                >
                  Sign in with Google
                </span>
              </Link>}
              {!user.isAnonymous && <>
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
                      color: "var(--text)",
                      textDecoration: "underline",
                      padding: "20px",
                    }}
                  >
                    Change Name
                  </span>
                </Link>
                <Link
                  href={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile(user, {
                      photoURL: prompt("Enter the URL for your new display picture:"),
                    });
                  }}
                >
                  <span
                    style={{
                      color: "var(--text)",
                      textDecoration: "underline",
                      padding: "20px",
                    }}
                  >
                    Change Picture
                  </span>
                </Link>
                <Link
                  href={`#`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut(getAuth())
                    setUser(null)
                  }}
                >
                  <span
                    style={{
                      color: "var(--text)",
                      textDecoration: "underline",
                      padding: "20px",
                    }}
                  >
                    Log Out
                  </span>
                </Link>
              </>}
              <br /><br /><br />
            </div>
          </>
        )}
        <h2>Custom Theme</h2>
        
      </div>
    </>
  );
}

function ThemeOption(props: {
  name: string,
  text: string,
  primary: string,
  secondary: string,
  background: string,
  logo?: string,
}) {
  return (
    <button style={{
      background: props.primary,
      color: props.text,
      boxShadow: `0 0 15px ${props.secondary}`,
      borderColor: props.secondary
    }} className="searchTag" onClick={() => {
      window.localStorage.setItem('customThemeWhite', props.text)
      window.localStorage.setItem('customThemePrimary', props.primary)
      window.localStorage.setItem('customThemeSecondary', props.secondary)
      window.localStorage.setItem('customThemeBackground', props.background)
      if (props.logo) {
        window.localStorage.setItem('customThemeLogo', props.logo)
      } else {
        window.localStorage.removeItem('customThemeLogo')
      }
      window.location.reload()
    }}>{props.name}</button>
  )
}