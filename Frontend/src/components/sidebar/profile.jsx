import styles from "./profile.module.css"
import profileImg from "../../assets/logo.svg"
import hideIcon from "../../assets/chevron-left-icon.svg";
import { useEffect, useRef } from "react";

const profile = ({ mode, toggleMode }) => {

  const profileRef = useRef(null);
  
  useEffect(() => {

    const element = profileRef.current;

    element.addEventListener("transitioned", () => {
      element.style.display = "none";
      element.style.justifyContent = "center";
    });

  }, []);

  return (
    <div className={`${styles.main} ${styles[mode]}`}>
        <img onClick={() => {if(mode === "hide") { toggleMode() }}} className={styles.profile_img} src={profileImg} alt="" />
        <button ref={profileRef} onClick={toggleMode} className={`${styles["hide-button"]} ${styles[mode]}`} type="button">
          <img className={styles["hide-image"]} src={hideIcon} alt="" />
        </button>
        {/* <img src="" alt="" /> */}
        {/* <p className={styles.profile_name}>Nome</p> */}
    </div>
  )
}
export default profile