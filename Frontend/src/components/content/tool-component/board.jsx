import styles from "./board.module.css";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

const board = () => {
    return (
        <div className={styles.main}>
            <div className="handle">asdasd</div>
            <Tldraw />
        </div>
    );
};
export default board;
