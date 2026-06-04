import styles from "./sidebarButton.module.css"
import searchIcon from "../../assets/search-icon.svg"
import addIcon from "../../assets/add-icon.svg"
import { useRef, useEffect } from "react"


const sidebarButton = ( { mode, functions } ) => {

  const searchRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    const search = searchRef.current;
    const add = addRef.current;

    search.addEventListener("transitioned", () => {
      search.style.display = "none";
      search.style.justifyContent = "center";
    });

    add.addEventListener("transitioned", () => {
      add.style.display = "none";
      add.style.justifyContent = "center";
    })
  }, []);

  return (
    <div className={styles.main}>
        <button className={`${styles.button} ${styles[mode]}`}>
            <img src={searchIcon} alt="" />
            <p ref={searchRef} className={mode === "hide" ? styles["hidden"] : ""}>Buscar</p>
        </button>
        <button onClick={functions.addFunction} className={`${styles.button} ${styles[mode]}`}>
            <img className={styles.img} src={addIcon} alt="" />
            <p ref={addRef} className={mode === "hide" ? styles["hidden"] : ""} >Adicionar</p>
        </button>
    </div>
  )
}
export default sidebarButton