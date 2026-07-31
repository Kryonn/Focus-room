import styles from "./sidebarButton.module.css";
import searchIcon from "../../assets/search-icon.svg";
import addIcon from "../../assets/add-icon.svg";
import Popup from "./popup.jsx";
// import Popup from "../content/tool-component/popup.jsx";
import { useRef, useEffect, useState } from "react";

const sidebarButton = ({ accessToken, mode, setListGridParameter, functions }) => {
    const [popupState, setPopupState] = useState(false);
    const [searchButtonState, setSearchButtonState] = useState(true);
    const searchRef = useRef(null);
    const addRef = useRef(null);

    return (
        <div className={styles.main}>
            {popupState && (
                <Popup
                    accessToken={accessToken}
                    setListGridParameter={setListGridParameter}
                    setPopupState={setPopupState}
                />
            )}
            {/* <Popup popupTitle={"Add subject"} setPopupState={setPopupState} labelList={["Name"]} inputTypeList={[""]} /> */}
            
            <button
                onClick={() => {
                    setPopupState((prev) => !prev);
                }}
                className={`${styles.button} ${styles[mode]}`}
            >
                <img className={styles.img} src={addIcon} alt="" />
                <p
                    ref={addRef}
                    className={`${mode === "hide" ? styles["p-hidden"] : ""} ${styles["sidebar-button-p"]}`}
                >
                    Adicionar
                </p>
            </button>
            {/* <button
                onClick={(e) => {
                    // if (e.target === e.currentTarget) {
                    // }
                    if(searchButtonState) {
                        setSearchButtonState((prev) => !prev);
                    }
                }}
                className={`${styles.button} ${styles[mode]} ${setSearchButtonState ? styles["search-active"] : styles["search-no-active"]}`}
            >
                <img src={searchIcon} className={`
                        ${!searchButtonState
                            ? styles["p-hidden"]
                            : ""} ${styles["sidebar-button-p"]}
                        `
                    } alt="" />
                <input
                    className={`${styles["search-input"]} ${mode === "hide" || searchButtonState ? styles["input-hidden"] : ""}`}
                    type="text"
                />
                <p
                    ref={searchRef}
                    className={`
                        ${mode === "hide" || !searchButtonState
                            ? styles["p-hidden"]
                            : ""} ${styles["sidebar-button-p"]}
                        `
                    }
                >
                    Buscar
                </p>
            </button> */}
        </div>
    );
};
export default sidebarButton;
