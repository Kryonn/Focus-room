import styles from "./note.module.css";

const note = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <p>Título legal</p>
                <div className={styles["button-div"]}></div>
            </div>
            <div className={styles["text-div"]}>
                <textarea className={styles["text-input"]} name=""></textarea>
            </div>
        </div>
    );
};
export default note;
