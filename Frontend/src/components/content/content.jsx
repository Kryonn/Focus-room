// CSS
import styles from "./content.module.css";

// Components
import Tool from "./tool.jsx";
import Grid from "./grid.jsx";
import Pomodoro from "./tool-component/pomodoro.jsx";
import List from "./tool-component/list.jsx";
import Board from "./tool-component/board.jsx";
import Note from "./tool-component/note.jsx";

// React
import { createRoot } from "react-dom/client";
import { useRef, useState, useEffect } from "react";

// Utils
import { utils } from "../../utils/utils.js";
import { WidgetService } from "../../services/widget.service.js";

const content = ({
    gridState,
    listGridParameter,
    setListGridParameter,
    listGridInstance,
    listGridRef,
    listGridPosition,
}) => {
    // Default Grid Values
    const resizableGridDefault = { handles: "se" };
    const columnGridDefault = 10;
    const rowGridDefault = 5;
    const cellHeightGridDefault = "auto";
    const marginGraidDefault = 2;

    // Components Root Lists
    const widgetRoot = useRef([]);

    // Add Components Function List
    const functionList = {
        pomodoroComponent: async (
            gridParameter,
            gridInstance,
            gridRef,
            gridPosition,
        ) => {
            console.log("gridposition: ", gridPosition);

            if (
                !utils.verifyGrid(
                    gridPosition,
                    "pomodoro",
                    rowGridDefault,
                    columnGridDefault,
                )
            ) {
                console.log("ASDASDASD");
                return;
            }

            const div = document.createElement("div");
            div.classList.add("grid-stack-item");

            const id = "pomodoro-" + Date.now();

            div.setAttribute("gs-id", id);

            div.innerHTML = `
          <div class="grid-stack-item-content ">
            <button class="${styles.button} delete-button">x</button>
            <div class="${styles.pomodoro} alvo-pomodoro widget" style="height:100%; width: 100%; display: flex"></div>
          </div>
      `;

            gridRef.appendChild(div);
            gridInstance.makeWidget(div);

            const pomodoro = document.querySelectorAll(".alvo-pomodoro");

            await WidgetService.postRequest(
                id,
                "asd",
                gridParameter.name,
                div.gridstackNode.x,
                div.gridstackNode.y,
                "pomodoro",
            );

            widgetRoot.current[pomodoro.length - 1] = createRoot(
                widgetRoot[pomodoro.length - 1],
            );
            widgetRoot.current[pomodoro.length - 1].render(<Pomodoro />);
        },

        listComponent: (gridParameter, gridInstance, gridRef, gridPosition) => {
            if (
                !utils.verifyGrid(
                    gridPosition,
                    "list",
                    rowGridDefault,
                    columnGridDefault,
                )
            ) {
                console.log("ASDASDASD");
                return;
            }


            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            const id = "list" + Date.now();

            div.setAttribute("gs-id", id);

            div.innerHTML = `
        <div class="grid-stack-item-content">
          <button class="${styles.button} delete-button">x</button>
          <div class="${styles.list} alvo-list widget" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `;

            gridRef.appendChild(div);
            gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

            const list = document.querySelectorAll(".widget");

            widgetRoot[list.length - 1] = createRoot(list[list.length - 1]);
            widgetRoot[list.length - 1].render(<List />);
        },

        boardComponent: (gridInstance, gridRef, gridPosition) => {
            // if (trueMatrix(gridPosition) && gridPosition !== null) {
            //     return;
            // }

            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="${styles.board} alvo-board" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `;

            gridRef.appendChild(div);
            gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

            const board = document.querySelectorAll(".alvo-board");

            boardRoot[board.length - 1] = createRoot(board[board.length - 1]);
            boardRoot[board.length - 1].render(<Board />);
        },

        noteComponent: (gridInstance, gridRef, gridPosition) => {
            // if (trueMatrix(gridPosition) && gridPosition !== null) {
            //     return;
            // }

            const div = document.createElement("div");
            div.classList.add("grid-stack-item");
            div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="alvo-note" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `;

            gridRef.appendChild(div);
            gridInstance.makeWidget(div, { w: 2, h: 2, minH: 2, minW: 2 });

            const note = document.querySelectorAll(".alvo-note");

            noteRoot[note.length - 1] = createRoot(note[note.length - 1]);
            noteRoot[note.length - 1].render(<Note />);
        },
    };

    return (
        <div className={styles.main}>
            {listGridParameter[gridState] && (
                <Grid
                    key={listGridParameter[gridState].name}
                    widgetRoot={widgetRoot}
                    gridParameter={listGridParameter[gridState]}
                    gridInstanceRef={listGridInstance}
                    gridRefRef={listGridRef}
                    gridPositionRef={listGridPosition}
                />
            )}

            {listGridParameter[gridState] && (
                <Tool
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
