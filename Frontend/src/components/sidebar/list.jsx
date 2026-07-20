import styles from "./list.module.css";
import { useEffect, useRef } from "react";
import { GridService } from "../../services/grid.service";

const list = ({
    setGridObserver,
    setGridState,
    mode,
    listRef,
    listGridParameter,
    setListGridParameter,
}) => {
    const navRef = useRef(null);

    useEffect(() => {
        const list = navRef.current;

        list.addEventListener("transitioned", () => {
            list.style.display = "none";
        });

    }, []);

    return (
        <nav
            ref={navRef}
            className={`${styles.main} ${mode === "hide" ? styles["hidden"] : ""}`}
        >
            <ul ref={listRef} className={styles.list}>
                {listGridParameter.map((listElement, index) => (
                    <li
                        onClick={() => setGridState(index)}
                        key={listElement.name}
                        className={`${styles.element} element`}
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
                                            "asd",
                                            gridName,
                                        );
                                        setListGridParameter((prevList) =>
                                            prevList.filter(
                                                (item) =>
                                                    item.name !== gridName,
                                            ),
                                        );
                                        setGridObserver((prev) => !prev);
                                    } catch (err) {
                                        console.log(err.message);
                                    }
                                }}
                                className={styles["grid-delete-button"]}
                            >
                                xis
                            </button>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default list;
