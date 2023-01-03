/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import styles from "../styles/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import Head from "next/head";
import { readdirSync } from "fs";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Explore | Parakeet Games</title>
      </Head>
      <header className={styles.nav}>
        <span className={styles.navTitle}>
          <Link href={"/"} className={styles.navTitleLink}>
            Parakeet
          </Link>
        </span>
        <Link href={"/account"} className={styles.navLink} onClick={() => { (new Audio('/page.wav')).play() }}>
          <span className="material-symbols-outlined">person</span>
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
                (new Audio('/launch.wav')).play()
              }}
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${game.art.background}) center center no-repeat`,
                borderRadius: "40px"
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
                (new Audio('/launch.wav')).play()
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
          ...require("../apps/dragondungeon.json"),
          id: "dragondungeon",
          reason:
            "Claim the exclusive Elf Dragon and experience all new modes and maps. Plus, Santa makes a cameo appearance!",
        },
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
      ],
    },
  };
}
