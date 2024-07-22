/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Link from "next/link";

export default function DeveloperPortal() {
    return <div>
        <div className="p-8">
            <h1 className="text-3xl">Parakeet ❤️ Game Developers</h1>
            <h2 className="text-2xl">Got an idea? Parakeet can help you bring it to life.</h2>
        </div>
        <video src="/assets/img/brand/devs.mp4" autoPlay loop muted className="w-screen object-cover h-[40vh] border-y-4 border-primary"></video>
        <div className="p-8">
            <div className="text-center">
                <Link href='/settings' className='whitespace-nowrap my-2 p-3 m-1 bg-surface hover:text-primary rounded-md text-md'><span className="material-symbols-outlined translate-y-1.5">person</span> Sign in to developer portal</Link>
            </div>
        </div>
    </div>
}