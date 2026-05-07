import styles from "./grid.module.css"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import Pomodoro from './tool-component/pomodoro.jsx'

const grid = ({ gridInstanceRef, gridRefRef }) => {

    const gridRef = useRef(null);
    const gridInstance = useRef(null);
    const column = 10;
    const row = 5;
    let columnHeight = 100;
    const gridHeight = row * columnHeight;

  
    useEffect(() => {
        gridInstance.current = GridStack.init({
            float: true,
            resizable: { handles: 'se' },
            column: column,
            maxRow: row,
            row: row,
            margin: 5 },
            gridRef.current);

        gridInstanceRef(gridInstance.current);
        gridRefRef(gridRef.current);

        // setWidget({
        //     addWidget: () => {
        //         const div = document.createElement("div");
        //         div.classList.add("grid-stack-item");
        //         div.innerHTML = `
        //             <div class="grid-stack-item-content">
        //                 <div class="${styles.box}"></div>
        //             </div>
        //         `

        //         gridRef.current.appendChild(div);
        //         gridInstance.current.makeWidget(div);

        //         const box = document.querySelector(`.${styles.box}`);

        //         const root = createRoot(box);

        //         root.render(<Pomodoro/>);
        //     }
        // })

    }, []);

    

    return (
    
    <div className={`main ${styles.main}`} style={{ height: gridHeight + "px" }}>
        <div className={`grid-stack ${styles.grid}`}  ref={gridRef}></div>
    </div>
    )
}
export default grid