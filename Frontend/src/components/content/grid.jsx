import styles from "./grid.module.css"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import Pomodoro from './tool-component/pomodoro.jsx'

const grid = ({ gridInstanceRef, gridRefRef, gridPositionRef }) => {

    const gridRef = useRef(null);
    const gridInstance = useRef(null);
    const gridPosition = useRef(null);
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
            margin: 2,
            staticGrid: false,
            handle: '.handle'},
            gridRef.current);

        gridInstanceRef(gridInstance.current);
        gridRefRef(gridRef.current);

        function updateElementPosition() {
            const nodes = gridInstance.current.engine.nodes;
            const occuped = Array.from(
                { length: column },
                () => Array(row).fill(false)
            )

            for(let k=0;k<nodes.length;k++) {
                const xPos = nodes[k].x;
                const yPos = nodes[k].y;
                const width = nodes[k].w;
                const height = nodes[k].h;
                for(let i=xPos;i<xPos + width;i++) {
                    for(let j=yPos;j<yPos + height;j++) {
                        occuped[i][j] = true;
                    }
                }
            }

            gridPositionRef(occuped);

        }

        gridInstance.current.on("added removed change", updateElementPosition);

        updateElementPosition();

    }, []);

    

    return (
    
    <div className={`main ${styles.main}`} style={{ height: gridHeight + "px" }}>
        <div className={`grid-stack ${styles.grid}`}  ref={gridRef}></div>
    </div>
    )
}
export default grid