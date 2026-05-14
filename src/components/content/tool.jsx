import styles from "./tool.module.css"

const tool = ({ setWidget }) => {
  return (
    <div className={styles.main}>
        <button onClick={setWidget.pomodoroComponent} className={styles.tool}>asd</button>
        <button onClick={setWidget.listComponent} className={styles.tool}>asd</button>
        <button className={styles.tool}>asd</button>
        <button className={styles.tool}>asd</button>
    </div>
  )
}
export default tool