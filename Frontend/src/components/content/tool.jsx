import styles from "./tool.module.css"
import { useState, useEffect } from "react"


const tool = ({ setWidget, gridRef }) => {
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
            <button className={styles["settings-button"]} onClick={(e) => {e.preventDefault(); gridRef.setStatic(!gridRef.opts.staticGrid) }}>Lock grid</button>
            <button className={styles["settings-button"]} onClick={(e) => {e.preventDefault(); gridRef.removeAll() }}>Clear grid</button>
          </div>
          <div onClick={(e) => {e.preventDefault(); setSettingState(!settingState)}} className={`${styles["settings-div"]} ${settingState ? styles.active : ""}`}><span>Settings</span></div>
        </div>
    </div>
  )
}
export default tool