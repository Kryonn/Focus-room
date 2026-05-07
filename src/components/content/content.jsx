import styles from "./content.module.css"
import Tool from "./tool.jsx"
import Grid from "./grid.jsx"
import Pomodoro from "./tool-component/pomodoro.jsx"
import { createRoot } from "react-dom/client"
import { useRef, useState } from "react"

const content = () => {
  const widgetCell = useRef(null);
  const [gridInstance, setGridInstance] = useState(null);
  const [gridRef, setGridRef] = useState(null);
  const [gridPosition, setGridPosition] = useState(null);

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
            <div class="${styles.pomodoro}"></div>
          </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div);

      const pomodoro = document.querySelectorAll(`.${styles.pomodoro}`);

      let root = [];

      for(let i=0;i<pomodoro.length;i++) {
        root[i] = createRoot(pomodoro[i]);
        root[i].render(<Pomodoro/>)
      }

    },

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