import styles from "./content.module.css"
import Tool from "./tool.jsx"
import Grid from "./grid.jsx"
import { useRef, useState } from "react"

const content = () => {
  const widgetCell = useRef(null);
  const [gridInstance, setGridInstance] = useState(null);
  const [gridRef, setGridRef] = useState(null);

  const functionList = {
    pomodoroComponent: () => {
      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
          <div class="grid-stack-item-content">
              <div class="${styles.box}"></div>
          </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div);


    }
  }

  return (
    <div className={styles.main}>
        <Grid gridInstanceRef={setGridInstance} gridRefRef={setGridRef}/>
        <Tool buttonFunction={() => widgetCell.current.addWidget()}/>
    </div>
  )
}
export default content