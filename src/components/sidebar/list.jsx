import styles from "./list.module.css"

const list = () => {
  return (
    <nav className={styles.main}>
        <ul className={styles.list}>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            
        </ul>
    </nav>
  )
}
export default list