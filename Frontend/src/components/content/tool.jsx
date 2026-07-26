import styles from "./tool.module.css";
import Popup from "./tool-component/popup.jsx";
import { WidgetService } from "../../services/widget.service.js";
import { GridService } from "../../services/grid.service.js";
import { useState, useEffect, useRef } from "react";
import { utils } from "../../utils/utils.js";

const tool = ({
    setWidget,
    gridParameter,
    gridInstanceRef,
    gridRefRef,
    gridPositionRef,
}) => {
    const [settingState, setSettingState] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [listPopupState, setListPopupState] = useState(false);
    const [notePopupState, setNotePopupState] = useState(false);
    const [labelList, setLabelList] = useState([]);
    const [functionList, setFunctionList] = useState([]);
    const [requestParameter, setRequestParameter] = useState([]);
    const [widgetState, setWidgetState] = useState(null);
    const updateFunction = useRef(
        utils.debounce((username, gridName, gridStatic) => {
            GridService.putRequest(username, gridName, gridStatic);
        }, 1000)
    ).current;

    return (
        <div className={styles.main}>
            {
                listPopupState && <Popup popupTitle={popupTitle} setPopupState={setListPopupState} labelList={labelList} inputTypeList={[""]} buttonFunction={setWidget.listComponent} buttonFunctionParameter={[gridParameter, gridInstanceRef.current[gridParameter.index], gridRefRef.current[gridParameter.index]]}/>
            }
            {
                notePopupState && <Popup popupTitle={popupTitle} setPopupState={setNotePopupState} labelList={labelList} inputTypeList={[""]} buttonFunction={setWidget.noteComponent} buttonFunctionParameter={[gridParameter, gridInstanceRef.current[gridParameter.index], gridRefRef.current[gridParameter.index]]}/>
            }
            <div className={styles.tool}>
                <button
                    onClick={() => {
                        setWidget.pomodoroComponent(
                            gridParameter,
                            gridInstanceRef.current[gridParameter.index],
                            gridRefRef.current[gridParameter.index],
                            gridPositionRef.current[gridParameter.index],
                        );
                    }}
                    className={styles["button"]}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm-99.5 291.5Q275-137 226-186t-77.5-114.5Q120-366 120-440t28.5-139.5Q177-645 226-694t114.5-77.5Q406-800 480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80q-74 0-139.5-28.5ZM678-242q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82ZM480-440Z" />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        if (
                            !utils.verifyGrid(
                                gridPositionRef.current[gridParameter.index],
                                "list",
                                5,
                                10,
                            )
                        ) {
                            console.log(gridPositionRef.current[gridParameter.index]);
                            console.log("ASDASDASD");
                            return;
                        }
                        setLabelList(["Name"]);
                        setPopupTitle("Create list");
                        setListPopupState(prev => !prev);
                    }}
                    className={styles["button"]}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M200-200v-560 454-85 191Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v320h-80v-320H200v560h280v80H200Zm494 40L552-222l57-56 85 85 170-170 56 57L694-80ZM348.5-451.5Q360-463 360-480t-11.5-28.5Q337-520 320-520t-28.5 11.5Q280-497 280-480t11.5 28.5Q303-440 320-440t28.5-11.5Zm0-160Q360-623 360-640t-11.5-28.5Q337-680 320-680t-28.5 11.5Q280-657 280-640t11.5 28.5Q303-600 320-600t28.5-11.5ZM440-440h240v-80H440v80Zm0-160h240v-80H440v80Z" />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        if(!utils.verifyGrid(gridPositionRef.current[gridParameter.index], "note", 5, 10)) {
                            return;
                        }

                        setLabelList(["Name"]);
                        setPopupTitle("Create note");
                        setNotePopupState(prev => !prev);
                    }}
                    className={styles["button"]}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                        <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                    </svg>
                </button>
            </div>
            <div className={styles.settings}>
                <div
                    className={`${styles.dropup} ${settingState ? "" : styles.hidden}`}
                >
                    <button
                        className={styles["settings-button"]}
                        onClick={(e) => {
                            e.preventDefault();
                            
                            updateFunction("asd", gridParameter.name, !gridInstanceRef.current[gridParameter.index].opts.gridStatic);
                            gridInstanceRef.current[gridParameter.index].setStatic(!gridInstanceRef.current[gridParameter.index].opts.staticGrid);
                        }}
                    >
                        Lock grid
                    </button>
                    <button
                        className={styles["settings-button"]}
                        onClick={(e) => {
                            e.preventDefault();
                            WidgetService.deleteAllRequest("asd", gridParameter.name);
                            gridInstanceRef.current[gridParameter.index].removeAll();
                        }}
                    >
                        Clear grid
                    </button>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        setSettingState(!settingState);
                    }}
                    className={`${styles["settings-div"]} ${settingState ? styles.active : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
export default tool;
