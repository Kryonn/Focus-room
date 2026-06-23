// CSS
import styles from "./content.module.css"

// Components
import Tool from "./tool.jsx"
import Grid from "./grid.jsx"
import Pomodoro from "./tool-component/pomodoro.jsx"
import List from "./tool-component/list.jsx"
import Board from "./tool-component/board.jsx"
import Note from "./tool-component/note.jsx"

// React Functions
import { createRoot } from "react-dom/client"
import { useRef, useState, useEffect } from "react"

const content = ({ gridState, listGridParameter, setListGridParameter, listGridInstance, listGridRef, listGridPosition }) => {
  console.log("Content renderizou");

  // Default Grid Values
  const resizableGridDefault = { handles: 'se' };
  const columnGridDefault = 10;
  const rowGridDefault = 5; 
  const cellHeightGridDefault = 'auto';
  const marginGraidDefault = 2;

  // const float: false,
  //           resizable: { handles: 'se' },
  //           column: column,
  //           cellHeight: 'auto',
  //           maxRow: row,
  //           row: row,
  //           margin: 2,
  //           staticGrid: false,
  //           handle: '.handle'},
  //           gridRef.current);

  // Refs
  // const listGridInstance = useRef([]);
  // const listGridPosition = useRef([]);
  // const listGridRef = useRef([]);
  // const [listGridParameter, setListGridParameter] = useState([]);
  // const [gridState, setGridState] = useState(0)
  
  // Components Root Lists
  const pomodoroRoot = useRef([]);
  const listRoot = useRef([]);
  const boardRoot = useRef([]);
  const noteRoot = useRef([]);

  // Verify space on grid
  function trueMatrix(matrix) {
    return matrix.every(
      row => row.every(element => element === true)
    );
  }

  // Add Components Function List
  const functionList = {
    pomodoroComponent: (gridInstance, gridRef, gridPosition) => {

      if(trueMatrix(gridPosition) && gridPosition !== null) {
        return;
      }

      const div = document.createElement("div");
      div.classList.add("grid-stack-item");

      const id = "pomodoro-" + Date.now();

      div.setAttribute("gs-id", id);
      
      div.innerHTML = `
          <div class="grid-stack-item-content ">
            <div class="${styles.pomodoro} alvo-pomodoro" style="height:100%; width: 100%; display: flex"></div>
          </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div);

      const pomodoro = document.querySelectorAll(".alvo-pomodoro");

      pomodoroRoot.current[pomodoro.length - 1] = createRoot(pomodoro[pomodoro.length - 1]);
      pomodoroRoot.current[pomodoro.length - 1].render(<Pomodoro/>)
    },

    listComponent: (gridInstance, gridRef, gridPosition) => {
      if(trueMatrix(gridPosition) && gridPosition !== null) {
        return;
      }

      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="${styles.list} alvo-list" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

      const list = document.querySelectorAll(".alvo-list");

      listRoot[list.length - 1] = createRoot(list[list.length - 1]);
      listRoot[list.length - 1].render(<List/>); 
    },

    boardComponent: (gridInstance, gridRef, gridPosition) => {
      if(trueMatrix(gridPosition) && gridPosition !== null) {
        return;
      }

      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="${styles.board} alvo-board" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div, { w: 3, h: 2, minW: 3, minH: 2 });

      const board = document.querySelectorAll(".alvo-board");

      boardRoot[board.length - 1] = createRoot(board[board.length - 1]);
      boardRoot[board.length - 1].render(<Board/>); 
    },

    noteComponent: (gridInstance, gridRef, gridPosition) => {
      if(trueMatrix(gridPosition) && gridPosition !== null) {
        return;
      }

      const div = document.createElement("div");
      div.classList.add("grid-stack-item");
      div.innerHTML = `
        <div class="grid-stack-item-content">
          <div class="alvo-note" style="height: 100%; width: 100%; display: flex"></div>
        </div>
      `

      gridRef.appendChild(div);
      gridInstance.makeWidget(div, { w: 2, h: 2, minH: 2, minW: 2 });

      const note = document.querySelectorAll(".alvo-note");

      noteRoot[note.length - 1] = createRoot(note[note.length - 1]);
      noteRoot[note.length - 1].render(<Note/>);


    }
  }

  useEffect(() => {
    const user = "asd";
    // Acessar o nome do usuário no sessionstorage
    
    const getUserGrid = async () => {
      const url = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/grid?username=${user}`;
      const getRes = await fetch(url, { method: "GET" });
      const data = await getRes.json();
      return data.data;
      // console.log("getres.data:", getRes.json().data);
    }

    getUserGrid().then((list) => {
      // const nullList = Array(list.length).fill(null);
      // setListGridInstance(nullList);
      // setListGridRef(nullList);
      // setListGridPosition(nullList);
      // setListGridParameter([]);

        // console.log(list);

      const parameterList = list.map((listElement, index) => ({
          name: listElement.name,
          static: listElement.static,
          float: listElement.float,
          index: index,
      }))

      console.log(parameterList)

      // for(let i=0;i<list.length;i++) {
      //   const parameterObject = {
      //     name: list[i].name,
      //     static: list[i].static,
      //     float: list[i].float,
      //     // instanceRef: listGridInstance[i],
      //     // refRef: listGridRef[i],
      //     // positionRef: listGridPosition[i],
      //     index: i,
      //     setInstanceRef: setListGridInstance,
      //     setRefRef: setListGridRef,
      //     setPositionRef: setListGridPosition
      //   }

      //   setListGridParameter(prevList => {
      //     return [...prevList, parameterObject]
      //   });
      // }
      setListGridParameter(parameterList);
    });

  }, []);

  

  return (
    <div className={styles.main}>
          {/* // listGridParameter.map((item, index) => {
          //   // console.log(item)
          //   // console.log(listGridParameter)
          //   console.log(index)
          //   console.log(gridState)
          //   if(gridState === index) {
          //     console.log(index)
          //     return <Grid className={styles.hidden} key={item.name} gridParameter={item} gridInstanceRef={listGridInstance} gridRefRef={listGridRef} gridPositionRef={listGridPosition}/>
          //   }
          //   else {
          //     return <Grid key={item.name} gridParameter={item} gridInstanceRef={listGridInstance} gridRefRef={listGridRef} gridPositionRef={listGridPosition}/>
          //   }
          // }) */}
        {
          listGridParameter[gridState] && (<Grid key={listGridParameter[gridState].name} gridParameter={listGridParameter[gridState]} gridInstanceRef={listGridInstance} gridRefRef={listGridRef} gridPositionRef={listGridPosition}/>)
        }

        {
          listGridParameter[gridState] && (<Tool setWidget={functionList} gridParameter={listGridParameter[gridState]} gridInstanceRef={listGridInstance} gridRefRef={listGridRef} gridPositionRef={listGridPosition}/>)
          
        }
        
        {/* <Grid gridInstanceRef={setGridInstance} gridRefRef={setGridRef} gridPositionRef={setGridPosition}/> */}
        {/* <Grid gridParameter={listGridParameter}/>
        <Tool setWidget={functionList} gridRef={gridInstance}/> */}
    </div>
  )
}
export default content