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
        <title>Settings | Parakeet Games</title>
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
        <ThemeOption name="DragonDungeon" text="#fff9c4" primary="#afb42b" secondary="gold" background="linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://dragondungeon.netlify.app/assets/img/game/tile.png')" />
        <ThemeOption name="WizardWars" text="#acfef6" primary="#bf5fff" secondary="#03dac4" background="linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/gameassets/wizards/background.jpg') center center fixed no-repeat" />
        <br />
        <ThemeOption name="Pride" text="black" primary="#e49ad8" secondary="#44ffbb" background="linear-gradient(90deg, #ff1313, #ff9007, #feee0c, #08f850, #3c68e2, #c745e1)" logo="/themes/pride/logo.png" />
        <ThemeOption name="Stars & Stripes" text="white" primary="#00a1de" secondary="#c60c30" background="linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2880px-Flag_of_the_United_States.svg.png') center center fixed" logo="/themes/america/logo.png" />
        <br />
        <ThemeOption name="Neon" text="white" primary="#cc10ad" secondary="#38dda1" background="linear-gradient(-45deg, #cc10ad, #38dda1)" />
        <ThemeOption name="Forest" text="#e6ffe9" primary="#0a4713" secondary="#009b3a" background="linear-gradient(-45deg, #0a4713, #009b3a)" />
        <ThemeOption name="Snow" text="#bfcdf5" primary="#00a1de" secondary="#05206b" background="linear-gradient(-45deg, #00a1de, #05206b)" />
        <ThemeOption name="Rapture" text="#e6ffe9" primary="#c60c30" secondary="#960505" background="linear-gradient(45deg, #ff0000, #000000)" />
        <ThemeOption name="Rust" text="#794c0b" primary="#fcedd8" secondary="#d28512" background="linear-gradient(-45deg, #fcedd8, #d28512)" />
        <ThemeOption name="Seafloor" text="white" primary="#0000ff" secondary="#00a1de" background="linear-gradient(0deg, black, #0000dd)" />
        <ThemeOption name="Void" text="white" primary="purple" secondary="#cc10ad" background="linear-gradient(0deg, black, black)" />
        <br /><br />
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
          window.localStorage.removeItem('customThemeLogo')
          window.location.reload()
        }}>Reset Theme</button>
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