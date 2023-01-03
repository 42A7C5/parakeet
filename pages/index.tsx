/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import styles from "../styles/Page.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import Head from "next/head";
import { readdirSync } from "fs";
import { useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home(props: any) {
  let [user, setUser] = useState<any>();
  let [userStateDetermined, setUserStateDetermined] = useState<any>();

  useMemo(async () => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      }
      setUserStateDetermined(true);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Explore | Parakeet Games</title>
      </Head>
      <header className={styles.nav}>
        <h1 className={styles.navTitle}>Parakeet</h1>
        <Link
          href={"/account"}
          onClick={() => {
            new Audio("/page.wav").play();
          }}
        >
          {userStateDetermined && (
            <h1
              style={{
                border: '3px solid white',
                color: "white",
                borderRadius: "20px",
                fontSize: "20pt",
                verticalAlign: 'middle',
                paddingRight: '20px'
              }}
            >
              {user?.photoURL && !user.photoURL.startsWith("http") && (
                <img
                  src={`https://api.readyplayer.me/v1/avatars/${user.photoURL}.png`}
                  height={60}
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px",
                    flexGrow: 1,
                  }}
                />
              )}
              <span
                style={{
                  verticalAlign: "middle",
                  margin:
                    user?.displayName ||
                    user?.email ||
                    user?.phoneNumber ||
                    "20px",
                }}
              >
                {user?.displayName ||
                  user?.email ||
                  user?.phoneNumber ||
                  "Log In"}
              </span>
            </h1>
          )}
        </Link>
      </header>
      <Carousel
        className={styles.carousel}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
      >
        {props.picks.map((game: any) => (
          <Link key={game.id} href={`/play/${game.id}`}>
            <div
              className={styles.gameotw}
              onClick={() => {
                new Audio("/launch.wav").play();
              }}
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${game.art.background}) center center no-repeat`,
                borderRadius: "40px",
              }}
            >
              <div>
                <img
                  src={game.art.logo}
                  style={{ height: "120px", width: "auto" }}
                  alt={game.name}
                />
                <p
                  style={{
                    fontSize: "18pt",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {game.reason}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <div className={styles.gameList}>
        {props.games.map((game: any) => (
          <Link
            key={game.id}
            href={`/play/${game.id}`}
            style={{ flex: "300px" }}
          >
            <div
              className={styles.game}
              onClick={() => {
                new Audio("/launch.wav").play();
              }}
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game.art.background}) center center no-repeat`,
                boxShadow: `0 0 30px ${game.color}`,
                border: `0px solid ${game.color}`,
              }}
            >
              <img src={game.art.logo} width={350} alt={game.name} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let games: any[] = [];
  readdirSync("apps").forEach((game) => {
    games.push({
      ...require("../apps/" + game),
      id: game.replace(".json", ""),
    });
  });
  return {
    props: {
      games,
      picks: [
        {
          ...require("../apps/mapple.json"),
          id: "mapple",
          reason: "Can you guess the country?",
        },
        {
          ...require("../apps/wizards.json"),
          id: "wizards",
          reason: "New spells make this magical arena shooter even more fun!",
        },
        {
          ...require("../apps/bulletz.json"),
          id: "bulletz",
          reason: "Celebrating over 10k active Bulletz users!",
        },
      ],
    },
  };
}
