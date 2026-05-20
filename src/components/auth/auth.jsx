import styles from "./auth.module.css"
import Signinup from "./signinup.jsx"
import cachorroJoinha from "../../assets/cachorro-joinha.jpg"
import pomodoroImg from "../../assets/pomodoro.png"
import { useRef, useEffect } from "react"
import Spline from '@splinetool/react-spline'

const auth = ({ setScreen }) => {
  const splineRef = useRef(null)

  const getSplineRef = (spline) => {
    splineRef.current = spline;
  }

  useEffect(() => {
    return () => {
      if(splineRef.current) {
        splineRef.current.dispose();
        splineRef.current = null;
      }
    }
  }, []);


  return (
    <div className={styles.main}>
        {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.94/build/spline-viewer.js"></script> */}
        {/* <spline-viewer url="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode" onLoad={getSplineRef} className={styles.spline}></spline-viewer> */}
        <Spline scene="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode" onLoad={getSplineRef} className={styles.spline}/>
        <div className={styles.content}>
            <Signinup className={styles.auth} setScreen={ setScreen }/>
            {/* <img className={styles.img} src={pomodoroImg} alt="" /> */}
            {/* <spline-viewer className={styles.img} url="https://prod.spline.design/H9q8WTUpX4ZTzm35/scene.splinecode"></spline-viewer> */}
        </div>
    </div>
  )
}
export default auth