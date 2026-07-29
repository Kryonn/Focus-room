// CSS
import "./App.css";

// React
import { useState, useEffect, useRef } from "react";

// Components
import Sidebar from "./components/sidebar/sidebar.jsx";
import Content from "./components/content/content.jsx";
import Auth from "./components/auth/auth.jsx";

// Services
import { GridService } from "./services/grid.service.js";

function App() {
    // States
    const [screen, setScreen] = useState("app");

    // Auth 
    if (screen === "auth") {
        return <Auth setScreen={setScreen} />;
    }

    // App
    if (screen === "app") {
        
        // States
        const [gridState, setGridState] = useState(0);
        
        // Refs
        const listGridInstance = useRef([]);
        const listGridRef = useRef([]);
        const listGridPosition = useRef([]);
        const [listGridParameter, setListGridParameter] = useState([]);

        useEffect(() => {
            const user = "asd";

            GridService.getRequest(user).then((list) => {
                const parameterList = list.map((listElement, index) => ({
                    name: listElement.name,
                    static: listElement.static,
                    index: listElement.name
                }));

                setListGridParameter(parameterList);
            });
        }, []);

        return (
            <div className="main">
                {listGridParameter && (
                    <Sidebar
                        setGridState={setGridState}
                        gridState={gridState}
                        listGridParameter={listGridParameter}
                        setListGridParameter={setListGridParameter}
                    />
                )}
                {listGridParameter && (
                    <Content
                        gridState={gridState}
                        setGridState={setGridState}
                        listGridParameter={listGridParameter}
                        setListGridParameter={setListGridParameter}
                        listGridInstance={listGridInstance}
                        listGridRef={listGridRef}
                        listGridPosition={listGridPosition}
                    />
                )}
            </div>
        );
    }

    return <div className="main"></div>;
}

export default App;
