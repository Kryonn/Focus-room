// CSS
import styles from "./content.module.css";

// Components
import Tool from "./tool.jsx";
import Grid from "./grid.jsx";
import Pomodoro from "./tool-component/pomodoro.jsx";
import List from "./tool-component/list.jsx";
import Note from "./tool-component/note.jsx";

// React
import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect } from "react";

// Services
import { WidgetService } from "../../services/widget.service.js";

// Utils
import { utils } from "../../utils/utils.js";

// Constants
import { DEFAULT_POMODORO_TIME, DEFAULT_WIDGET_SIZE } from "../../constants/constant.js"
import { DEFAULT_GRID_SETTINGS } from "../../constants/constant.js";

const content = ({
    gridState,
    setGridState,
    listGridParameter,
    setListGridParameter,
    listGridInstance,
    listGridRef,
    listGridPosition,
}) => {
    // Components Root List
    const widgetRoot = useRef([]);

    const gridCache = useRef([]);

    // Add Components Function List
    const functionList = {
        // Create pomodoro widget function
        pomodoroComponent: async (
            gridCache,
            gridParameter,
            gridInstance,
            gridRef,
            gridPosition,
        ) => {

            // Check free spaces on grid
            if (
                !utils.verifyGrid(
                    gridPosition,
                    "pomodoro",
                    DEFAULT_GRID_SETTINGS.ROW,
                    DEFAULT_GRID_SETTINGS.COLUMN,
                )
            ) {
                return;
            }

            // Create widget html
            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            const id = "pomodoro-" + Date.now();
            div.setAttribute("gs-id", id);
            div.innerHTML = `
          <div class="grid-stack-item-content ">
            <button class="${styles.button} delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
                </svg>
            </button>
            <div class="${styles.pomodoro} alvo-pomodoro widget" style="height:100%; width: 100%; display: flex"></div>
          </div>
      `;
            
            // Append new widget
            gridRef.appendChild(div);
            gridInstance.makeWidget(div);
            gridCache.current[gridParameter.name] = [...gridCache.current[gridParameter.name], {
                gridName: gridParameter.name,
                height: DEFAULT_WIDGET_SIZE.POMODORO_HEIGHT,
                width: DEFAULT_WIDGET_SIZE.POMODORO_WIDTH,
                id: id,
                listname: null,
                notename: null,
                notedescription: null,
                pomodoroworktime: DEFAULT_POMODORO_TIME.WORK_TIME,
                pomodorobreaktime: DEFAULT_POMODORO_TIME.BREAK_TIME,
                username: "asd",
                xposition: div.gridstackNode.x,
                yposition: div.gridstackNode.y,
            }];

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(
                widgetList[widgetList.length - 1],
            );
            widgetRoot.current[widgetList.length - 1].render(<Pomodoro username={"asd"} gridName={gridParameter.name} id={id} pomodoroWorkTime={DEFAULT_POMODORO_TIME.WORK_TIME} pomodoroBreakTime={DEFAULT_POMODORO_TIME.BREAK_TIME}/>);

            // Create widget into the database
            await WidgetService.postPomodoroRequest(
                id,
                "asd",
                gridParameter.name,
                DEFAULT_POMODORO_TIME.WORK_TIME,
                DEFAULT_POMODORO_TIME.BREAK_TIME,
                div.gridstackNode.x,
                div.gridstackNode.y
            );
        },

        // Create list widget function
        listComponent: async (listParameter, gridParameter, gridInstance, gridRef, gridCache) => {
            
            // Create widget html
            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            const id = "list-" + Date.now();
            div.setAttribute("gs-id", id);
            div.innerHTML = `
        <div class="grid-stack-item-content">
          <button class="${styles.button} delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
                </svg>
          </button>
          <div class="{styles.list} alvo-list widget" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `;

            // Append new widget
            gridRef.appendChild(div);
            gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });
            gridCache = [...gridCache, {
                gridname: gridParameter.name,
                height: DEFAULT_WIDGET_SIZE.LIST_HEIGHT,
                width: DEFAULT_WIDGET_SIZE.LIST_WIDTH,
                id: id,
                listname: listParameter,
                notename: null,
                notedescription: null,
                pomodoroworktime: null,
                pomodorobreaktime: null,
                username: "asd",
                xposition: div.gridstackNode.x,
                yposition: div.gridstackNode.y,
            }];

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(widgetList[widgetList.length - 1]);
            widgetRoot.current[widgetList.length - 1].render(<List username={"asd"} gridname={gridParameter.name} id={id} listname={listParameter}/>);

            // Create widget into the database
            await WidgetService.postListRequest(
                "asd",
                gridParameter.name,
                id,
                listParameter,
                div.gridstackNode.x,
                div.gridstackNode.y,
            );
        },

        // Create note widget function
        noteComponent: async (listParameter, gridParameter, gridInstance, gridRef, gridCache) => {
            // Create widget html
            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            const id = "note-" + Date.now();
            div.setAttribute("gs-id", id);
            div.innerHTML = `
        <div class="grid-stack-item-content">
          <button class="${styles.button} delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
                </svg>
          </button>
          <div class="${styles.note} alvo-note widget" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `;

            // Append new widget
            gridRef.appendChild(div);
            gridInstance.makeWidget(div, { w: 2, h: 2, minH: 2, minW: 2 });

            gridCache = [...gridCache, {
                gridName: gridParameter.name,
                height: DEFAULT_WIDGET_SIZE.NOTE_HEIGHT,
                width: DEFAULT_WIDGET_SIZE.NOTE_WIDTH,
                id: id,
                listname: null,
                notename: listParameter,
                notedescription: null,
                pomodoroworktime: null,
                pomodorobreaktime: null,
                username: "asd",
                xposition: div.gridstackNode.x,
                yposition: div.gridstackNode.y,
            }];

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(widgetList[widgetList.length - 1]);
            widgetRoot.current[widgetList.length - 1].render(<Note username={"asd"} gridname={gridParameter.name} id={id} notename={listParameter} notedescription={""}/>);

            // Create widget into the database
            await WidgetService.postNoteRequest(
                "asd",
                gridParameter.name,
                id,
                listParameter,
                div.gridstackNode.x,
                div.gridstackNode.y,
            );
        },
    };

    return (
        <div className={styles.main}>
            {/* Grid div */}
            {listGridParameter[gridState] && (
                <Grid
                    key={listGridParameter[gridState].name}
                    gridState={gridState}
                    setGridState={setGridState}
                    gridCache={gridCache}
                    widgetRoot={widgetRoot}
                    gridParameter={listGridParameter[gridState]}
                    gridInstanceRef={listGridInstance}
                    gridRefRef={listGridRef}
                    gridPositionRef={listGridPosition}
                />
            )}

            {/* Tool div */}
            {listGridParameter[gridState] && (
                <Tool
                    gridCache={gridCache}
                    gridState={gridState}
                    setWidget={functionList}
                    gridParameter={listGridParameter[gridState]}
                    gridInstanceRef={listGridInstance}
                    gridRefRef={listGridRef}
                    gridPositionRef={listGridPosition}
                />
            )}
        </div>
    );
};
export default content;
