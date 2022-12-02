import styles from '../styles/Home.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export default function Home() {
  return (
    <>
      <div className={styles.gameList}>
        <div className={styles.gameotw} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <div>
            <img src="https://dragondungeon.io/assets/img/skins/basic.png" style={{ height: '120px' }} />
            <p><b>Featured Game</b> | Play the exclusive Holiday Mayhem event through Jan 1.</p>
          </div>
        </div>
        <div className={styles.game} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <img src="https://dragondungeon.io/assets/img/skins/basic.png" alt="" />
        </div>
        <div className={styles.game} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <img src="https://dragondungeon.io/assets/img/skins/basic.png" alt="" />
        </div>
        <div className={styles.game} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <img src="https://dragondungeon.io/assets/img/skins/basic.png" alt="" />
        </div>
        <div className={styles.game} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <img src="https://dragondungeon.io/assets/img/skins/basic.png" alt="" />
        </div>
        <div className={styles.game} style={{ background: 'url(https://dragondungeon.io/assets/img/game/bt-bg.png) center center no-repeat', boxShadow: '0 0 20px red', border: '0px solid red' }}>
          <img src="https://dragondungeon.io/assets/img/skins/basic.png" alt="" />
        </div>
      </div>
    </>
  )
}
