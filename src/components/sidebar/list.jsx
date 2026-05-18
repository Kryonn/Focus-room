import styles from "./list.module.css"

const list = ( { listRef } ) => {
  return (
    <nav className={styles.main}>
        <ul ref={listRef} className={styles.list}>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
            
        </ul>
    </nav>
  )
}
export default list