import styles from "./sidebar.module.css";
import listStyles from "./list.module.css";
import Profile from "./profile";
import List from "./list";
import SidebarButton from "./sidebarButton";
import { useRef, useState } from "react";

const sidebar = ({
    setGridObserver,
    setGridState,
    listGridParameter,
    setListGridParameter,
}) => {
    const listRef = useRef(null);
    const [sidebarMode, setSidebarMode] = useState("show");

    const buttonFunction = {
        addFunction: () => {
            const div = document.createElement("li");
            div.classList.add(`${listStyles.element}`);
            div.innerHTML = `
          <a class="${listStyles.link}" href="">asdf</a>
      `;
            listRef.current.append(div);
        },
    };

    function toggleSidebarMode() {
        sidebarMode === "show"
            ? setSidebarMode("hide")
            : setSidebarMode("show");
    }

    return (
        <nav className={`${styles.main} ${styles[sidebarMode]}`}>
            <Profile mode={sidebarMode} toggleMode={toggleSidebarMode} />
            <SidebarButton
                setGridObserver={setGridObserver}
                mode={sidebarMode}
                functions={buttonFunction}
            />
            {listGridParameter && (
                <List
                    setGridState={setGridState}
                    mode={sidebarMode}
                    listRef={listRef}
                    listGridParameter={listGridParameter}
                    setListGridParameter={setListGridParameter}
                />
            )}
        </nav>
    );
};
export default sidebar;
