import styles from "./profile.module.css"
import profileImg from "../../assets/cachorro-joinha.jpg"

const profile = () => {
  return (
    <div className={styles.main}>
        <img className={styles.profile_img} src={profileImg} alt="" />
        <p className={styles.profile_name}>Nome</p>
    </div>
  )
}
export default profile