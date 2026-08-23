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
import { useRef } from "react";

// Services
import { WidgetService } from "../../services/widget.service.js";

// Utils
import { utils } from "../../utils/utils.js";

// Constants
import { DEFAULT_POMODORO_TIME, DEFAULT_WIDGET_SIZE } from "../../constants/constant.js"
import { DEFAULT_GRID_SETTINGS } from "../../constants/constant.js";

const content = ({
    accessToken,
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

    const gridCache = useRef({});
    const taskCache = useRef({});
    const noteCache = useRef({});

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

            gridCache.current[gridParameter.name].widget = {...gridCache.current[gridParameter.name].widget,
                [id]: {
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
                }
            }

            const buttonList =
                gridRef.querySelectorAll(".delete-button");

            buttonList[buttonList.length - 1].addEventListener(
                "click",
                async () => {                  
                    if (gridInstance) {
                        gridInstance.removeWidget(
                            div,
                            true,
                        );
                    }

                    if (widgetRoot.current[buttonList.length - 1]) {
                        widgetRoot.current[
                            buttonList.length - 1
                        ].unmount();
                        delete widgetRoot.current[buttonList - 1];
                    }

                    await WidgetService.deleteRequest(
                        id,
                        gridParameter.name,
                        accessToken
                    );
                },
            );

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(
                widgetList[widgetList.length - 1],
            );
            widgetRoot.current[widgetList.length - 1].render(<Pomodoro gridName={gridParameter.name} id={id} pomodoroWorkTime={DEFAULT_POMODORO_TIME.WORK_TIME} pomodoroBreakTime={DEFAULT_POMODORO_TIME.BREAK_TIME} accessToken={accessToken}/>);

            // Create widget into the database
            await WidgetService.postPomodoroRequest(
                id,
                gridParameter.name,
                DEFAULT_POMODORO_TIME.WORK_TIME,
                DEFAULT_POMODORO_TIME.BREAK_TIME,
                div.gridstackNode.x,
                div.gridstackNode.y,
                accessToken
            );
        },

        // Create list widget function
        listComponent: async (listParameter, gridParameter, gridInstance, gridRef) => {
            
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
            gridInstance.makeWidget(div, { id: id, w: 3, h: 2, minW: 3, minH: 2 });


            gridCache.current[gridParameter.name].widget = {...gridCache.current[gridParameter.name].widget,
                [id]: {
                    gridName: gridParameter.name,
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
                }
            }

            const buttonList =
                gridRef.querySelectorAll(".delete-button");

            buttonList[buttonList.length - 1].addEventListener(
                "click",
                async () => {                  
                    if (gridInstance) {
                        gridInstance.removeWidget(
                            div,
                            true,
                        );
                    }

                    if (widgetRoot.current[buttonList.length - 1]) {
                        widgetRoot.current[
                            buttonList.length - 1
                        ].unmount();
                        delete widgetRoot.current[buttonList - 1];
                    }

                    await WidgetService.deleteRequest(
                        id,
                        gridParameter.name,
                        accessToken
                    );
                },
            );

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(widgetList[widgetList.length - 1]);
            widgetRoot.current[widgetList.length - 1].render(<List gridname={gridParameter.name} id={id} taskCache={taskCache} gridCache={gridCache} accessToken={accessToken}/>);

            // Create widget into the database
            await WidgetService.postListRequest(
                gridParameter.name,
                id,
                listParameter,
                div.gridstackNode.x,
                div.gridstackNode.y,
                accessToken
            );
        },

        // Create note widget function
        noteComponent: async (listParameter, gridParameter, gridInstance, gridRef) => {
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
            gridInstance.makeWidget(div, { id: id, w: 2, h: 2, minH: 2, minW: 2 });

            gridCache.current[gridParameter.name].widget = {...gridCache.current[gridParameter.name].widget,
                [id]: {
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
                }
            }

            const buttonList =
                gridRef.querySelectorAll(".delete-button");

            buttonList[buttonList.length - 1].addEventListener(
                "click",
                async () => {                  
                    if (gridInstance) {
                        gridInstance.removeWidget(
                            div,
                            true,
                        );
                    }

                    if (widgetRoot.current[buttonList.length - 1]) {
                        widgetRoot.current[
                            buttonList.length - 1
                        ].unmount();
                        delete widgetRoot.current[buttonList - 1];
                    }

                    await WidgetService.deleteRequest(
                        div,
                        gridParameter.name,
                        accessToken
                    );
                },
            );

            // Create and rendering the widget root
            const widgetList = document.querySelectorAll(".widget");
            widgetRoot.current[widgetList.length - 1] = createRoot(widgetList[widgetList.length - 1]);
            widgetRoot.current[widgetList.length - 1].render(<Note gridname={gridParameter.name} id={id} gridCache={gridCache} accessToken={accessToken}/>);

            // Create widget into the database
            await WidgetService.postNoteRequest(
                gridParameter.name,
                id,
                listParameter,
                div.gridstackNode.x,
                div.gridstackNode.y,
                accessToken
            );
        },
    };

    return (
        <div className={styles.main}>
            {/* Grid div */}
            {
                listGridParameter.map((grid) => (
                    grid.name === gridState && (
                        <Grid
                            key={grid.name}
                            accessToken={accessToken}
                            gridState={gridState}
                            setGridState={setGridState}
                            gridCache={gridCache}
                            taskCache={taskCache}
                            noteCache={noteCache}
                            widgetRoot={widgetRoot}
                            gridParameter={grid}
                            gridInstanceRef={listGridInstance}
                            gridRefRef={listGridRef}
                            gridPositionRef={listGridPosition}
                        />
                    )

                ))
            }
            
            {/* Tool div */}
            {
                listGridParameter.map((grid) => (
                    grid.name === gridState && (
                        <Tool
                            key={grid.name}
                            accessToken={accessToken}
                            gridCache={gridCache}
                            gridState={gridState}
                            setWidget={functionList}
                            gridParameter={grid}
                            gridInstanceRef={listGridInstance}
                            gridRefRef={listGridRef}
                            gridPositionRef={listGridPosition}
                        />
                    )
                ))
            }
            
        </div>
    );
};
export default content;
