/****************************
© 2019-present LeagueXP. All rights reserved.
****************************/

import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { initializeApp } from "firebase/app";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  useMemo(() => {
    initializeApp({
      apiKey: "AIzaSyCVRdvjxtTS5DV__if3-81t_fYp5GUod-U",
      authDomain: "parakeetapi.firebaseapp.com",
      projectId: "parakeetapi",
      storageBucket: "parakeetapi.appspot.com",
      messagingSenderId: "163437557468",
      appId: "1:163437557468:web:ca1358397b5b9da133a619",
    });
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container);
  }, []);

  return (
    <>
      <Head>
        <title>Parakeet Games</title>
      </Head>
      <Particles
        id="tsparticles"
        url="/particles.json"
        init={particlesInit}
        loaded={particlesLoaded}
      />
      <AnimatePresence initial={false} mode={'wait'}>
        <motion.div
          key={asPath}
          variants={{
            out: {
              opacity: 0,
              y: 40,
              transition: {
                duration: 0.4,
              },
            },
            in: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
              },
            },
          }}
          animate="in"
          initial="out"
          exit="out"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
