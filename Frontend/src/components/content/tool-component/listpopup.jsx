import styles from "./listpopup.module.css";
import { useRef, useState } from "react";

const listpopup = ({ setUpdateListPopupState, setAddListPopupState, addTask, popupEvent, setListName }) => {
    const taskDateRef = useRef(null);
    const taskNameRef = useRef(null);
    const [isEditName, setIsEditName] = useState(popupEvent.includes("Edit"));

    return (
        <div onClick={(e) => {if(e.target === e.currentTarget) { popupEvent.includes("Add") ? setAddListPopupState(prev => !prev) : setUpdateListPopupState(prev => !prev) }}} className={styles.main}>
            <div className={styles["content-div"]}>
                <form className={styles.form} action="">
                    <p className={styles.title}>{popupEvent}</p>
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
                    { !isEditName && (<div className={styles["input-div"]}>
                        <label
                            className={styles["subject-name-label"]}
                            htmlFor=""
                        >
                            Deadline
                        </label>
                        <input ref={taskDateRef}
                            className={styles["subject-name"]}
                            type="date"
                        />
                    </div>) }
                    <button
                        onClick={() => { if(isEditName) { setListName(taskNameRef.current.value); setUpdateListPopupState(prev => !prev)} else {addTask(taskNameRef.current.value, taskDateRef.current.value); setAddListPopupState(prev => !prev) }}}
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
export default listpopup;
