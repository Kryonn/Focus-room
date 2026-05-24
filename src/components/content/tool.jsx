import styles from "./tool.module.css"

const tool = ({ setWidget }) => {
  return (
    <div className={styles.main}>
        <div className={styles.tool}>
          <button onClick={setWidget.pomodoroComponent} className={styles["button"]}>asd</button>
          <button onClick={setWidget.listComponent} className={styles["button"]}>asd</button>
          <button onClick={setWidget.boardComponent} className={styles["button"]}>asd</button>
          <button className={styles["button"]}>asd</button>
        </div>
        <div className={styles.setting}>
          <button className={styles["button"]}>asd</button>
        </div>
    </div>
  )
}
export default tool