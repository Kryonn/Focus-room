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
        </div>
    );
};
export default sidebarButton;
