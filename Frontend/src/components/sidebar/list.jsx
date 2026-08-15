// CSS
import styles from "./list.module.css";

// React
import { useEffect, useRef } from "react";

// Services
import { GridService } from "../../services/grid.service";

const list = ({
    accessToken,
    setGridState,
    gridState,
    mode,
    listRef,
    listGridParameter,
    setListGridParameter,
}) => {

    return (
        <nav
            className={`${styles.main} ${mode === "hide" ? styles["hidden"] : ""}`}
        >
            <ul ref={listRef} className={styles.list}>
                {listGridParameter.map((listElement, index) => (
                    <li
                        onClick={() => setGridState(index)}
                        key={listElement.name}
                        className={`${styles.element} element ${index === gridState ? styles.selected : ""}`}
                    >
                        <a className={styles.link}>
                            <p>{listElement.name}</p>
                            <button
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    const grid = e.target.closest(".element");
                                    const gridName = listElement.name;

                                    try {
                                        await GridService.deleteRequest(
                                            gridName,
                                            accessToken
                                        );
                                        setListGridParameter((prevList) =>
                                            prevList.filter(
                                                (item) =>
                                                    item.name !== gridName,
                                            ),
                                        );
                                        if(gridState === index) {
                                            setGridState(prev => prev - 1);
                                        }
                                    } catch (err) {
                                        // console.log(err.message);
                                    }
                                }}
                                className={styles["grid-delete-button"]}
                            >
                                <svg className={styles["grid-delete-button-icon"]} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
                                </svg>
                            </button>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default list;
