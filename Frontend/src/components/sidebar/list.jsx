import styles from "./list.module.css"

const list = ( { mode, listRef } ) => {
  return (
    <nav className={`${styles.main} ${mode === "hide" ? styles["hidden"] : "" }`}>
        <ul ref={listRef} className={styles.list}>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
        </ul>
    </nav>
  )
}
export default list