import styles from "./sidebarButton.module.css"
import searchIcon from "../../assets/search-icon.svg"
import addIcon from "../../assets/add-icon.svg"

const sidebarButton = ( { mode, functions } ) => {
  return (
    <div className={styles.main}>
        <button className={`${styles.button} ${styles[mode]}`}>
            <img src={searchIcon} alt="" />
            <p className={mode === "hide" ? styles["hidden"] : ""}>Buscar</p>
        </button>
        <button onClick={functions.addFunction} className={`${styles.button} ${styles[mode]}`}>
            <img className={styles.img} src={addIcon} alt="" />
            <p className={mode === "hide" ? styles["hidden"] : ""} >Adicionar</p>
        </button>
    </div>
  )
}
export default sidebarButton