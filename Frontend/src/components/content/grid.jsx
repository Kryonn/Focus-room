import styles from "./grid.module.css"
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import Pomodoro from './tool-component/pomodoro.jsx'
import List from "./tool-component/list.jsx"

const default_list_min_width = 3;
const default_list_min_height = 2;

const grid = ({ widgetRoot, gridParameter, gridInstanceRef, gridRefRef, gridPositionRef }) => {

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

        const getWidget = async () => {
            const params = new URLSearchParams({
                username: "asd",
                gridName: gridParameter.name
            })
            const url = `http://localhost:3000/widget?${params}`;
            const getResponse = await fetch(url, {
                method: "GET"
            });
            const data = (await getResponse).json();
            return data;
        }

        

        getWidget().then((data) => {
            let widgetType = "";
            const list = data.data;
            console.log("list: ", list);

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
                widgetType = widget.id.split('-')[0];
                
                // Specify setup
                switch(widgetType) {
                    case "list":
                        newWidget.setAttribute("minW", default_list_min_width);
                        newWidget.setAttribute("minH", default_list_min_height);
                        break;
                }

                newWidget.innerHTML = `
                    <div class="grid-stack-item-content ">
                        <div class="${styles[widgetType]} alvo-${widgetType} widget" style="height:100%; width: 100%; display: flex"></div>
                    </div>
                `

                // Append html element and widget
                gridRef.current.append(newWidget);
                gridInstance.current.makeWidget(newWidget);
            })

            const widgetList = gridRef.current.querySelectorAll(".widget");

            list.forEach((widget, index) => {
                
                widgetRoot.current[index] = createRoot(widgetList[index]);

                const type = widget.id.split('-')[0];

                switch(type) {
                    case "pomodoro":
                        widgetRoot.current[index].render(<Pomodoro/>);
                        break;
                        
                    case "list":
                        widgetRoot.current[index].render(<List/>);
                        break;
                }
            })

        })

        gridInstanceRef.current[gridParameter.index] = gridInstance.current
        gridRefRef.current[gridParameter.index] = gridRef.current

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

            gridPositionRef.current[gridParameter.index] = occuped;

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