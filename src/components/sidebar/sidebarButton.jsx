import styles from "./sidebarButton.module.css"
import searchIcon from "../../assets/search-icon.svg"
import addIcon from "../../assets/add-icon.svg"

const sidebarButton = ( { functions } ) => {
  return (
    <div className={styles.main}>
        <button className={styles.button}>
            <img src={searchIcon} alt="" />
            <p>Buscar</p>
        </button>
        <button onClick={functions.addFunction} className={styles.button}>
            <img className={styles.img} src={addIcon} alt="" />
            <p>Adicionar</p>
        </button>
    </div>
  )
}
export default sidebarButton