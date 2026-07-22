import styles from "./notepopup.module.css";
import { WidgetService } from "../../../services/widget.service.js";
import { useRef, useState } from "react";

const notepopup = ({ username, gridname, id, setNoteName, setNotePopup }) => {
    const taskDateRef = useRef(null);
    const taskNameRef = useRef(null);

    return (
        <div onClick={(e) => { if(e.target === e.currentTarget) { setNotePopup(prev => !prev) } }} className={styles.main}>
            <div className={styles["content-div"]}>
                <form className={styles.form} action="">
                    <p className={styles.title}>Edit note name</p>
                    <div className={styles["input-div"]}>
                        <label
                            className={styles["subject-name-label"]}
                            htmlFor=""
                        >
                            Name
                        </label>
                        <input ref={taskNameRef}
                            className={styles["subject-name"]}
                            type=""
                        />
                    </div>
                    <button
                        onClick={() => { setNotePopup(prev => !prev); setNoteName(taskNameRef.current.value); WidgetService.putNoteNameRequest(username, gridname, id, taskNameRef.current.value) }}
                        className={styles.button}
                        type="button"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};
export default notepopup;
