import styles from "./list.module.css";
import Listpopup from "./listpopup.jsx";
import { useState, useRef, useEffect, use } from "react";

const list = () => {
    const [layoutMode, setLayoutMode] = useState(null);
    const mainRef = useRef(null);
    const listRef = useRef(null);
    const [popupEvent, setPopupEvent] = useState("Add task");
    const [listAddPopupState, setAddListPopupState] = useState(false);
    const [listUpdatePopupState, setUpdateListPopupState] = useState(false);
    const [listName, setListName] = useState("Default name");

    const [taskList, setTaskList] = useState([
        { title: "task1", deadline: "02/08/2026" },
        { title: "task2", deadline: "10/08/2026" },
    ]);

    const addTask = (taskName, taskDate) => {
        setTaskList((prev) => 
            [...prev, { title: taskName, deadline: taskDate }]
        )
    }

    const removeTask = (indexToRemove) => {
        setTaskList((prev) => 
            prev.filter((_, index) => index != indexToRemove)
        )
    }

    const updateTask = (indexToUpdate, taskName, taskDate) => {
        setTaskList((prev) => 
            prev.filter((item, index) => {
                if(index != indexToUpdate) {
                    return item;
                } else {
                    return { title: taskName, deadline: taskDate }
                }
            })
        )
    }

    

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            const widget = entry.target.closest(".grid-stack-item");
            const cellWidth = widget.getAttribute("gs-w");
            const cellHeight = widget.getAttribute("gs-h");

            let mode = "big";

            if (cellHeight == null) {
                mode = "wide";
            }

            console.log(mode);
            setLayoutMode(mode);
        });
        resizeObserver.observe(mainRef.current);
    }, []);



    return (
        <div ref={mainRef} className={`${styles.main} ${styles[layoutMode]}`}>
            {
                listAddPopupState && (<Listpopup setAddListPopupState={setAddListPopupState} addTask={addTask} popupEvent={"Add task"}/>)
            }
            {
                listUpdatePopupState && (<Listpopup setUpdateListPopupState={setUpdateListPopupState} popupEvent={"Edit list name"} setListName={setListName}/>)
            }
            <div className={styles.title}>
                <p>{listName}</p>
                <div className={styles["button-div"]}>
                    <button onClick={() => { setAddListPopupState(prev => !prev) }} id="add-button" className={styles["title-button"]} type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                        </svg>
                    </button>
                    <button onClick={() => { setUpdateListPopupState(prev => !prev) }} className={styles["title-button"]} type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" />
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={styles["list-nav"]}>
                <ul ref={listRef} className={styles["list"]}>
                    {
                        taskList && taskList.map((element, index) => (
                            <li key={index} className={styles["list-element"]}>
                                
                                <p className={styles["list-element-title"]}>
                                    {element.title}
                                </p>
                                <p className={styles["list-element-deadline"]}>
                                    {element.deadline}
                                </p>
                                <div className={styles["list-element-button-div"]}>
                                    {/* <button className={styles["list-element-button"]}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                        >
                                            <path
                                                fill="rgb(50, 50, 50)"
                                                d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"
                                            />
                                        </svg>
                                    </button> */}

                                    <button onClick={() => { removeTask(index) }} className={styles["list-element-button"]}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 640 640"
                                        >
                                            <path
                                                d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
                                                fill="rgb(50, 50, 50)"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                            
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
};
export default list;
