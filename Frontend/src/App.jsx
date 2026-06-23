import './App.css'
import Sidebar from './components/sidebar/sidebar.jsx'
import Content from './components/content/content.jsx'
import Auth from "./components/auth/auth.jsx"
import { useState, useEffect, useRef } from 'react'

function App() {
  const [screen, setScreen] = useState("app");


  if(screen === "auth") {
    return (
      <Auth setScreen={setScreen}/>
    )
  }

  if(screen === "app") {
    const listGridInstance = useRef([]);
    const listGridRef = useRef([]);
    const listGridPosition = useRef([]);
    const [gridState, setGridState] = useState(0)
    const [listGridParameter, setListGridParameter] = useState([]) 

    useEffect(() => {
      const user = "asd";

      const getUserGrid = async () => {
        const url = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/grid?username=${user}`;
        const getRes = await fetch(url, { method: "GET" });
        const data = await getRes.json();
        return data.data;
        // console.log("getres.data:", getRes.json().data);
      }

      getUserGrid().then((list) => {
        const parameterList = list.map((listElement, index) => ({
            name: listElement.name,
            static: listElement.static,
            float: listElement.float,
            index: index,
        }));

        setListGridParameter(parameterList);
      }
    )}, [])

    return (
      <div className='main'>
        {
          listGridParameter && (<Sidebar setGridState={setGridState} listGridParameter={listGridParameter} setListGridParameter={setListGridParameter}/>)
        }
        {
          listGridParameter && (<Content gridState={gridState} listGridParameter={listGridParameter} setListGridParameter={setListGridParameter} listGridInstance={listGridInstance} listGridRef={listGridRef} listGridPosition={listGridPosition}/>)
        }
      </div>
    )
  }

  return (
      <div className='main'>
        
      </div>
  )
}

export default App
