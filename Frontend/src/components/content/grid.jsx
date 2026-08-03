// CSS
import styles from "./grid.module.css";

// React
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// GridStack
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

// Components
import Pomodoro from "./tool-component/pomodoro.jsx";
import List from "./tool-component/list.jsx";
import Note from "./tool-component/note.jsx";

// Services
import { WidgetService } from "../../services/widget.service.js";

// Utils
import { utils } from "../../utils/utils.js";

// Constants
import { DEFAULT_WIDGET_SIZE } from "../../constants/constant.js"
import { DEFAULT_GRID_SETTINGS } from "../../constants/constant.js"

const grid = ({
    accessToken,
    gridState,
    setGridState,
    gridCache,
    taskCache,
    widgetRoot,
    gridParameter,
    gridInstanceRef,
    gridRefRef,
    gridPositionRef,
}) => {

    // Refs
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

    // Update widget with debounce
    const updateDebounce = useRef(
        utils.debounce(
            (id, accessToken, gridName, width, height, xposition, yposition) => {
                WidgetService.putRequest(
                    id,
                    accessToken,
                    gridName,
                    width,
                    height,
                    xposition,
                    yposition,
                );
            },
            500,
        ),
    ).current;

    // Calculate and set grid height
    function fixGridHeight() {
        if(gridInstanceRef.current[gridParameter.name] && gridRefRef.current[gridParameter.name]) {
            const currentGridHeight = gridRefRef.current[gridParameter.name].clientHeight;
            const calculatedCellHeight = currentGridHeight / DEFAULT_GRID_SETTINGS.ROW;
            gridInstanceRef.current[gridParameter.name].cellHeight(calculatedCellHeight); 
        }
    }

    // Update size and position of widget into data base
    function updateWidget(event, el) {
        if (!el.gridstackNode) {
            return;
        }

        const node = el.gridstackNode;

        updateDebounce(
            node.id,
            accessToken,
            gridParameter.name,
            node.w,
            node.h,
            node.x,
            node.y,
        );
    }

    // Build widget html and append to gridRef and gridInstance
    async function buildWidgets(widgetBuildList, gridRef, gridInstance, widgetRoot, taskCache) {
        if(!gridRef.current || widgetBuildList.length === 0) {
            return;
        }

        widgetBuildList.forEach((widget) => {
            // Global setup
            const newWidget = document.createElement("div");
            newWidget.classList.add("grid-stack-item");
            newWidget.setAttribute("gs-id", widget.id);
            newWidget.setAttribute("gs-w", widget.width);
            newWidget.setAttribute("gs-h", widget.height);
            newWidget.setAttribute("gs-x", widget.xposition);
            newWidget.setAttribute("gs-y", widget.yposition);
            const widgetType = widget.id.split("-")[0];

            newWidget.innerHTML = `
                <div class="grid-stack-item-content ">
                    <button class="${styles["remove-button"]} delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                            <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
                        </svg>
                    </button>
                    <div class="${styles[widgetType]} alvo-${widgetType} widget" style="height:100%; width: 100%; display: flex"></div>
                </div>
            `;

            // Append html element and widget
            gridRef.current.append(newWidget);
            gridInstance.current.makeWidget(newWidget, {
                minW: widgetType === "list" ? DEFAULT_WIDGET_SIZE.LIST_WIDTH : widgetType === "note" ? DEFAULT_WIDGET_SIZE.NOTE_WIDTH : 1,
                minH: widgetType === "list" ? DEFAULT_WIDGET_SIZE.LIST_HEIGHT : widgetType === "note" ? DEFAULT_WIDGET_SIZE.NOTE_HEIGHT : 1,
            });

            const buttonList =
                gridRef.current.querySelectorAll(".delete-button");

            buttonList[buttonList.length - 1].addEventListener(
                "click",
                async () => {                  
                    if (gridInstance.current) {
                        gridInstance.current.removeWidget(
                            newWidget,
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
                        widget.id,
                        gridParameter.name,
                        accessToken
                    );
                },
            );
        });
    }

    // Render widgets
    function renderWidgets(widgetRenderList, gridRef, widgetRoot) {
        if(!gridRef.current || widgetRenderList.length === 0) {
            return;
        }

        const widgetList = gridRef.current.querySelectorAll(".widget");

        // Render widgets
        widgetRenderList.forEach((widget, index) => {
            if (widgetRoot.current[index]) {
                widgetRoot.current[index].unmount();
            }

            widgetRoot.current[index] = createRoot(widgetList[index]);

            console.log("widget: ",widget);

            // Set widget type
            const type = widget.id.split("-")[0];

            // Render correct widget according type
            switch (type) {
                case "pomodoro":
                    widgetRoot.current[index].render(<Pomodoro gridName={gridParameter.name} id={widget.id} pomodoroWorkTime={widget.pomodoroworktime} pomodoroBreakTime={widget.pomodorobreaktime} accessToken={accessToken}/>);
                    break;

                case "list":
                    widgetRoot.current[index].render(<List gridname={gridParameter.name} id={widget.id} listname={widget.listname} taskCache={taskCache} accessToken={accessToken}/>);
                    break;

                case "note":
                    widgetRoot.current[index].render(<Note gridname={gridParameter.name} id={widget.id} notename={widget.notename} notedescription={widget.notedescription} accessToken={accessToken}/>);
                    break;
            }
        });
    }

    

    useEffect(() => {
        let isMounted = true;
        let cleanupGrid = null;

        const initTimeout = setTimeout(async () => {
            if (!gridRef.current) {
                return;
            }

            console.log("gridParameter.id: ", gridParameter.name);

            // Initialize Grid
            gridInstance.current = GridStack.init(
                {
                    float: DEFAULT_GRID_SETTINGS.FLOAT,
                    resizable: DEFAULT_GRID_SETTINGS.RESIZABLE,
                    column: DEFAULT_GRID_SETTINGS.COLUMN,
                    cellHeight: DEFAULT_GRID_SETTINGS.CELL_HEIGHT,
                    row: DEFAULT_GRID_SETTINGS.ROW,
                    margin: DEFAULT_GRID_SETTINGS.MARGIN,
                    staticGrid: gridParameter.static,
                },
                gridRef.current,
            );


            cleanupGrid = gridInstance.current;

            let widgetRequestList;

            // If the grid data was requested previously no need to request again
            if(!gridCache.current[gridParameter.name]) {
                const getResponse = await WidgetService.getRequest(gridParameter.name, accessToken);
                widgetRequestList = getResponse.data;
                if(!isMounted || !gridRef.current) {
                    return;
                }
                gridCache.current[gridParameter.name] = widgetRequestList;
            } else {
                widgetRequestList = gridCache.current[gridParameter.name];
            }

            gridRef.current.innerHTML = "";

            // Building widgets
            buildWidgets(widgetRequestList, gridRef, gridInstance, widgetRoot);

            // Render widgets
            renderWidgets(widgetRequestList, gridRef, widgetRoot);

            // Attribute refs array
            gridInstanceRef.current[gridParameter.name] = gridInstance.current;
            gridRefRef.current[gridParameter.name] = gridRef.current;
            gridPositionRef.current[gridParameter.name] =
                utils.updateElementPosition(gridInstance, DEFAULT_GRID_SETTINGS.COLUMN, DEFAULT_GRID_SETTINGS.ROW);

            // Add listeners
            gridInstance.current.on("dragstop resizestop", updateWidget);
            gridInstance.current.on("added removed change", () => {
                if (gridInstance.current) {
                    gridPositionRef.current[gridParameter.name] =
                        utils.updateElementPosition(gridInstance, DEFAULT_GRID_SETTINGS.COLUMN, DEFAULT_GRID_SETTINGS.ROW);
                }
            });

            fixGridHeight();
        }, 0);

        return () => {
            isMounted = false;
            clearTimeout(initTimeout);

            if (widgetRoot.current) {
                Object.values(widgetRoot.current).forEach(
                    (root) => root && root.unmount(),
                );
                widgetRoot.current = [];
            }

            if (gridInstance.current) {
                cleanupGrid.destroy(true);
                gridInstance.current = null;
            }
        };
    }, []);

    return (
        <div
            className={`main ${styles.main}`}
        >
            <div className={`grid-stack ${styles.grid}`} ref={gridRef}></div>
        </div>
    );
};
export default grid;
