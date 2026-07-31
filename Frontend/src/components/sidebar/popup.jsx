import styles from "./popup.module.css";
import { GridService } from "../../services/grid.service";
import { useRef } from "react";
import { DEFAULT_GRID_SETTINGS } from "../../constants/constant";

const popup = ({ accessToken, setListGridParameter, setPopupState }) => {
    const subjectNameRef = useRef(null);

    const addSubject = async () => {
        const gridName = subjectNameRef.current.value;

        await GridService.postRequest(gridName, accessToken);


        setListGridParameter((prevList) => 
            [...prevList, { name: gridName, static: DEFAULT_GRID_SETTINGS.STATIC, index: gridName }]
        )
    };

    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                setPopupState((prev) => !prev);
            }}
            className={styles.main}
        >
            <div className={styles["content-div"]}>
                <form className={styles.form} action="">
                    <p className={styles.title}>Add subject</p>
                    <div className={styles["input-div"]}>
                        <label
                            className={styles["subject-name-label"]}
                            htmlFor=""
                        >
                            Subject name
                        </label>
                        <input
                            ref={subjectNameRef}
                            className={styles["subject-name"]}
                            type=""
                        />
                    </div>
                    <button
                        onClick={() => {
                            setPopupState((prev) => !prev);
                            addSubject();
                        }}
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
export default popup;
