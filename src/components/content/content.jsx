import styles from "./content.module.css"
import Tool from "./tool.jsx"
import Grid from "./grid.jsx"
import Pomodoro from "./tool-component/pomodoro.jsx"
import List from "./tool-component/list.jsx"
import Board from "./tool-component/board.jsx"
import { createRoot } from "react-dom/client"
import { useRef, useState } from "react"

const content = () => {
  const widgetCell = useRef(null);
  const [gridInstance, setGridInstance] = useState(null);
  const [gridRef, setGridRef] = useState(null);
  const [gridPosition, setGridPosition] = useState(null);
  let pomodoroRoot = [];
  let listRoot = [];
  let boardRoot = [];

  function trueMatrix(matrix) {
    return matrix.every(
      row => row.every(element => element === true)
    );
  }

  const functionList = {
    pomodoroComponent: () => {

      if(trueMatrix(gridPosition) && gridPosition !== null) {
        return;
      }

      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
          <div class="grid-stack-item-content">
            <div class="${styles.pomodoro}" style="height:100%; width: 100%; display: flex"></div>
          </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div);

      const pomodoro = document.querySelectorAll(`.${styles.pomodoro}`);

      pomodoroRoot[pomodoro.length - 1] = createRoot(pomodoro[pomodoro.length - 1]);
      pomodoroRoot[pomodoro.length - 1].render(<Pomodoro/>)
      // for(let i=0;i<pomodoro.length;i++) {
      //   root[i] = createRoot(pomodoro[i]);
      //   root[i].render(<Pomodoro/>)
      // }

    },

    listComponent: () => {
      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="${styles.list}" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

      const list = document.querySelectorAll(`.${styles.list}`);

      listRoot[list.length - 1] = createRoot(list[list.length - 1]);
      listRoot[list.length - 1].render(<List/>); 
    },

    boardComponent: () => {
      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="${styles.board}" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

      const board = document.querySelectorAll(`.${styles.board}`);

      boardRoot[board.length - 1] = createRoot(board[board.length - 1]);
      boardRoot[board.length - 1].render(<Board/>); 
    }



    // listComponent: () => {
    //   const div = document.createElement("div");
    //   div.classList.add("grid-stack-item");
    //   div.innerHTML = `
    //       <div class="grid-stack-item-content">
    //           <div class="${styles.list}"></div>
    //       </div>
    //   `

    //   gridRef.appendChild(div);
    //   gridInstance.makeWidget(div);

    //   const pomodoro = document.querySelectorAll(`.${styles.pomodoro}`);

    //   let root = [];

    //   for(let i=0;i<pomodoro.length;i++) {
    //     root[i] = createRoot(pomodoro[i]);
    //     root[i].render(<Pomodoro/>)
    //   }

    // }
  }

  

  return (
    <div className={styles.main}>
        <Grid gridInstanceRef={setGridInstance} gridRefRef={setGridRef} gridPositionRef={setGridPosition}/>
        <Tool setWidget={functionList}/>
    </div>
  )
}
export default content