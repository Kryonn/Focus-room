import styles from "./auth.module.css"
import Signinup from "./signinup.jsx"
import cachorroJoinha from "../../assets/cachorro-joinha.jpg"
import pomodoroImg from "../../assets/pomodoro.png"

const auth = ({ setScreen }) => {
  return (
    <div className={styles.main}>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.94/build/spline-viewer.js"></script>
        <spline-viewer url="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode" className={styles.spline}></spline-viewer>
        <div className={styles.content}>
            <Signinup className={styles.auth} setScreen={ setScreen }/>
            {/* <img className={styles.img} src={pomodoroImg} alt="" /> */}
            {/* <spline-viewer className={styles.img} url="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode"></spline-viewer> */}
        </div>
    </div>
  )
}
export default auth