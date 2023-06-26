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
        <title>Settings | Parakeet Games</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Settings</h1>
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
                color: "var(--text)",
                textDecoration: "underline",
                fontSize: "1.5rem",
              }}
            >
              Sign in with Google
            </span>
          </Link>
        )}
        {user && (
          <>
            <h2>My Account</h2>
            <div>
              <h3 style={{ fontSize: '25pt' }}>
                <img src={user.photoURL} height="90px" style={{ borderRadius: '500px', verticalAlign: 'middle', marginRight: '20px' }} />
                {user.displayName || user.email || user.phoneNumber}
              </h3>
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
            </div>
          </>
        )}
        <h2>Custom Theme</h2>
        <button style={{
          background: 'white',
          color: 'black',
          boxShadow: '0 0 10px white',
          borderColor: 'white'
        }} className="searchTag" onClick={() => {
          window.localStorage.removeItem('customThemeWhite')
          window.localStorage.removeItem('customThemePrimary')
          window.localStorage.removeItem('customThemeSecondary')
          window.localStorage.removeItem('customThemeBackground')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Auto (Default)</button>
        <button style={{
          background: '#cc10ad',
          color: 'white',
          boxShadow: '0 0 10px #38dda1',
          borderColor: '#38dda1'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', 'white')
          window.localStorage.setItem('customThemePrimary', '#cc10ad')
          window.localStorage.setItem('customThemeSecondary', '#38dda1')
          window.localStorage.setItem('customThemeBackground', 'purple')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Classic</button>
        <button style={{
          background: 'linear-gradient(90deg, #5e0707, #8a4d03, #746d03, #008026, #24408E, #732982)',
          color: 'white',
          boxShadow: '0 0 10px white',
          borderColor: 'white'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', 'black')
          window.localStorage.setItem('customThemePrimary', '#e49ad8')
          window.localStorage.setItem('customThemeSecondary', '#44ffbb')
          window.localStorage.setItem('customThemeBackground', 'white')
          window.localStorage.setItem('customThemeGradient', 'linear-gradient(90deg, #ff1313, #ff9007, #feee0c, #08f850, #3c68e2, #c745e1), var(--background)')
          window.location.reload()
        }}>Pride</button>
        <button style={{
          background: '#0a4713',
          color: '#e6ffe9',
          boxShadow: '0 0 10px #009b3a',
          borderColor: '#009b3a'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', '#e6ffe9')
          window.localStorage.setItem('customThemePrimary', '#0a4713')
          window.localStorage.setItem('customThemeSecondary', '#009b3a')
          window.localStorage.setItem('customThemeBackground', 'green')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Forest Green</button>
        <button style={{
          background: '#00a1de',
          color: '#bfcdf5',
          boxShadow: '0 0 10px #05206b',
          borderColor: '#05206b'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', '#bfcdf5')
          window.localStorage.setItem('customThemePrimary', '#00a1de')
          window.localStorage.setItem('customThemeSecondary', '#05206b')
          window.localStorage.setItem('customThemeBackground', 'blue')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Beach Blue</button>
        <button style={{
          background: '#c60c30',
          color: '#e6ffe9',
          boxShadow: '0 0 10px #960505',
          borderColor: '#960505'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', '#e6ffe9')
          window.localStorage.setItem('customThemePrimary', '#c60c30')
          window.localStorage.setItem('customThemeSecondary', '#960505')
          window.localStorage.setItem('customThemeBackground', 'red')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Ravenous Red</button>
        <button style={{
          background: '#794c0b',
          color: '#fcedd8',
          boxShadow: '0 0 10px #d28512',
          borderColor: '#d28512'
        }} className="searchTag" onClick={() => {
          window.localStorage.setItem('customThemeWhite', '#794c0b')
          window.localStorage.setItem('customThemePrimary', '#fcedd8')
          window.localStorage.setItem('customThemeSecondary', '#d28512')
          window.localStorage.setItem('customThemeBackground', '#241700')
          window.localStorage.removeItem('customThemeGradient')
          window.location.reload()
        }}>Rusted Metal</button>
      </div>
    </>
  );
}
