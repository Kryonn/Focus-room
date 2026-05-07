import styles from "./sidebar.module.css"
import Profile from "./profile"
import List from "./list"
import SidebarButton from "./sidebarButton"

const sidebar = () => {
  return (
    <nav className={styles.main}>
        <Profile/>
        <SidebarButton/>
        <List/>
    </nav>
  )
}
export default sidebar