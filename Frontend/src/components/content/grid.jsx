// CSS
import styles from "./grid.module.css";

// React
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// Grid
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

// Components
import Pomodoro from "./tool-component/pomodoro.jsx";
import List from "./tool-component/list.jsx";

// Utils
import { utils } from "../../utils/utils.js";

// Services
import { WidgetService } from "../../services/widget.service.js";

const default_list_min_width = 3;
const default_list_min_height = 2;

const grid = ({
    widgetRoot,
    gridParameter,
    gridInstanceRef,
    gridRefRef,
    gridPositionRef,
}) => {
    // Refs
    const gridRef = useRef(null);
    const gridInstance = useRef(null);

    // Default grid settings
    const columnHeight = 100;
    const column = 10;
    const row = 5;
    const margin = 2;
    const gridHeight = row * columnHeight;

    // Update widget with debounce
    const updateDebounce = useRef(
        utils.debounce(
            (id, username, gridName, width, height, xposition, yposition) => {
                WidgetService.putRequest(
                    id,
                    username,
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

    useEffect(() => {
        let isMounted = true;
        let cleanupGrid = null;

        const initTimeout = setTimeout(() => {
            if (!gridRef.current) {
                return;
            }

            // Initialize Grid
            gridInstance.current = GridStack.init(
                {
                    float: gridParameter.float,
                    resizable: { handles: "se" },
                    column: column,
                    cellHeight: "auto",
                    row: row,
                    margin: margin,
                    staticGrid: gridParameter.static,
                },
                gridRef.current,
            );

            cleanupGrid = gridInstance.current;

            // Get grid widgets
            WidgetService.getRequest("asd", gridParameter.name).then((list) => {
                if (!isMounted || !gridRef.current) {
                    return;
                }

                gridRef.current.innerHTML = "";

                list.forEach((widget) => {
                    // Global setup
                    const newWidget = document.createElement("div");
                    newWidget.classList.add("grid-stack-item");
                    newWidget.setAttribute("gs-id", widget.id);
                    newWidget.setAttribute("gs-w", widget.width);
                    newWidget.setAttribute("gs-h", widget.height);
                    newWidget.setAttribute("gs-x", widget.xposition);
                    newWidget.setAttribute("gs-y", widget.yposition);
                    const widgetType = widget.id.split("-")[0];

                    // Specify setup
                    switch (widgetType) {
                        case "list":
                            newWidget.setAttribute(
                                "minW",
                                default_list_min_width,
                            );
                            newWidget.setAttribute(
                                "minH",
                                default_list_min_height,
                            );
                            break;
                    }

                    newWidget.innerHTML = `
                        <div class="grid-stack-item-content ">
                            <button class="${styles.button} delete-button">x</button>
                            <div class="${styles[widgetType]} alvo-${widgetType} widget" style="height:100%; width: 100%; display: flex"></div>
                        </div>
                    `;

                    // Append html element and widget
                    gridRef.current.append(newWidget);
                    gridInstance.current.makeWidget(newWidget);

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
                                "asd",
                                gridParameter.name,
                            );
                        },
                    );
                });

                const widgetList = gridRef.current.querySelectorAll(".widget");

                // Render widgets
                list.forEach((widget, index) => {
                    if (widgetRoot.current[index]) {
                        widgetRoot.current[index].unmount();
                    }

                    widgetRoot.current[index] = createRoot(widgetList[index]);

                    // Set widget type
                    const type = widget.id.split("-")[0];

                    // Render correct widget according type
                    switch (type) {
                        case "pomodoro":
                            widgetRoot.current[index].render(<Pomodoro />);
                            break;

                        case "list":
                            widgetRoot.current[index].render(<List username={"asd"} gridname={gridParameter.name} id={widget.id} listname={widget.listname} />);
                            break;
                    }
                });
            });

            function updateWidget(event, el) {
                if (!el.gridstackNode) {
                    return;
                }

                const node = el.gridstackNode;

                updateDebounce(
                    node.id.split("_")[0],
                    "asd",
                    gridParameter.name,
                    node.w,
                    node.h,
                    node.x,
                    node.y,
                );
            }

            // Attribute refs array
            gridInstanceRef.current[gridParameter.index] = gridInstance.current;
            gridRefRef.current[gridParameter.index] = gridRef.current;
            gridPositionRef.current[gridParameter.index] =
                utils.updateElementPosition(gridInstance, column, row);

            // Add listeners
            gridInstance.current.on("dragstop resizestop", updateWidget);
            gridInstance.current.on("added removed change", () => {
                if (gridInstance.current) {
                    gridPositionRef.current[gridParameter.index] =
                        utils.updateElementPosition(gridInstance, column, row);
                }
            });
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
            style={{ height: gridHeight + "px" }}
        >
            <div className={`grid-stack ${styles.grid}`} ref={gridRef}></div>
        </div>
    );
};
export default grid;
