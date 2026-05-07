import styles from "./tool.module.css"

const tool = ({ buttonFunction }) => {
  return (
    <div className={styles.main}>
        <button onClick={buttonFunction} className={styles.tool}>asd</button>
        <button className={styles.tool}>asd</button>
        <button className={styles.tool}>asd</button>
        <button className={styles.tool}>asd</button>
    </div>
  )
}
export default tool