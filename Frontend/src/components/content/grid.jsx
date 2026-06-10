import styles from "./grid.module.css"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import Pomodoro from './tool-component/pomodoro.jsx'

const grid = ({ gridParameter, gridInstanceRef, gridRefRef, gridPositionRef }) => {

    const gridRef = useRef(null);
    const gridInstance = useRef(null);
    const gridPosition = useRef(null);
    const column = 10;
    const row = 5;
    let columnHeight = 100;
    const gridHeight = row * columnHeight;
    console.log(gridParameter)

  
    useEffect(() => {
        gridInstance.current = GridStack.init({
            float: gridParameter.float,
            resizable: { handles: 'se' },
            column: column,
            cellHeight: 'auto',
            maxRow: row,
            row: row,
            margin: 2,
            staticGrid: gridParameter.static,
            handle: '.handle'},
            gridRef.current);

        function fixGridHeight() {
            if(gridInstance.current && gridRef.current) {
                const currentGridHeight = gridRef.current.clientHeight;
                const calculatedCellHeight = currentGridHeight / row;
                gridInstance.current.cellHeight(calculatedCellHeight); 
            }
        }

        gridInstanceRef.current[gridParameter.index] = gridInstance.current
        gridRefRef.current[gridParameter.index] = gridRef.current

        // gridParameter.setInstanceRef(prevList => {
        //     let copy = prevList
        //     copy[gridParameter.index] = gridInstance.current
        //     return copy
        // })

        // gridParameter.setRefRef(prevList => {
        //     let copy = prevList
        //     copy[gridParameter.index] = gridRef.current
        //     return copy
        // })

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

            gridPositionRef.current[gridParameter.index] = occuped

            // gridParameter.setPositionRef(prevList => {
            //     let copy = prevList
            //     copy[gridParameter.index] = occuped
            //     return copy
            // })

            // gridPositionRef(occuped);

        }

        fixGridHeight();
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