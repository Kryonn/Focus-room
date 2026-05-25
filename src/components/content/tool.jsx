import styles from "./tool.module.css"
import { useState, useEffect } from "react"


const tool = ({ setWidget }) => {
  const [settingState, setSettingState] = useState(false);

  return (
    <div className={styles.main}>
        <div className={styles.tool}>
          <button onClick={() => {setWidget.pomodoroComponent()}} className={styles["button"]}>asd</button>
          <button onClick={() => {setWidget.listComponent()}} className={styles["button"]}>asd</button>
          <button onClick={() => {setWidget.boardComponent()}} className={styles["button"]}>asd</button>
          <button className={styles["button"]}>asd</button>
        </div>
        <div className={styles.settings}>
          <div className={`${styles.dropup} ${settingState ? "" : styles.hidden}`}>
            <a href="">Lock position</a>
            <a href="">Lock position</a>
          </div>
          <button onClick={() => {setSettingState(!settingState)}} className={`${styles["button"]} ${settingState ? styles.active : ""}`}>Settings</button>
        </div>
    </div>
  )
}
export default tool