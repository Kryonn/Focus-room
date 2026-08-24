// CSS
import styles from "./list.module.css";

// Components
import Popup from "./popup.jsx";

// React
import { useState, useEffect } from "react";

// Services
import { TaskService } from "../../../services/task.service.js";
import { WidgetService } from "../../../services/widget.service.js";

import { utils } from "../../../utils/utils.js";

const list = ({ gridname, id, taskCache, accessToken, gridCache }) => {
    // States
    const [listAddPopupState, setListAddPopupState] = useState(false);
    const [listUpdatePopupState, setListUpdatePopupState] = useState(false);
    const [listName, setListName] = useState("");
    const [taskList, setTaskList] = useState([]);

    // List
    const setList = [setListName];

    // Component Functions
    const addTask = async (taskName, deadLine, accessToken, gridname, id) => {
        setTaskList((prev) => 
            [...prev, { taskName: taskName, deadLine: deadLine }]
        )

        taskCache.current[gridname] = {
            [id]: {
                ...taskCache.current[gridname][id],
                [taskName]: {
                    taskName: taskName,
                    deadLine: deadLine
                }
            }    
        }

        let dl;

        if(deadLine === "") {
            dl = null;
        } else {
            dl = deadLine;
        }

        await TaskService.postRequest(taskName, dl, accessToken, gridname, id);
    }

    const removeTask = (indexToRemove) => {
        setTaskList((prev) => prev.filter((_, index) => index != indexToRemove));

        const taskName = taskList[indexToRemove].taskName;

        delete taskCache.current[gridname][id][taskName];
    }

    useEffect(() => {
        if(!taskCache.current[gridname]) {
            taskCache.current[gridname] = {};
        }

        if(!taskCache.current[gridname][id]) {

            TaskService.getRequest(gridname, id, accessToken).then((res) => {
                const list = res.data;

                const taskList = list.map((item) => (
                        { taskName: item.taskname, deadLine: item.deadline }
                    )
                )

                setTaskList(taskList);

                taskList.map((task) => {
                    taskCache.current[gridname] = {
                        ...taskCache.current[gridname],
                        [id]: {
                            ...taskCache.current[gridname][id],
                            [task.taskName]: {
                                taskName: task.taskName,
                                deadLine: task.deadLine
                            }
                        } 
                    }
                });

            })
        } else {
            setTaskList(Object.values(taskCache.current[gridname][id]));
        }
    }, []);

    useEffect(() => {
        setListName(gridCache.current[gridname].widget[id].listname);
    }, [gridCache])

    useEffect(() => {
        gridCache.current[gridname].widget[id].listname = listName;
    }, [listName])


    return (
        <div className={`${styles.main}`}>
            {
                listAddPopupState && (<Popup popupTitle={"Add task"} setPopupState={setListAddPopupState} labelList={["Name", "Deadline"]} inputTypeList={["", "Date"]} buttonFunction={addTask} buttonFunctionParameter={[accessToken, gridname, id]}/>)
            }
            {
                listUpdatePopupState && (<Popup popupTitle={"Edit task"} setPopupState={setListUpdatePopupState} labelList={["Name"]} inputTypeList={[""]} setList={setList} buttonFunction={WidgetService.putListRequest} buttonFunctionParameter={[accessToken, gridname, id]}/>)
            }
            <div className={styles.title}>
                <p>{listName}</p>
                <div className={styles["button-div"]}>
                    <button onClick={() => { setListAddPopupState(prev => !prev) }} className={styles["title-button"]} type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
                        </svg>
                    </button>
                    <button onClick={() => { setListUpdatePopupState(prev => !prev) }} className={styles["title-button"]} type="button">
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
                <ul className={styles["list"]}>
                    {
                        taskList && taskList.map((element, index) => (
                            <li key={index} className={styles["list-element"]}>
                                <p className={styles["list-element-title"]}>
                                    {element.taskName}
                                </p>
                                <p className={styles["list-element-deadline"]}>
                                    {utils.formatDate(element.deadLine)}
                                </p>
                                <div className={styles["list-element-button-div"]}>
                                    <button onClick={() => { removeTask(index); TaskService.deleteRequest(gridname, id, element.taskName, accessToken) }} className={styles["list-element-button"]}>
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
