/****************************
© 2019-present Samuel Sharp. All rights reserved.
****************************/

import Image from "next/image";
import Link from "next/link";

export default function DragonDungeonLanding() {
    return <div>
        <Image alt='' src={'/assets/img/tiles/dragondungeon/background.png'} width={1920} height={600} className="object-cover mt-5 h-[20vh] border-t-4 border-primary" />
        <Image alt='' src={'/assets/img/tiles/dragondungeon/logo.png'} width={999} height={999} className="max-h-48 w-auto -translate-y-32 scale-90" />
        <div className="p-8 -translate-y-36">
            <h1 className="text-4xl">Enter the Farlands. Only on Parakeet.</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 -translate-y-36">
            <div className="bg-surface p-4 rounded-xl">
                <Image alt="Icon of a small character" src={'/assets/dd-landing/firemind.png'} width={200} height={200} className="h-28 w-auto float-left mr-5" style={{ imageRendering: 'pixelated' }} />
                <h3 className="text-2xl">Explore a vast world.</h3>
                <p className="text-lg">Uncover the secrets of the Farlands, a vast world filled with danger and adventure, with action-packed and fully voiced story chapters releasing every week.</p>
            </div>
            <div className="bg-surface p-4 rounded-xl">
                <Image alt="Icon of a fireball" src={'/assets/dd-landing/fireball.png'} width={200} height={200} className="h-28 w-auto float-left mr-5" style={{ imageRendering: 'pixelated' }} />
                <h3 className="text-2xl">Pick your poison.</h3>
                <p className="text-lg">5 unique abilities, 5 unique ways to play. Stalk your enemies with the slow-moving but hard-hitting Poisonball, or light &apos;em up with the violent chain reactions of the Electricball!</p>
            </div>
            <div className="bg-surface p-4 rounded-xl">
                <Image alt="Icon of a coin flask" src={'/assets/dd-landing/coinflask.png'} width={200} height={200} className="h-28 w-auto float-left mr-5" style={{ imageRendering: 'pixelated' }} />
                <h3 className="text-2xl">Take those coins to the bank!</h3>
                <p className="text-lg">Battle it out against other Dragons in multiplayer mode! Prove your might as you race against the clock to collect coins from across the Farlands. <i>Multiplayer mode will be available after launch.</i></p>
            </div>
            <div className="bg-surface p-4 rounded-xl">
                <Image alt="Icon of a coin" src={'/assets/dd-landing/coin.png'} width={200} height={200} className="h-28 w-auto float-left mr-5" style={{ imageRendering: 'pixelated' }} />
                <h3 className="text-2xl">Always something new out there.</h3>
                <p className="text-lg">We&apos;re committed to keeping DragonDungeon up to date with new features and content! Story chapters, patches, and balancing fixes will all be offered after the initial launch.</p>
            </div>
        </div>
        <div className="text-center -translate-y-36">
            <h3 className="text-2xl">Ready to play? Come back soon.</h3>
        </div>
    </div>
}