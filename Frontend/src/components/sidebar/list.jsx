import styles from "./list.module.css"
import { useEffect, useRef } from "react"

const list = ( { mode, listRef } ) => {

  const navRef = useRef(null);

  useEffect(() => {
    const list = navRef.current;

    list.addEventListener("transitioned", () => {
      list.style.display = "none";
    })
  }, []);

  return (
    <nav ref={navRef} className={`${styles.main} ${mode === "hide" ? styles["hidden"] : "" }`}>
        <ul ref={listRef} className={styles.list}>
            <li className={styles.element}>
              <a className={styles.link} href="">asdf</a>
            </li>
        </ul>
    </nav>
  )
}
export default list