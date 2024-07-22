/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Link from "next/link";
import packageJSON from '../package.json'

export default function DeveloperPortal() {
    return <div>
        <div className="p-8">
            <h1 className="text-3xl">About Parakeet</h1>
            <h2 className="text-2xl">v{packageJSON.version}</h2>
            <div className="my-3">
                Parakeet&apos;s mission has always been to bring great games to the Web, help developers unlock their creativity, and provide a platform where Web games can thrive. To everyone who has supported us on this mission, thank you. We can&apos;t do it without you. - ❤️ Sam
            </div>
            <p className="my-2">
                <h3 className="text-xl mb-1">Parakeet Team</h3>
                Samuel Sharp
                <br />
                Sameer Prakash
                <br />
                Leo Ergen
                <br />
                James Lelgon
                <br />
                Oleks Korshak
                <br />
                Chris Woolson
                <br />
                Rowan Law
                <br />
                Denis Ergen
                <br />
                Luke Wood
            </p>
        </div>
    </div>
}