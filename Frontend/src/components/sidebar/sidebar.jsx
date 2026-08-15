import styles from "./sidebar.module.css";
import listStyles from "./list.module.css";
import Profile from "./profile";
import List from "./list";
import SidebarButton from "./sidebarButton";
import { useRef, useState } from "react";
import { AuthService } from "../../services/auth.service";
import logoutIcon from "../../assets/logout-icon.svg";

const sidebar = ({
    setScreen,
    accessToken,
    setGridState,
    gridState,
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
                accessToken={accessToken}
                mode={sidebarMode}
                setListGridParameter={setListGridParameter}
                functions={buttonFunction}
            />
            {listGridParameter && (
                <List
                    accessToken={accessToken}
                    setGridState={setGridState}
                    gridState={gridState}
                    mode={sidebarMode}
                    listRef={listRef}
                    listGridParameter={listGridParameter}
                    setListGridParameter={setListGridParameter}
                />
            )}
            <button onClick={() => { window.location = window.location.origin; AuthService.logoutPostRequest(accessToken); setScreen("auth");   }} className={`${styles.button} ${styles[sidebarMode]}`}>
                <img className={styles.img} src={logoutIcon} alt="" />
                <p
                    className={`${sidebarMode === "hide" ? styles["p-hidden"] : ""} ${styles["sidebar-button-p"]}`}
                >
                    Logout
                </p>
            </button>
        </nav>
    );
};
export default sidebar;
