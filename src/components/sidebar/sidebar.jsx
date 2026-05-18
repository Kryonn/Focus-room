import styles from "./sidebar.module.css"
import listStyles from "./list.module.css"
import Profile from "./profile"
import List from "./list"
import SidebarButton from "./sidebarButton"
import { useRef } from "react";

const sidebar = () => {
  const listRef = useRef(null);

  const buttonFunction = {
    addFunction: () => {
      const div = document.createElement("li");
      div.classList.add(`${listStyles.element}`);
      div.innerHTML = `
          <a class="${listStyles.link}" href="">asdf</a>
      `
      listRef.current.append(div);
    }
  }


  return (
    <nav className={styles.main}>
        <Profile/>
        <SidebarButton functions={buttonFunction}/>
        <List listRef={listRef}/>
    </nav>
  )
}
export default sidebar